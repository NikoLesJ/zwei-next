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
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ProductList = ({ content }) => {
  return (
    <div className='m-2'>
        {content.data.map((item) => (
            <Accordion key={item.id} sx={ item.check > 0 ? { borderLeft: "8px solid white"} : { borderLeft: "8px solid #646464", backgroundColor: "#f7f7f7"} }>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id={`panel${item.id}-header`}
                >
                    <Typography component="span" sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div className='flex flex-row'>
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
                            </div>
                            <div className='mr-2 sm:mr-5'>
                                <Badge badgeContent={item.count} color={item.count > 0 ? "success" : "error"}>
                                    <div className='ml-5 border-2 border-blue-500 p-1 rounded bg-blue-400 text-white font-bold'>
                                        {item.price}
                                    </div>
                                </Badge>
                            </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer>
                            <Table size='small'>
                            <TableHead>
                                <TableRow>
                                <TableCell>Key.</TableCell>
                                <TableCell>Цена</TableCell>
                                <TableCell align="right">Дата</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                <TableRow>
                                    <TableCell>{item.docus}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell align="right">{item.created_at.slice(0,10)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                    <AutoAwesomeOutlinedIcon 
                                        sx={item.stock === "new" ? { color: "#2e7d32"}
                                                : item.stock === "aplus" ? { color: "#1565c0"} 
                                                : item.stock === "a" ? { color: "#ff6f00"} 
                                                : item.stock === "aminus" ? { color: "#c62828"} 
                                                : { color: "#795548"} } 
                                    />
                                    </TableCell>
                                    <TableCell>{item.vendor}</TableCell>
                                    <TableCell align="right">{item.count}</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                      </TableContainer>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant='outlined'>Edit</Button>
                    <Link href={`/sklad/${item.id}`}>
                        <Button variant='outlined' sx={{ borderColor: "red", color: "red"}}>More</Button>
                    </Link>
                </AccordionActions>
            </Accordion>
        ))}
    </div>
  )
}

export default ProductList