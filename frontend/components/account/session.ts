import { useSyncExternalStore } from "react";

export const AUTH_STORAGE_KEY = "verse_authed";
export const AUTH_TOKEN_KEY = "verse_token";
export const AUTH_USER_KEY = "verse_user";
export const AUTH_CHANGE_EVENT = "verse_auth_change";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

function emitAuthChange() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  } catch {
    // ignore
  }
}

export function getIsAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setIsAuthed(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, value ? "true" : "false");
  } catch {
    // ignore
  }
}

export function setAuthSession(params: { token: string | null; user: AuthUser }) {
  if (typeof window === "undefined") return;
  try {
    setIsAuthed(true);
    if (params.token) window.localStorage.setItem(AUTH_TOKEN_KEY, params.token);
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(params.user));
    emitAuthChange();
  } catch {
    // ignore
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  try {
    setIsAuthed(false);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem(AUTH_USER_KEY);
    emitAuthChange();
  } catch {
    // ignore
  }
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export type AuthSnapshot = {
  authed: boolean;
  user: AuthUser | null;
};

let cachedAuthed: boolean | null = null;
let cachedUserRaw: string | null = null;
let cachedUser: AuthUser | null = null;
let cachedSnapshot: AuthSnapshot | null = null;

function readAuthSnapshotFromStorage(): { authed: boolean; userRaw: string | null } {
  if (typeof window === "undefined") return { authed: false, userRaw: null };
  try {
    return {
      authed: window.localStorage.getItem(AUTH_STORAGE_KEY) === "true",
      userRaw: window.localStorage.getItem(AUTH_USER_KEY),
    };
  } catch {
    return { authed: false, userRaw: null };
  }
}

function parseUser(raw: string | null): AuthUser | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function getAuthSnapshot(): AuthSnapshot {
  const { authed, userRaw } = readAuthSnapshotFromStorage();

  if (
    cachedSnapshot &&
    cachedAuthed === authed &&
    cachedUserRaw === userRaw
  ) {
    return cachedSnapshot;
  }

  cachedAuthed = authed;
  cachedUserRaw = userRaw;
  cachedUser = parseUser(userRaw);
  cachedSnapshot = { authed, user: cachedUser };
  return cachedSnapshot;
}

export function subscribeAuth(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  };
}

const SERVER_SNAPSHOT: AuthSnapshot = { authed: false, user: null };

export function useAuthSession(): AuthSnapshot {
  return useSyncExternalStore(subscribeAuth, getAuthSnapshot, () => SERVER_SNAPSHOT);
}
