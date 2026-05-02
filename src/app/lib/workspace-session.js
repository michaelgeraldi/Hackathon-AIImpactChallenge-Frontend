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

    if (patch.project_id && patch.project_name) {
        const projects = currentSession.projects || [];
        const existingIndex = projects.findIndex(p => p.project_id === patch.project_id);
        
        if (existingIndex >= 0) {
            projects[existingIndex] = {
                project_id: patch.project_id,
                project_name: patch.project_name,
            };
        } else {
            projects.push({
                project_id: patch.project_id,
                project_name: patch.project_name,
            });
        }
        
        return saveWorkspaceSession({
            ...currentSession,
            projects,
            project_id: patch.project_id,
            project_name: patch.project_name,
        });
    }

    return saveWorkspaceSession({
        ...currentSession,
        ...patch,
    });
}

export function setActiveProject(projectId) {
    const currentSession = getWorkspaceSession();
    const projects = currentSession.projects || [];
    const project = projects.find(p => p.project_id === projectId);
    
    if (project) {
        return saveWorkspaceSession({
            ...currentSession,
            project_id: projectId,
            project_name: project.project_name,
        });
    }
    return currentSession;
}

export function getProjectList() {
    const session = getWorkspaceSession();
    return session.projects || [];
}

export function clearWorkspaceSession() {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
}
