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
  }