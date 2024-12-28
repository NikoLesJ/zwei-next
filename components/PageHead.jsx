import { Button } from '@mui/material'
import React from 'react'

const PageHead = () => {
  return (
    <div className='flex flex-row border-b-2 border-gray-200 items-center p-3'>
        <div className='flex-1'>

        </div>
        <div>
            <Button variant='outlined'>
                Add
            </Button>
        </div>
    </div>
  )
}

export default PageHead