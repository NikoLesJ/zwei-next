"use client"

import React, { useState } from 'react';
import { Button } from '@mui/material'
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import ModalFirst from './ModalFirst';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextRotateVerticalIcon from '@mui/icons-material/TextRotateVertical';
import useStore from '@/store/store';

const AttributesShow = ({ data }) => {
    const category = useStore((state) => state.category);
    const subCategory = useStore((state) => state.subCategory)

    const attributNames = useStore((state) => state.attributNames);
    const optionNames = useStore((state) => state.optionNames);
    const setAttributeKode = useStore((state) => state.setAttributeKode);

    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attrName, setAttrName] = useState();



    const handleButtonClick = (attributes, attributeKode, attibutName) => {
        if (attributes) {
            const optionNames = attributes.map(attr => attr.optionName);
            setSelectedAttributes(optionNames);
            setAttrName(attibutName);
            setAttributeKode(attributeKode);
        } else {
            setSelectedAttributes([]);
        }
    };

  return (
    <div className='flex md:flex-row flex-col m-1 bg-white'>
        <div className='md:w-1/2 w-full sm:p-2 relative'>
            <div className='flex flex-row justify-between px-5 bg-gray-50 rounded items-center p-1 border-b-4 border-gray-400 sticky top-14 z-10'>
                <h4 className='font-bold'>Добавить атрибут:</h4>
                <ModalFirst
                    template={attributNames}
                    data={category}
                    icon={<TextIncreaseIcon color='success' />} 
                />
            </div>
            <div className='mt-4'>
                {data.map((item) => (
                    <ul key={item.ID}>
                        <li className='flex flex-row items-center justify-between sm:p-3 py-2 pr-1 border-b border-gray-500'>
                            {item.Name}
                            {item.attributes 
                                ? <Button size="small" variant='outlined' onClick={() => handleButtonClick(item.attributes, item.atributKode, item.Name)}>
                                    <SegmentOutlinedIcon />
                                </Button> 
                                : ""
                            }
                        </li>
                    </ul>
                ))}
            </div>
        </div>
        <div className='md:w-1/2 w-full sm:p-2 relative'>
            <div className='sticky top-14'>
                <div className='flex flex-row justify-between px-5 bg-gray-50 rounded items-center p-1 border-b-4 border-gray-400'>
                    <h4 className='font-bold'>Добавить опцию для <span className='text-green-700 uppercase'>{attrName}</span>:</h4>
                    <ModalFirst
                        template={optionNames}
                        data={subCategory}
                        icon={<TextRotateVerticalIcon color='secondary'
                    />} />
                </div>
                <div className='mt-4'>
                    {selectedAttributes.length > 0 
                        ? 
                            <ul className='border'>
                                {selectedAttributes.map((optionName, index) => (
                                    <li key={index} className="sm:p-3 py-2 border-b">
                                        {optionName}
                                    </li>
                                ))}
                            </ul>
                        : <div className="text-gray-500">Нажмите на кнопку, чтобы увидеть список опций</div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default AttributesShow