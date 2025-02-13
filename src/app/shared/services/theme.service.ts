import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeKey = 'theme';

    constructor() {
        this.loadTheme();
    }

    toggleTheme(): void {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme: string): void {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.themeKey, theme);
    }

    loadTheme(): void {
        const savedTheme = localStorage.getItem(this.themeKey) || 'light';
        this.setTheme(savedTheme);
    }
}