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
    // METRICS
    // ======================
  
    private computeMetrics(sessionId: string) {
        const events = this.events
          .filter((e) => e.sessionId === sessionId)
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
        if (events.length === 0) {
          return {
            focusTime: 0,
            idleTime: 0,
            interruptions: 0,
            score: 0,
          };
        }
      
        let focusTime = 0;
        let idleTime = 0;
        let interruptions = 0;
      
        for (let i = 0; i < events.length - 1; i++) {
          const current = events[i];
          const next = events[i + 1];
      
          const diff =
            (next.timestamp.getTime() - current.timestamp.getTime()) / 1000;
      
          if (current.type === 'ACTIVE') focusTime += diff;
          if (current.type === 'IDLE') {
            idleTime += diff;
            interruptions++;
          }
          if (current.type === 'TAB_CHANGE') interruptions++;
        }
      
        const lastEvent = events[events.length - 1];
        const session = this.sessions.find((s) => s.id === sessionId);
      
        if (session?.endTime && lastEvent) {
          const diff =
            (session.endTime.getTime() - lastEvent.timestamp.getTime()) / 1000;
      
          if (lastEvent.type === 'ACTIVE') focusTime += diff;
          if (lastEvent.type === 'IDLE') idleTime += diff;
        }
      
        const totalTime = focusTime + idleTime;
      
        const score =
          totalTime > 0
            ? Math.round((focusTime / totalTime) * 100)
            : 0;
      
        return {
          focusTime: Math.round(focusTime / 60),
          idleTime: Math.round(idleTime / 60),
          interruptions,
          score,
        };
      }
  }