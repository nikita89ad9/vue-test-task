import type { Component } from 'vue';

export interface SidebarItem {
  name: string;
  icon: Component;
  routeName: string;
}
