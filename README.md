# Github User Search App

A Next.js + React + TypeScript application to search Github users and view their repositories.

## Features

- Search Github users by username
- View user profile details
- List user repositories with stars and descriptions
- Responsive UI with Tailwind CSS
- Loading skeletons for better UX

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Getting Started


1. **Add env:**

   use your API Github access_token and add it to the GITHUB_ACCESS_TOKEN env variable

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
atask/
├── components/
│   ├── GithubSearchUser/
│   ├── GithubUserRepositories/
│   ├── GithubUserResult/
│   ├── SearchForm/
│   └── ui/
├── hooks/
├── lib/
├── public/
├── query/
├── utils/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── tsconfig.json
└── ...
```
