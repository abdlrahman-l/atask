import { get } from '@/utils/fetcher';
import { UserRepositoryAPIResponse } from '@/utils/interface';
import { useQuery } from '@tanstack/react-query'

const useUserRepositories = (username?: string | null, enabled?: boolean) => {
    return useQuery({
        queryKey: ['repositories', username],
        queryFn: () => get<{
            success: boolean,
            data?: UserRepositoryAPIResponse,
            message: string,
        }>(`/api/repos/${username}`),
        enabled
    })
}

export default useUserRepositories
