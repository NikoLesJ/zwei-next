"use client"

import { FormControl, InputLabel, MenuItem, Select, Accordion, AccordionActions, AccordionDetails, AccordionSummary, Badge, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React, { useState, useEffect } from "react";

const SaleList = ({ data }) => {
    // Функция для группировки по годам и месяцам
    const groupByYearAndMonth = (data) => {
      return data.reduce((acc, item) => {
        const [year, month, day] = item.created_at.split(" ")[0].split("-");
        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = {};
        if (!acc[year][month][day]) acc[year][month][day] = [];
        acc[year][month][day].push(item);
        return acc;
      }, {});
    };
    
    const groupedData = groupByYearAndMonth(data.data);
  
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear());
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
    useEffect(() => {
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth);
    }, []);
  
    const handleYearChange = (e) => {
      const year = e.target.value;
      setSelectedYear(year);
      setSelectedMonth("01");
    };
  
    const handleMonthChange = (month) => {
      setSelectedMonth(month);
    };
  
    const months = [
      "01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12",
    ];
  
    const dataForSelectedYearAndMonth =
      groupedData[selectedYear]?.[selectedMonth] || {};
  
    const sortedDays = Object.keys(dataForSelectedYearAndMonth).sort((a, b) =>
      new Date(`${selectedYear}-${selectedMonth}-${a}`) -
      new Date(`${selectedYear}-${selectedMonth}-${b}`)
    );


  return (
    <div>
        <div className="flex flex-row justify-between items-center p-2 mx-2 border-b-2 border-gray-500">
            <div className="text-xl">
                Данные за <span className="font-bold underline">{selectedMonth}.{selectedYear}</span>
            </div>
            <div>
                <FormControl sx={{ width: "8rem"}}>
                <InputLabel id="demo-simple-select-label">Год:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedYear}
                    label="Год:"
                    onChange={handleYearChange}
                >
                    {Object.keys(groupedData).map((year) => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>
      </div>

      <div className='m-2'>
        {sortedDays.length > 0 ? (
          sortedDays.slice().reverse().map((day) => (
            <div key={day} className='bg-gray-100'>

              {dataForSelectedYearAndMonth[day].map((item) => (
                <Accordion 
                  sx={item.success === "0" ? { borderLeft: "6px solid #1b5e20", backgroundColor: "#e8f5e9" } 
                                : item.success === "1" ? { borderLeft: "6px solid #2196f3" } 
                                : item.success === "3" ? { borderLeft: "6px solid #880e4f", backgroundColor: "#f8bbd0" } 
                                : ""} 
                  key={item.id}
                >
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${item.id}-header`}
                      id={`panel${item.id}-header`}
                    >
                      <Typography component="span" sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div>
                          <Badge 
                            badgeContent={item.marketm === "rozetka" ? "R" 
                                                : item.marketm === "site" ? "S"
                                                : item.marketm === "allo" ? "A"
                                                : item.marketm === "prom" ? "P"
                                                : item.marketm === "epicentr" ? "E"
                                                : item.marketm === "olx" ? "O"
                                                : "@" } 
                            color={item.marketm === "rozetka" ? "success" 
                                        : item.marketm === "site" ? "primary"
                                        : "secondary" } 
                          >
                            <span className='pr-3'>{item.name}</span>
                          </Badge>
                        </div>
                        <div>
                          <Badge badgeContent={Math.floor(item.marge)} color='secondary' max={999999}>
                            <span className='border border-blue-700 text-white font-bold p-1 bg-blue-700 rounded'>{Math.floor(item.market_p)}</span>
                          </Badge>
                        </div>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size='small'>
                          <TableHead>
                            <TableRow>
                              <TableCell>Кол.</TableCell>
                              <TableCell>Цена</TableCell>
                              <TableCell>Сумм.</TableCell>
                              <TableCell>Разн.</TableCell>
                              <TableCell>Вых.</TableCell>
                            </TableRow>
                          </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>{Math.floor(item.count)}</TableCell>
                                <TableCell>{Math.floor(item.price)}</TableCell>
                                <TableCell>{Math.floor(item.market_p)}</TableCell>
                                <TableCell>{Math.floor(item.summa)}</TableCell>
                                <TableCell><span className={item.marge > 0 ? 'bg-blue-700 rounded p-1 text-white' : ""}>{Math.floor(item.marge)}</span></TableCell>
                              </TableRow>
                              {item.sub_products.length > 0 
                                ? <>
                                    {item.sub_products.map((sub, index) => (
                                      <TableRow key={index} sx={{ backgroundColor: "#f5f5f5"}}>
                                        <TableCell>{sub.sub_count}</TableCell>
                                        <TableCell colSpan={3}>{sub.sub_name}</TableCell>
                                        <TableCell>{Math.floor(sub.sub_price)}</TableCell>
                                      </TableRow>
                                    ))}
                                </>
                                : ""
                              }
                              <TableRow>
                                <TableCell colSpan={2}>{item.delivery.city}</TableCell>
                                <TableCell colSpan={2}>{item.delivery.phone}</TableCell>
                                <TableCell>
                                  <LocalShippingIcon 
                                    sx={item.delivery.delivery_type === "novaPost" ? { color: "#f44336"}
                                              : item.delivery.delivery_type === "ukrPost" ? { color: "#ffc107"} 
                                              : item.delivery.delivery_type === "rozetka" ? { color: "#4caf50"} 
                                              : item.delivery.delivery_type === "samosbor" ? { color: "#673ab7"} 
                                              : { color: "#0277bd"} } 
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                    <AccordionActions>
                      <Button variant='outlined' color='success'>EDIT</Button>
                      <Button variant='outlined' color='success'>UPD</Button>
                    </AccordionActions>
                </Accordion>
                ))}

              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row flex-1 justify-end sm:gap-4 gap-1 sm:mr-5 mr-2'>
                  <p>Total: <span className='font-bold'>2222</span></p>
                  <p>Total: <span className='font-bold'>2222</span></p>
                  <p>Total: <span className='font-bold'>2222</span></p>
                </div>
                <div className='font-bold bg-gray-300 border-r-4 border-gray-500 pl-2 pr-5 py-1'>
                  {`${selectedYear}-${selectedMonth}-${day}`}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Нет данных за этот месяц.</p>
        )}
      </div>

      {/* Пагинация по месяцам */}
      <div className="flex flex-row flex-wrap justify-center gap-1 my-2">
        {months.slice().reverse().map((month) => (
            <Button 
                size="small"
                key={month} 
                variant={selectedMonth === month ? "contained" : "outlined"} 
                onClick={() => handleMonthChange(month)} 
            >
                {month}
            </Button>
        ))}
      </div>

  </div>
  )
}

export default SaleList