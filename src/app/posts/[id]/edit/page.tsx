import PrivateRoute from '@/components/PrivateRoute'
import React from 'react'

const page = () => {
  return (
    <div>
      <PrivateRoute>
        Edit page
      </PrivateRoute>
    </div>
  )
}

export default page