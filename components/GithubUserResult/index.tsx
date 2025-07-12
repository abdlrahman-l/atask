import useSearchUserQuery from '@/hooks/useSearchUsername';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Skeleton } from '../ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import GithubUserRepositories from '../GithubUserRepositories';
import Image from 'next/image';

const GithubUserResult = () => {
    const searchParams = useSearchParams();

    const usernameQuery = searchParams.get('u');

    const { data, isLoading, isFetched } = useSearchUserQuery(usernameQuery)

    const usernameList = data?.data?.search.edges

    const isEmpty = isFetched && (!usernameList || usernameList.length === 0);

    if (isLoading) {
        return (
            <div className='space-y-2'>
                <Skeleton className="h-[36px] w-full rounded-md" />
                <Skeleton className="h-[36px] w-full rounded-md" />
                <Skeleton className="h-[36px] w-full rounded-md" />
                <Skeleton className="h-[36px] w-full rounded-md" />
                <Skeleton className="h-[36px] w-full rounded-md" />
            </div>
        )
    }

    if (isEmpty) {
        return (
            <p className='text-xs text-gray-500'>There is no username of {usernameQuery}</p>
        )
    }

    if (!isFetched) {
        return null
    }

    return (
        <div className='space-y-2'>
            <Accordion>
                {
                    usernameList?.map(u => {
                        const username = u.node.login as string
                        const imageSource = u.node.avatarUrl

                        if (!username) return null
                        return (
                            <AccordionItem key={username} value={username}>
                                <AccordionTrigger >
                                    <div className='flex items-center space-x-1.5'>
                                        {
                                            !!imageSource && (
                                                <Image
                                                    src={imageSource}
                                                    height={30}
                                                    width={30}
                                                    alt={`${username} avatar`}
                                                    className='rounded-full'
                                                />
                                            )
                                        }
                                        <h4 className='text-sm font-semibold text-neutral-500'>{username}</h4>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {
                                        ({ isOpen }) => {
                                            return (
                                                <GithubUserRepositories
                                                    isActive={isOpen}
                                                    username={username}
                                                />
                                            )
                                        }
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

export default GithubUserResult
