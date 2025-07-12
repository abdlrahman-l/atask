import { Octokit } from "@octokit/core";

const octoKit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})

export default octoKit;
