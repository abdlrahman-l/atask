import { get } from '@/utils/fetcher';
import { UserSearchAPIResponse } from '@/utils/interface';
import { useQuery } from '@tanstack/react-query'
import React from 'react'


const useSearchUserQuery = (username?: string | null) => {
    return useQuery({
        queryKey: ['username', username],
        queryFn: () => get<{
            success: boolean,
            data?: UserSearchAPIResponse,
            message: string,
        }>('/api/search', {
            params: {
                username
            }
        }),
        enabled: !!username
    })
}

export default useSearchUserQuery