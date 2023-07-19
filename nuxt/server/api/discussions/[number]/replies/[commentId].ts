export interface Reply {
    id: string;
    author: string;
    createdAt: string;
    bodyHTML: string;
}

export interface RepliesResponse {
  replies: Reply[];
}

export default defineEventHandler(
async (event): Promise<RepliesResponse> => {
    const data: any = await useGraphql(
    `
    query discussionDetails($repoOwner: String!, $repoName: String!, $discussionId: Int!) {
        repository(owner: $repoOwner, name: $repoName) {
            discussion(number: $discussionId) {
                comments(first: 10) {
                    edges {
                        node {
                            id
                            replies(first: 10) {
                                edges {
                                    node {
                                        id
                                        author {
                                            login
                                        }
                                        createdAt
                                        bodyHTML
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`,
    {
        discussionId: Number(event.context.params!["number"]),
    }
    );

    const commentId = String(event.context.params!["commentId"]);

    const discussion = data.repository.discussion;
    const comment = discussion.comments.edges.find((comment: any) => comment.node.id === commentId);
    const replies: Reply[] = comment.node.replies.edges.map(r => r.node);

    return {
        replies,
    };
}
);
