export interface Edge<T> {
    node: T;
}

export interface Stargazers {
    totalCount: number;
}

export interface Repository {
    description: string | null;
    name: string;
    stargazers: Stargazers;
}

export interface User {
    avatarUrl?: string;
    name?: string;
    login?: string;
}

export interface UserRepositoryAPIResponse {
    user: {
        repositories: {
            edges: Edge <Repository> [];
        };
    }
}

export interface UserSearchAPIResponse {
    search: {
        edges: Edge<User>[];
    };
}