const DEFAULT_API_URL =
    "https://keroyokan-func-bde6ekdtcvhjb3ar.indonesiacentral-01.azurewebsites.net";
const API_PREFIX = "/api/v1";

function getApiBaseUrl() {
    const configuredBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

    return configuredBaseUrl.replace(/\/$/, "");
}

export function resolveApiUrl(url) {
    if (!url) {
        return `${getApiBaseUrl()}${API_PREFIX}`;
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    const normalizedBaseUrl = getApiBaseUrl();
    const normalizedPath = url.startsWith("/") ? url : `/${url}`;
    const apiBaseUrl = normalizedBaseUrl.endsWith(API_PREFIX)
        ? normalizedBaseUrl
        : `${normalizedBaseUrl}${API_PREFIX}`;

    return `${apiBaseUrl}${normalizedPath}`;
}

async function parseApiResponse(res) {
    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || error?.detail || "Request failed");
    }

    if (res.status === 204) {
        return null;
    }

    return res.json();
}

function isSerializableBody(body) {
    return (
        body &&
        typeof body === "object" &&
        !(body instanceof FormData) &&
        !(body instanceof URLSearchParams) &&
        !(body instanceof Blob) &&
        !(body instanceof ArrayBuffer)
    );
}

function normalizeRequestInit(init = {}) {
    if (!isSerializableBody(init.body)) {
        return init;
    }

    const headers = new Headers(init.headers || {});

    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    return {
        ...init,
        headers,
        body: JSON.stringify(init.body),
    };
}

export async function apiFetcher(url, init = {}) {
    const res = await fetch(resolveApiUrl(url), normalizeRequestInit(init));

    return parseApiResponse(res);
}

export async function mutationFetcher(url, { arg }) {
    const { method = "POST", body, headers } = arg || {};

    return apiFetcher(url, {
        method,
        headers,
        body,
    });
}
