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
    query discussionDetails($commentId: ID!) {
        node(id: $commentId) {
            ... on DiscussionComment {
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
    }`,
    {
        commentId: String(event.context.params!["commentId"]),
    }
    );

    const { node: { replies: { edges: replyEdges } } } = data;
    const replies: Reply[] = replyEdges.map(r=>r.node);

    return {
        replies,
    };
}
);