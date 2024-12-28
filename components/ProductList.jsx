import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextIncreaseOutlinedIcon from '@mui/icons-material/TextIncreaseOutlined';
import TextDecreaseOutlinedIcon from '@mui/icons-material/TextDecreaseOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

const ProductList = ({ content }) => {
  return (
    <div className='m-2'>
        {content.data.map((item) => (
            <Accordion key={item.id} sx={ item.check > 0 ? { borderLeft: "8px solid white"} : { borderLeft: "8px solid red", backgroundColor: "#f7f7f7"} }>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id={`panel${item.id}-header`}
                >
                    <Typography component="span">
                        <div className='flex flex-row items-center'>
                            <div className='mr-3'>
                            <Tooltip title={<img src={item.img} alt={item.name} width={150} />} placement="bottom-start">
                                <img src={item.img} alt={item.name} width={30} />
                            </Tooltip>
                            </div>
                            <div className='sm:w-80'>
                                {item.name}
                                <span className='ml-2'>
                                {item.stock === "aplus" ? <TextIncreaseOutlinedIcon sx={{ fontSize: "18px", color: "blue"}} />
                                    : item.stock === "aminus" ? <TextDecreaseOutlinedIcon sx={{ fontSize: "18px", color: "red"}} />
                                    : item.stock === "new" ? <FiberNewOutlinedIcon sx={{ fontSize: "28px", color: "green"}} />
                                    : item.stock === "b" ? <FormatBoldOutlinedIcon sx={{ fontSize: "18px", color: "brown"}} />
                                    : ""
                                }
                                </span>
                            </div>
                            <Badge badgeContent={item.count} color="success">
                                <div className='ml-5 border-2 border-blue-500 p-1 rounded bg-blue-400 text-white font-bold'>
                                    {item.price}
                                </div>
                            </Badge>
                        </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='flex flex-row flex-wrap justify-between border-b-2 border-gray-400'>
                        <div className='text-gray-400 text-sm'>
                            Key: <span className='font-bold text-black text-xl'>{item.docus}</span>
                        </div>
                        <div className='text-gray-400 text-sm'>
                            Количество: <span className='font-bold text-black text-xl'>{item.count}</span>
                        </div>
                        <div className='text-gray-400 text-sm'>
                            Качество: <span className='font-bold text-black text-xl'>{item.stock}</span>
                        </div>
                        <div className='text-gray-400 text-sm'>
                            Поставщик: <span className='font-bold text-black text-xl'>{item.vendor}</span>
                        </div>
                        <div className='text-gray-400 text-sm'>
                            Дата: <span className='font-bold text-black text-xl'>{item.created_at.slice(0,10)}</span>
                        </div>
                    </div>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant='outlined'>Edit</Button>
                    <Button variant='outlined' sx={{ borderColor: "red", color: "red"}}>Delete</Button>
                </AccordionActions>
            </Accordion>
        ))}
    </div>
  )
}

export default ProductList