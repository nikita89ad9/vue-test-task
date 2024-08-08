import type { Component } from 'vue';

export interface ChatPreview {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  unread: number;
}

export interface ContextMenuItems {
  name: string;
  action: () => void;
}

interface Sender {
  id: number;
  name: string;
  thumbnail: string;
}

export interface Message {
  id: string;
  sender: Sender;
  message: string;
  timestamp: Date;
}

export interface Chat {
  chat_id: number;
  time: Date;
  members: Sender[];
  messages: Message[];
}

export interface ChatMenuItem {
  icon: Component;
  text: string;
  name: string;
}
