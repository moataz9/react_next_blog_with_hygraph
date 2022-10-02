import type { post } from '../../types'
import React from 'react'
import { Categories, Loader, PostCard } from '../../components'
import { getCategories, getCategoryPost } from '../../services'
import { useRouter } from 'next/router'

function CategoryPost({ posts }: { posts: post[] }) {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPost

// Fetch data at build time
export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const posts = await getCategoryPost(params.slug)
  return { props: { posts } }
}

/**
 * Specify dynamic routes to pre-render pages based on data.
 * The HTML is Genereated at build time and will be resued on each request.
 **/
export const getStaticPaths = async () => {
  const categories = await getCategories()
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
