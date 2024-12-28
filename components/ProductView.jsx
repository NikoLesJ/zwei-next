import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';

const ProductView = ({ props }) => {
  return (
    <div>
        <Box>
            <Paper>
                <div className='px-5'>
                    <div className='flex flex-row justify-between border-b-2 border-gray-500 py-2 items-center'>
                        <h1 className='text-3xl ml-2'>
                            <span className='mr-4'>{props.count >= 0 ? <CheckBoxOutlinedIcon color="success" /> : <DoDisturbAltOutlinedIcon /> }</span>
                             {props.name}
                            
                        </h1>
                        <h3 className='text-green-700 text-2xl mr-2'>{props.price} Uah</h3>
                    </div>
                    <div className='py-2 flex sm:flex-row'>
                        <div className='p-2 border-2'>
                            <img src={props.img} alt={props.name} width={150} />
                        </div>
                        <div className='py-2 px-5 text-xl'>
                            <p>Состояние: {props.stock}</p>
                            <p>Количество: {props.count}</p>
                            <p>Поставщик: {props.vendor}</p>
                            <p>ОФ?: {props.check > 0 ? <span className='text-green-600'>"Yes"</span> : <span className='text-red-600'>"No"</span>}</p>
                            <p>Дата покупки: {props.created_at.slice(0,10)}</p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between border-t-2 border-gray-500 py-2'>
                        <Button variant='outlined'>Edit</Button>
                        <Button variant='outlined' sx={{ color: "red", borderColor: "red"}}>Delete</Button>
                    </div>
                </div>
            </Paper>
        </Box>
    </div>
  )
}

export default ProductView