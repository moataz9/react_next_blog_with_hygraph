import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const results = await request(graphqlAPI, query)
  return results.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts () {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage { url }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)
  return result.posts
}

export const getSimilarPosts = async (categories?: string[], slug?: string) => {
  const query = gql`
    query getPostDetails($slug: String!, $categories: [String!]) {
      posts(where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, {categories, slug})
  return result.posts
}
