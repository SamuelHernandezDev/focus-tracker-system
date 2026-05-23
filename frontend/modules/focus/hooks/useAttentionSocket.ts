//frontend/modules/focus/hooks/useAttentionSocket.ts
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

import { Socket } from 'socket.io-client';

import { getAttentionSocket } from '../services/attentionSocket';

// =========================
// HOOK
// =========================
export const useAttentionSocket = (enabled: boolean) => {
  // =========================
  // SOCKET
  // =========================
  const socketRef = useRef<Socket>(getAttentionSocket());

  // =========================
  // STATE
  // =========================
  const [connected, setConnected] = useState(false);

  // =========================
  // LIFECYCLE
  // =========================
  useEffect(() => {
    const socket = socketRef.current;

    // =========================
    // DISABLED
    // =========================
    if (!enabled) {
      socket.disconnect();

      setConnected(false);

      return;
    }

    // =========================
    // EVENTS
    // =========================
    const onConnect = () => {
      console.log('Attention socket connected');

      setConnected(true);
    };

    const onDisconnect = () => {
      console.log('Attention socket disconnected');

      setConnected(false);
    };

    socket.on('connect', onConnect);

    socket.on('disconnect', onDisconnect);

    // =========================
    // CONNECT
    // =========================
    if (!socket.connected) {
      socket.connect();
    } else {
      setConnected(true);
    }

    // =========================
    // CLEANUP
    // =========================
    return () => {
      socket.off('connect', onConnect);

      socket.off('disconnect', onDisconnect);
    };
  }, [enabled]);

  // =========================
  // EMIT
  // =========================
  const emit = useCallback(
    (
      event: string,

      payload: any
    ) => {
      // =========================
      // NOT CONNECTED
      // =========================
      if (!socketRef.current.connected) {
        return;
      }

      socketRef.current.emit(
        event,

        payload
      );
    },
    []
  );

  return {
    socket: socketRef.current,

    connected,

    emit,
  };
};
