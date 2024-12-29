import { Button } from '@mui/material'
import React from 'react'

const PageHead = ({ head }) => {
  return (
    <div className='flex flex-row border-b-2 border-gray-200 items-center p-3'>
        <div className='flex-1'>
          <h3>Список атрибутов для: <span className='text-green-700 uppercase'>{head}</span></h3>
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