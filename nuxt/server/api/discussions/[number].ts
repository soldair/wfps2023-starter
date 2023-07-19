export interface Comment {
  id: string;
  author: string;
  createdAt: string;
  bodyHTML: string;
  replies: Reply[];
}

export interface Discussion {
  id: string;
  number: number;
  title: string;
  author: string;
  createdAt: string;
  reactionGroups: any;
  bodyHTML: string;
  comments: Comment[];
}

export interface Reply {
  id: string;
  author: string;
  createdAt: string;
  bodyHTML: string;
}

export interface DiscussionResponse {
  discussion: Discussion;
}

export default defineEventHandler(
  async (event): Promise<DiscussionResponse> => {
    const data: any = await useGraphql(
      `
    query discussionDetails($repoOwner: String!, $repoName: String!, $number: Int!) {
      repository(owner: $repoOwner, name: $repoName) {
        discussion(number: $number) {
          id,
          number
          title
          author {
            login
          }
          createdAt
          reactionGroups {
            content
            reactors {
              totalCount
            }
          }
          bodyHTML
          comments(first: 10) {
            edges {
              node {
                id
                author {
                  login
                }
                createdAt
                bodyHTML
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
        number: Number(event.context.params!["number"]),
      }
    );

    const {
      repository: {
        discussion: {
          id,
          number,
          title,
          author: { login: author },
          createdAt,
          reactionGroups,
          bodyHTML,
          comments: { edges: comments },
        },
      },
    } = data;

    const whosiewhatsits = []
    for (const { node: { id, author, createdAt, bodyHTML, replies } } of comments) {
      const thingamajigs = []
      for (const { node: { id, author, createdAt, bodyHTML } } of replies.edges) {
        thingamajigs.push({
          id,
          author: author.login,
          createdAt,
          bodyHTML,
        });
      }

      const whatsiewhosit: Comment = {
        id,
        author: author.login,
        createdAt,
        bodyHTML,
        replies: thingamajigs,
      }

      whosiewhatsits.push(whatsiewhosit)
    }

    return {
      discussion: {
        id,
        number,
        title,
        author,
        createdAt,
        reactionGroups,
        bodyHTML,
        comments: whosiewhatsits,
      },
    };
  }
);
