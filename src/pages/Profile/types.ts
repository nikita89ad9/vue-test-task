import type { Component } from 'vue';

export interface ProfileBadgeItem {
  icon: Component;
  heading: string;
  text?: string;
}

export interface ProfileUpdateForm {
  placeholder: string;
  model: string | undefined;
  modelKey: string;
}
