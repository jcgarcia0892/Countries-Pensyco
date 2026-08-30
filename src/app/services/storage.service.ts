import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    } catch {
      return false;
    }
  }

  getItem<T>(key: string, defaultValue: T): T {
    if (!this.isStorageAvailable()) {
      return defaultValue;
    }

    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return defaultValue;
      }
      return JSON.parse(raw) as T;
    } catch (error) {
      console.error(`[StorageService] Error reading key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): boolean {
    if (!this.isStorageAvailable()) {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[StorageService] Error writing key "${key}" to localStorage:`, error);
      return false;
    }
  }

  removeItem(key: string): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}" from localStorage:`, error);
    }
  }

  clear(): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      console.error('[StorageService] Error clearing localStorage:', error);
    }
  }
}
