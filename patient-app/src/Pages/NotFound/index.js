import React from 'react'

export default function NotFound() {
  return (
      <div className='h-screen w-full relative'>

          <div className='w-1/4 h-/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <img src='assets/arts/notfound.svg' alt='Page not found' />
              <h2 className='text-center mt-14 text-2xl'> Sorry.! Page Not Found </h2>
          </div>

      </div>
  )
}
