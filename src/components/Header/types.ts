import type { Component } from 'vue';

export interface HeaderMenu {
  icon: Component;
  text: string;
  route: string;
  param?: string;
  action?: () => void;
}
