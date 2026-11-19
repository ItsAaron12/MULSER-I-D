/**
 * Almacén mínimo para preferencias del visitante (compatible con useSyncExternalStore).
 * La fuente de verdad es un atributo `data-*` de <html>, inicializado antes del
 * primer pintado por PREFERENCES_INIT_SCRIPT. localStorage es solo respaldo persistente.
 */
export interface PreferenceStore<T extends string> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (value: T) => void;
}

interface Options<T extends string> {
  storageKey: string;
  attribute: string;
  values: readonly T[];
  fallback: T;
}

export function createPreferenceStore<T extends string>(opts: Options<T>): PreferenceStore<T> {
  const listeners = new Set<() => void>();
  const attr = `data-${opts.attribute}`;

  const read = (): T => {
    const current = document.documentElement.getAttribute(attr);
    return opts.values.find((v) => v === current) ?? opts.fallback;
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: read,
    getServerSnapshot: () => opts.fallback,
    set(value) {
      document.documentElement.setAttribute(attr, value);
      try {
        window.localStorage.setItem(opts.storageKey, value);
      } catch {
        /* Almacenamiento no disponible (modo privado, política del navegador): se ignora. */
      }
      listeners.forEach((l) => l());
    },
  };
}
