'use client';
import React, { useRef } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

const SearchForm = () => {
    const { updateSearchParam } = useUpdateSearchParams()
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const usernameQuery = searchParams.get('u') || undefined

    const onClickSearchButton = () => {
        !!inputRef.current?.value && updateSearchParam('u', inputRef.current?.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickSearchButton()
        }
    };


    return (
        <>
            <Input 
                type='text' 
                placeholder="Enter username" 
                ref={inputRef}
                 defaultValue={usernameQuery} 
                 onKeyDown={handleKeyDown}
            />
            <Button className='w-full cursor-pointer' onClick={onClickSearchButton}>Search</Button>
        </>
    )
}

export default SearchForm
