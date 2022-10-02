import type { post } from '../../types'
import React from 'react'
import { useRouter } from 'next/router'

import { getPosts, getCategories, getPostDetails } from '../../services'
import {
  PostWidget,
  Categories,
  PostDetail,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from '../../components'

const PostDetails = ({ post }: { post: post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget slug={post.slug} categories={post.categories.map(category => category.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostDetails(params.slug)
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  return {
    // paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    paths: posts.map(post => ({ params: { slug: post.node?.slug } })),
    fallback: true,
  }
}
