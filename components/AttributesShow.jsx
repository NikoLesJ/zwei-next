"use client"

import React, { useState } from 'react';
import { Button } from '@mui/material'
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';

const AttributesShow = ({ data }) => {
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const handleButtonClick = (attributes) => {
        if (attributes) {
            const optionNames = attributes.map(attr => attr.optionName);
            setSelectedAttributes(optionNames);
        } else {
            setSelectedAttributes([]);
        }
    };

  return (
    <div className='flex sm:flex-row m-1 bg-white'>
        <div className='w-1/2 p-2'>
            {data.map((item) => (
                <ul key={item.ID}>
                    <li className='flex flex-row items-center justify-between p-3 border-b border-gray-500'>
                        {item.Name}
                        {item.attributes 
                            ? <Button size="small" variant='outlined' onClick={() => handleButtonClick(item.attributes)}>
                                <SegmentOutlinedIcon />
                              </Button> 
                            : ""
                        }
                    </li>
                </ul>
            ))}
        </div>
        <div className='w-1/2 p-2 relative'>
            <div className='sticky top-2'>
                {selectedAttributes.length > 0 
                    ? 
                        <ul className='border'>
                            {selectedAttributes.map((optionName, index) => (
                                <li key={index} className="p-3 border-b">
                                    {optionName}
                                </li>
                            ))}
                        </ul>
                    : <div className="text-gray-500">Нажмите на кнопку, чтобы увидеть список опций</div>
                }
            </div>
        </div>
    </div>
  )
}

export default AttributesShow