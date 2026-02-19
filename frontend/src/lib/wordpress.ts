import type {
  WPPost,
  WPPageInfo,
  WPGraphQLResponse,
} from "@/types/wordpress";

const GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL || "";

const POSTS_PER_PAGE = 9;

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!GRAPHQL_URL) {
    throw new Error(
      "WORDPRESS_GRAPHQL_URL environment variable is not configured"
    );
  }

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json: WPGraphQLResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  return json.data;
}

type PolylangLanguage = "EN" | "BG";

export async function getPosts(
  first: number = POSTS_PER_PAGE,
  after?: string,
  language?: PolylangLanguage
): Promise<{
  posts: WPPost[];
  pageInfo: WPPageInfo;
}> {
  const data = await fetchGraphQL<{
    posts: {
      nodes: WPPost[];
      pageInfo: WPPageInfo;
    };
  }>(
    `
    query GetPosts($first: Int!, $after: String, $language: LanguageCodeFilterEnum) {
      posts(first: $first, after: $after, where: { status: PUBLISH, language: $language }) {
        nodes {
          id
          databaseId
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `,
    { first, after, language }
  );

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  };
}

export async function getPostBySlug(
  slug: string,
  language?: PolylangLanguage
): Promise<WPPost | null> {
  const data = await fetchGraphQL<{
    postBy: WPPost | null;
  }>(
    `
    query GetPostBySlug($slug: String!) {
      postBy(slug: $slug) {
        id
        databaseId
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  `,
    { slug }
  );

  return data.postBy;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{
    posts: { nodes: { slug: string }[] };
  }>(`
    query GetAllPostSlugs {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `);

  return data.posts.nodes.map((node) => node.slug);
}
