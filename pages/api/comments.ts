// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * Any File inside the Folder pages/api is mapped to /api/* and
 * will be treated as an API endpoint instead of a page.
 */
import type { NextApiRequest, NextApiResponse } from 'next'

import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string

export default async function comments(req: NextApiRequest, res: NextApiResponse) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.HYGRAPH_TOKEN as string}`,
    },
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(
        data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }
      ) {
        id
      }
    }
  `
  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  })
  return res.status(200).send(result)
}
