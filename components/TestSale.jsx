"use client"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";

const TestSale = ({ data }) => {
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

      {/* Вывод данных */}
      <div className="mt-2">
        {sortedDays.length > 0 ? (
          sortedDays.slice().reverse().map((day) => (
            <div key={day}>
              <h4 className="bg-green-600">{`${selectedYear}-${selectedMonth}-${day}`}</h4>
              {dataForSelectedYearAndMonth[day].map((item) => (
                <div key={item.id}>
                  <p>Название: {item.name}</p>
                  <p>Цена: {item.price}</p>
                  <p>Город: {item.delivery.city}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Нет данных за этот месяц.</p>
        )}
      </div>

      {/* Пагинация по месяцам */}
      <div className="flex flex-row flex-wrap justify-center gap-1 mt-2">
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
  );
};

export default TestSale