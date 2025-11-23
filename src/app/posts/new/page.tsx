import PrivateRoute from '@/components/PrivateRoute'
import React from 'react'

const page = () => {
  return (
    <div>
      <PrivateRoute>
        Create page
      </PrivateRoute>
    </div>
  )
}

export default page