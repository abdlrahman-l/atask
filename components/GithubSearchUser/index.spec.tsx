import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GithubSearchUser from './index';
import { describe, it } from 'node:test';
const { useRouter } = require('next/navigation');
import '@testing-library/jest-dom'

// atask/components/GithubSearchUser/index.test.tsx

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/test-path'),
    useSearchParams: jest.fn(() => new URLSearchParams()),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));


describe('GithubSearchUser', () => {
    it('renders input and button', () => {
        render(<GithubSearchUser />);
        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('updates search param and calls router.push on search', () => {
        const mockPush = jest.fn();
        useRouter.mockReturnValue({ push: mockPush });

        render(<GithubSearchUser />);
        const input = screen.getByPlaceholderText('Enter username');
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'testuser' } });
        fireEvent.click(button);

        expect(mockPush).toHaveBeenCalledWith('/test-path?login=testuser');
    });

    it('does not call router.push if input is empty', () => {
        const mockPush = jest.fn();
        useRouter.mockReturnValue({ push: mockPush });

        render(<GithubSearchUser />);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.click(button);

        expect(mockPush).not.toHaveBeenCalled();
    });

    it('inputRef points to the input element', () => {
        render(<GithubSearchUser />);
        const input = screen.getByPlaceholderText('Enter username');
        expect(input).toBeInstanceOf(HTMLInputElement);
    });
});