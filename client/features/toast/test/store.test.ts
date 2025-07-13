import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToastsStore } from '../store'; // Adjust path as needed
import type { Toast, UniqueToast } from '../types'; // Adjust path as needed

describe('useToastsStore', () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia());
  });

  describe('initial state', () => {
    it('should start with an empty toasts array', () => {
      const store = useToastsStore();
      expect(store.toasts).toEqual([]);
    });
  });

  describe('add method', () => {
    it('should add a toast with auto-generated id', () => {
      const store = useToastsStore();
      const toast: Toast = {
        message: 'Test message',
        variant: 'danger',
      };

      store.add(toast);

      expect(store.toasts).toHaveLength(1);
      expect(store.toasts[0]).toEqual({
        id: 1,
        message: 'Test message',
        variant: 'danger',
      });
    });
  });

  describe('remove method', () => {
    it('should remove a toast by id', () => {
      const store = useToastsStore();

      // Add some toasts
      store.add({ message: 'First toast', variant: 'default' });
      store.add({ message: 'Second toast', variant: 'danger' });
      store.add({ message: 'Third toast', variant: 'default' });

      // Remove the middle one
      store.remove({ id: 2 } as UniqueToast);

      expect(store.toasts).toHaveLength(2);
      expect(store.toasts[0].id).toBe(1);
      expect(store.toasts[1].id).toBe(3);
    });

    it('should handle removing non-existent toast gracefully', () => {
      const store = useToastsStore();

      store.add({ message: 'First toast', variant: 'default' });
      store.add({ message: 'Second toast', variant: 'default' });

      const initialLength = store.toasts.length;

      // Try to remove a toast that doesn't exist
      store.remove({ id: 999 } as UniqueToast);

      expect(store.toasts).toHaveLength(initialLength);
      expect(store.toasts[0].id).toBe(1);
      expect(store.toasts[1].id).toBe(2);
    });

    it('should handle removing from empty store', () => {
      const store = useToastsStore();

      // Try to remove from empty store
      store.remove({ id: 1 } as UniqueToast);

      expect(store.toasts).toHaveLength(0);
    });
  });
});
