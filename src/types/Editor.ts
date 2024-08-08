import type { Component } from 'vue';

export interface EditorPanelItem {
  icon: Component;
  title: string;
  name: string;
  disabled?: boolean;
  active?: boolean;
  action: (() => boolean | void) | undefined;
}

export interface EditorOptions {
  [key: string]: EditorPanelItem;
}

export interface EmojiItem {
  emoji: string;
  emoticons: string[];
  name: string;
  shortcodes: string[];
  tags: string[];
  group: string;
  fallbackImage: string;
  version: number;
}

export interface EditorMentionsItem {
  avatar: string;
  email: string;
  username: string;
}
