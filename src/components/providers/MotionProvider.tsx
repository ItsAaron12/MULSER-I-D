
"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import {
  MOTION,
  type MotionPreference,
} from "@/config/preferences";
import { createPreferenceStore } from "@/lib/preference-store";

const motionStore =
  createPreferenceStore<MotionPreference>(MOTION);

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribeSystem(callback: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () =>
    query.removeEventListener("change", callback);
}

function getSystemSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

interface MotionContextValue {
  animate: boolean;
  systemReduced: boolean;
  preference: MotionPreference;
  toggle: () => void;
}

const MotionContext =
  createContext<MotionContextValue | null>(null);

export function MotionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const preference = useSyncExternalStore(
    motionStore.subscribe,
    motionStore.getSnapshot,
    motionStore.getServerSnapshot
  );

  const systemReduced = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getServerSnapshot
  );

  const animate =
    preference === "on" ||
    (preference === "system" && !systemReduced);

  const toggle = useCallback(() => {
    const current = motionStore.getSnapshot();

    const next: MotionPreference =
      current === "system"
        ? "on"
        : current === "on"
          ? "off"
          : "system";

    motionStore.set(next);
  }, []);

  const value = useMemo(
    () => ({
      animate,
      systemReduced,
      preference,
      toggle,
    }),
    [animate, systemReduced, preference, toggle]
  );

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig
        reducedMotion={animate ? "never" : "always"}
      >
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  const context = useContext(MotionContext);

  if (!context) {
    throw new Error(
      "useMotionPreference requiere MotionProvider."
    );
  }

  return context;
}