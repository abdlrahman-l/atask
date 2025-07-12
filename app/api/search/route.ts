// import { get } from "@/utils/fetcher"
import octoKit from "@/lib/octokit";
import { UserSearchAPIResponse } from "@/utils/interface";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(
    request: NextRequest,
) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({
            success: false,
            message: 'Bad Request. The username is required'
        }, {
            status: 400
        })
    }

    try {
        // const response = await octoKit.request('GET /search/users', {
        //     q: username,
        //     per_page: 5,
        // })

        const response = await octoKit.graphql<UserSearchAPIResponse>(`
            query Search($queryUsername: String!){
                search(first: 5, query: $queryUsername, type: USER) {
                    edges {
                        node {
                            ... on User {
                                avatarUrl
                                name
                                login
                            }
                        }
                    }
                }
            }
        `, {
            queryUsername: `${username} in:login`
        })


        return NextResponse.json({
            success: true,
            data: response,
            message: "Successfully",
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            {
                status: error.status,
                success: false,
                message: error.message || "Failed to fetch data",
            },
            { status: error.status || 500 }
        );
    }
}