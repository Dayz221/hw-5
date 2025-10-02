class APIClient {
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request(
        method: "GET" | "POST" | "DELETE",
        path: string,
        data?: unknown,
        options: RequestInit = {}
    ) {
        const url = `${this.baseURL}${path}`;
        const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

        const headers: Record<string, string> = {
            ...(options.headers as Record<string, string> || {}),
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        if (data && method !== "GET") {
            headers["Content-Type"] = "application/json";
        }

        const fetchOptions: RequestInit = {
            ...options,
            method,
            headers,
            next: { revalidate: 60 },
        };

        if (data && method !== "GET") {
            fetchOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, fetchOptions,);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async get(path: string, options: RequestInit = {}) {
        return this.request("GET", path, undefined, options);
    }

    async post(path: string, data: unknown = {}, options: RequestInit = {}) {
        return this.request("POST", path, data, options);
    }

    async delete(path: string, options: RequestInit = {}) {
        return this.request("DELETE", path, undefined, options);
    }
}

export default APIClient;