export async function mutationFetcher(url, { arg }) {
    const { method = "POST", body, headers } = arg || {};

    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

    const res = await fetch(fullUrl, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Request failed");
    }

    return res.json();
}
