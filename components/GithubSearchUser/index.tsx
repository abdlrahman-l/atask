'use client';

import React, { Suspense } from 'react'
import SearchForm from '../SearchForm';
import { Skeleton } from '../ui/skeleton';
import GithubUserResult from '../GithubUserResult';


const GithubSearchUser = () => {

    return (
        <div>
            <div className='space-y-2.5'>
                <Suspense fallback={<>
                    <Skeleton className="h-[36px] w-full rounded-md" />
                    <Skeleton className="h-[36px] w-full rounded-md" />
                </>}>
                    <SearchForm />
                </Suspense>
                <Suspense>
                    <GithubUserResult />
                </Suspense>
            </div>
        </div>
    )
}

export default GithubSearchUser