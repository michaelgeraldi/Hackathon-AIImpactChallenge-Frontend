const STORAGE_KEY = "keroyok-ai-workspace-session";

function isBrowser() {
    return typeof window !== "undefined";
}

export function getWorkspaceSession() {
    if (!isBrowser()) {
        return {};
    }

    try {
        const rawValue = window.localStorage.getItem(STORAGE_KEY);

        return rawValue ? JSON.parse(rawValue) : {};
    } catch {
        return {};
    }
}

export function saveWorkspaceSession(nextSession) {
    if (!isBrowser()) {
        return nextSession;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));

    return nextSession;
}

export function mergeWorkspaceSession(patch) {
    const currentSession = getWorkspaceSession();

    return saveWorkspaceSession({
        ...currentSession,
        ...patch,
    });
}

export function clearWorkspaceSession() {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
}
