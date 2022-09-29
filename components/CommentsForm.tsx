import React, { useEffect, useRef, useState } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }: { slug: string }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const commentEl = useRef<HTMLTextAreaElement>(null!)
  const nameEl = useRef<HTMLInputElement>(null!)
  const emailEl = useRef<HTMLInputElement>(null!)
  const storeDataEl = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')! 
    emailEl.current.value = window.localStorage.getItem('email')! 
  
    return () => {
      
    }
  }, [])
  

  const handleCommentSubmition = () => {
    setError(false)
    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current
    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentObj).then(res => {
      console.log(res);
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000);
    })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-0 font-semibold border-b pb-4'>Leave a reply</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          className='outline-none p-4 w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          ref={nameEl}
          type='text'
          placeholder='Name'
          name='name'
          className='px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
        <input
          ref={emailEl}
          type='email'
          placeholder='Email'
          name='email'
          className='px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input type='checkbox' ref={storeDataEl} id='storeData' name='storeData' />
          <label htmlFor='storeData' className='text-gray-500 text-xs ml-2'>
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>

      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleCommentSubmition}
          className='transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3'
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className='text-xl float-right font-semibold mt-3 text-green-500'>
            Comment Submitted For Review
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
