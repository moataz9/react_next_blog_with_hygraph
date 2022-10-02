import { request, gql } from 'graphql-request'
import type { category, comment, post } from '../types'

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
  return results.postsConnection.edges as post[]
}

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `

  const results = await request(graphqlAPI, query, { slug })
  return results.post as post
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
  return result.posts as post[]
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

  const result = await request(graphqlAPI, query, { categories, slug })
  return result.posts as post[]
}

export const getCateegories = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)
  return result.categories as category[]
}

export const submitComment = async (obj: unknown) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return result.json()
}

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })
  return result.comments as comment[]
}
