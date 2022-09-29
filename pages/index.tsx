import type { post } from '../types'

import Head from 'next/head'

import { getPosts } from '../services'
import { Categories, PostCard, PostWidget } from '../components'

const Home = ({ posts }: { posts: post[] }) => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>React Blog App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post,i) => (
            <PostCard post={post.node} key={i} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = (await getPosts()) || []
  return {
    props: {
      posts,
    },
  }
}

export default Home
