//backend\src\sessions\sessions.service.ts
import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  
import { Session } from './types/session.type';
import { Event } from './types/event.type';
  
import { StartSessionDto } from './dto/start-session.dto';
import { CreateEventDto } from './dto/create-event.dto';
  
import { randomUUID } from 'crypto';

// ======================
// DOMAIN INTELLIGENCE
// ======================

type DomainCategory =
  | "PRODUCTIVE"
  | "SUPPORT"
  | "NEUTRAL"
  | "DISTRACTION";

const DOMAIN_RULES = [
  { match: "github.com", category: "PRODUCTIVE" },
  { match: "chatgpt.com", category: "SUPPORT" },
  { match: "stackoverflow.com", category: "SUPPORT" },

  { match: "youtube.com", category: "NEUTRAL" },
  { match: "spotify.com", category: "NEUTRAL" },

  { match: "twitter.com", category: "DISTRACTION" },
];

const TASK_CONTEXT: Record<string, string[]> = {
  programming: [
    "github.com",
    "chatgpt.com",
    "stackoverflow.com",
  ],
};
  
  @Injectable()
  export class SessionsService {
    private sessions: Session[] = [];
    private events: Event[] = [];
  
    // ======================
    // SESSION LIFECYCLE
    // ======================
  
    startSession(userId: string, dto: StartSessionDto): Session {
      const activeSession = this.sessions.find(
        (s) => s.userId === userId && s.endTime === null,
      );
  
      if (activeSession) {
        throw new BadRequestException(
          'User already has an active session',
        );
      }
  
      const newSession: Session = {
        id: randomUUID(),
        userId,
        task: dto.task,
        allowedSites: dto.allowedSites,
        startTime: new Date(),
        endTime: null,
      };
  
      this.sessions.push(newSession);
  
      return newSession;
    }
  
    stopSession(sessionId: string): Session {
      const session = this.sessions.find((s) => s.id === sessionId);
  
      if (!session) {
        throw new NotFoundException('Session not found');
      }
  
      if (session.endTime) {
        throw new BadRequestException('Session already stopped');
      }
  
      session.endTime = new Date();
  
      const metrics = this.computeMetrics(sessionId);
  
      session.focusTime = metrics.focusTime;
      session.idleTime = metrics.idleTime;
      session.interruptions = metrics.interruptions;
      session.distractions = metrics.distractions; 
      session.topDomains = metrics.topDomains;
      session.score = metrics.score;
  
      return session;
    }
  
    getSessionsByUser(userId: string): Session[] {
      return this.sessions.filter((s) => s.userId === userId);
    }
  
    // ======================
    // EVENTS
    // ======================
  
    createEvent(dto: CreateEventDto): Event {
      const session = this.sessions.find(
        (s) => s.id === dto.sessionId,
      );
  
      if (!session) {
        throw new NotFoundException('Session not found');
      }
  
      if (session.endTime) {
        throw new BadRequestException('Session already finished');
      }
  
      const event: Event = {
        id: randomUUID(),
        sessionId: dto.sessionId,
        type: dto.type,
        value: dto.value,
        timestamp: new Date(),
      };
  
      this.events.push(event);
  
      return event;
    }
  
    getEventsBySession(sessionId: string): Event[] {
      return this.events.filter((e) => e.sessionId === sessionId);
    }

    // ======================
    // DOMAIN ANALYSIS
    // ======================

    private buildDomainStats(events: Event[]) {
      const domainTime: Record<string, number> = {};

      for (let i = 0; i < events.length - 1; i++) {
        const current = events[i];
        const next = events[i + 1];
 
        if (current.type !== "TAB_CHANGE" || !current.value) continue;

        const diff =
          (next.timestamp.getTime() - current.timestamp.getTime()) / 1000;

        const domain = current.value;

        domainTime[domain] = (domainTime[domain] || 0) + diff;
      }

      return Object.entries(domainTime).map(([domain, time]) => ({
        domain,
        time,
      }));
    }

    private getDomainCategory(domain: string): DomainCategory {
      const rule = DOMAIN_RULES.find((r) =>
        domain.includes(r.match)
      );

      return (rule?.category as DomainCategory) ?? "DISTRACTION";
    }

    private isDomainRelevant(task: string, domain: string) {
      const rules = TASK_CONTEXT[task?.toLowerCase()];
        if (!rules) return false;

      return rules.some((r) => domain.includes(r));
    }
  
// ======================
// METRICS
// ======================

private computeMetrics(sessionId: string) {
  const events = this.events
    .filter((e) => e.sessionId === sessionId)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const session = this.sessions.find((s) => s.id === sessionId);

  if (!session || events.length === 0) {
    return {
      focusTime: 0,
      idleTime: 0,
      interruptions: 0,
      distractions: 0,
      score: 0,
      topDomains: [],
    };
  }

  let focusTime = 0;
  let idleTime = 0;
  let interruptions = 0;
  let distractions = 0;

  // ======================
  // PROCESAR EVENTOS
  // ======================
  for (let i = 0; i < events.length - 1; i++) {
    const current = events[i];
    const next = events[i + 1];

    const diff =
      (next.timestamp.getTime() - current.timestamp.getTime()) / 1000;

    if (current.type === "ACTIVE") {
      focusTime += diff;
    }

    if (current.type === "IDLE") {
      idleTime += diff;
      interruptions++;
    }

    if (current.type === "TAB_CHANGE") {
      interruptions++;
    }
  }

  // ======================
  // ÚLTIMO EVENTO → ENDTIME
  // ======================
  const lastEvent = events[events.length - 1];

  if (session.endTime && lastEvent) {
    const diff =
      (session.endTime.getTime() - lastEvent.timestamp.getTime()) / 1000;

    if (lastEvent.type === "ACTIVE") focusTime += diff;
    if (lastEvent.type === "IDLE") idleTime += diff;
  }

  // ======================
  // DOMAIN INTELLIGENCE
  // ======================
  const domainStats = this.buildDomainStats(events);

  const analyzedDomains = domainStats.map((d) => {
    const category = this.getDomainCategory(d.domain);
    const relevant = this.isDomainRelevant(session.task, d.domain);

    let isDistraction = false;

    // 🔥 reglas inteligentes
    if (category === "DISTRACTION") {
      isDistraction = true;
    }

    if (category === "NEUTRAL" && d.time > 120) {
      isDistraction = true;
    }

    if (!relevant && d.time > 60) {
      isDistraction = true;
    }

    if (isDistraction) distractions++;

    return {
      ...d,
      category,
      relevant,
      isDistraction,
    };
  });

  // ======================
  // TOP DOMAINS
  // ======================
  const topDomains = analyzedDomains
    .sort((a, b) => b.time - a.time)
    .slice(0, 5);

  // ======================
  // SCORE
  // ======================
  const totalTime = focusTime + idleTime;

  let score =
    totalTime > 0 ? (focusTime / totalTime) * 100 : 0;

  // penalización por distracciones
  score -= distractions * 5;

  score = Math.max(0, Math.round(score));

  return {
    focusTime: focusTime / 60,
    idleTime: idleTime / 60,
    interruptions,
    distractions,
    score,
    topDomains, // 🔥 NUEVO
  };
}
  }