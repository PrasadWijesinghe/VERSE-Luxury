export const AUTH_STORAGE_KEY = "verse_authed";

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
