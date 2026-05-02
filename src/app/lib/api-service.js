import { apiFetcher } from "./api";

export const pmApi = {
  health: () => apiFetcher("/pm/health"),

  bootstrapProject: (overview) =>
    apiFetcher("/pm/projects/bootstrap", {
      method: "POST",
      body: { overview },
    }),

  getProjectContext: (projectId) =>
    apiFetcher(`/pm/projects/${projectId}/context`),

  getPmLogs: (projectId, { actionType, limit = 50, offset = 0 } = {}) => {
    const params = new URLSearchParams();
    if (actionType) params.append("action_type", actionType);
    params.append("limit", limit);
    params.append("offset", offset);
    return apiFetcher(`/pm/projects/${projectId}/logs?${params.toString()}`);
  },

  addProjectUpdate: (projectId, update) =>
    apiFetcher(`/pm/projects/${projectId}/updates`, {
      method: "POST",
      body: update,
    }),

  createTaskBreakdown: (data) =>
    apiFetcher("/pm/task-breakdown", {
      method: "POST",
      body: data,
    }),

  checkWork: (data) =>
    apiFetcher("/pm/work-check", {
      method: "POST",
      body: data,
    }),

  generateReport: (data) =>
    apiFetcher("/pm/reports", {
      method: "POST",
      body: data,
    }),

  generateTimeline: (data) =>
    apiFetcher("/pm/timeline/generate", {
      method: "POST",
      body: data,
    }),

  getTimeline: (projectId) =>
    apiFetcher(`/pm/projects/${projectId}/timeline`),

  updateTaskStatus: (projectId, taskId, data) =>
    apiFetcher(`/pm/projects/${projectId}/tasks/${taskId}/status`, {
      method: "POST",
      body: data,
    }),

  getAgentEvents: (projectId, targetAgent) => {
    const params = targetAgent
      ? `?target_agent=${targetAgent}`
      : "";
    return apiFetcher(`/pm/projects/${projectId}/events${params}`);
  },

  resolveEvent: (projectId, eventId, data) =>
    apiFetcher(`/pm/projects/${projectId}/events/${eventId}/resolve`, {
      method: "POST",
      body: data,
    }),
};

export const secretaryApi = {
  createConversation: (data) =>
    apiFetcher("/secretary/conversations", {
      method: "POST",
      body: data,
    }),

  listConversations: (projectId) =>
    apiFetcher(`/secretary/projects/${projectId}/conversations`),

  sendMessage: (data) =>
    apiFetcher("/secretary/messages", {
      method: "POST",
      body: data,
    }),

  getChatHistory: (data) =>
    apiFetcher("/secretary/chat/history", {
      method: "POST",
      body: data,
    }),

  summarizeChat: (data) =>
    apiFetcher("/secretary/chat/summarize", {
      method: "POST",
      body: data,
    }),

  createMeeting: (data) =>
    apiFetcher("/secretary/meetings", {
      method: "POST",
      body: data,
    }),

  listMeetings: (projectId, status) => {
    const params = status ? `?status=${status}` : "";
    return apiFetcher(
      `/secretary/projects/${projectId}/meetings${params}`
    );
  },

  completeMeeting: (projectId, meetingId, data) =>
    apiFetcher(
      `/secretary/projects/${projectId}/meetings/${meetingId}/complete`,
      {
        method: "POST",
        body: data,
      }
    ),

  getSuggestions: (data) =>
    apiFetcher("/secretary/suggest", {
      method: "POST",
      body: data,
    }),
};

export const talentApi = {
  signupWithCv: (data) =>
    apiFetcher("/talent/signup/cv", {
      method: "POST",
      body: data,
    }),

  generateProfile: (profileId, data = { enhance_with_ai: true }) =>
    apiFetcher(`/talent/profiles/${profileId}/generate`, {
      method: "POST",
      body: data,
    }),

  getProfile: (profileId) =>
    apiFetcher(`/talent/profiles/${profileId}`),

  getProfileByUser: (userId) =>
    apiFetcher(`/talent/users/${userId}/profile`),

  updateProfile: (profileId, data) =>
    apiFetcher(`/talent/profiles/${profileId}`, {
      method: "PATCH",
      body: data,
    }),

  searchProfiles: (data) =>
    apiFetcher("/talent/profiles/search", {
      method: "POST",
      body: data,
    }),

  createMatchRequest: (data) =>
    apiFetcher("/talent/match", {
      method: "POST",
      body: data,
    }),

  getMatchDetails: (matchId) =>
    apiFetcher(`/talent/matches/${matchId}`),
};
