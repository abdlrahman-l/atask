import GithubSearchUser from "@/components/GithubSearchUser";
import { Suspense, use } from "react";

type HomeProps = {
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ }: HomeProps) {
  // const currSearchParams = use(searchParams)
  // const username = currSearchParams.username

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <GithubSearchUser />
    </div>
  );
}
