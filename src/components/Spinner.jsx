import React from 'react'
import spinner from '../assets/spinner.svg'

const Spinner = () => {
  return (
    <div className='bg-gray-300 bg-opacity-50 flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-50'>
      <div>
        <img src={spinner} alt="Loading" />
      </div>
    </div>
  )
}

export default Spinner
