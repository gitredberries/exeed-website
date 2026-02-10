import { defineStore } from 'pinia';

interface HeaderState {
  headerTheme: 'dark' | 'light';
  currentPath: string;
  showWorldModal: boolean;
  showNav: boolean;
  showFooter: boolean;
}

export const useHeaderStore = defineStore({
  id: 'header',
  state: (): HeaderState => ({
    headerTheme: 'dark',
    currentPath: '',
    showWorldModal: false,
    showNav: true,
    showFooter: true,
  }),
  actions: {
    setHeaderTheme(theme: 'dark' | 'light') {
      this.headerTheme = theme;
    },
    setPath(path: string) {
      this.currentPath = path;
      sessionStorage.setItem('currentPath', path);
    },
    setWorldModal(bool: boolean) {
      this.showWorldModal = bool;
    },
    setShowNav(bool: boolean) {
      this.showNav = bool;
    },
    setShowFooter(bool: boolean) {
      this.showFooter = bool;
    }
  },
})