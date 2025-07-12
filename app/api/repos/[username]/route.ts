import octoKit from "@/lib/octokit";
import {  UserRepositoryAPIResponse } from "@/utils/interface";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {

    const { username } = await params;

    if (!username) {
        return NextResponse.json({
            success: false,
            message: 'Bad Request. The username is required'
        }, {
            status: 400
        })
    }

    try {
        const response = await octoKit.graphql<UserRepositoryAPIResponse>(`
            query User($login: String!) {
                user(login: $login) {
                    repositories(last: 100) {
                        edges {
                            node {
                                description
                                name
                                stargazers {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }
        `, {
            login: username
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