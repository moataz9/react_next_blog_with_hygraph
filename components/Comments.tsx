import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getComments } from '../services'
import { comment } from '../types'
import parser from 'html-react-parser'

const Comments = ({ slug }: { slug: string }) => {
  const [comments, setComments]: [comment[], Function] = useState([])

  useEffect(() => {
    getComments(slug).then(result => setComments(result))
  }, [])

  return (
    <>
      {comments.length && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-0'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>{comments.length} Comments</h3>
          {comments.map(comment => (
            <div key={comment.createdAt} className='border-b border-gray-100 mb-4 pb-4'>
              <p className='mb-4'>
                <span className='font-semibold'>{comment.name}</span>
                <span className='ml-2'>on {moment(comment.createdAt).format('MMM DD, YYYY')}</span>
              </p>
              <div className='whitespace-pre-line text-gray-600 w-full'>{parser(comment.comment)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
