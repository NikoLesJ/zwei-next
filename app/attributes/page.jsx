"use client"; // Поскольку будет использоваться состояние и события

import React, { useState } from "react";
import AttributesShow from "@/components/AttributesShow";

const AttributList = () => {
  const [category, setCategory] = useState("rozetka"); // Первое значение
  const [subCategory, setSubCategory] = useState("internet"); // Второе значение
  const [data, setData] = useState(null); // Состояние для данных
  const [loading, setLoading] = useState(false); // Состояние для отображения загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

  const marketList = [
    {id: "1", market: "Rozetka", value: "rozetka"},
    {id: "2", market: "Allo", value: "allo"},
    {id: "3", market: "Epicentr", value: "epicentr"},
    {id: "4", market: "Prom", value: "prom"},
    {id: "5", market: "Kasta", value: "kasta"}
  ]
  const categoryList = [
    {id: "1", attrName: "Internet", value: "internet"},
    {id: "2", attrName: "Phones", value: "phone"},
    {id: "3", attrName: "Audio", value: "audio"}
  ]

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Сбрасываем ошибки при новом запросе

    try {
      const response = await fetch(
        `https://tg-chat.zwei.fun/${category}/${subCategory}/extended`,
        { next: { revalidate: 60 } }
      );
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row p-4 gap-3">
        {/* Выбор категорий */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-60"
        >
            {marketList.map((item) => (
                <option key={item.id} value={item.value}>{item.market}</option>
            ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="border p-2 w-60"
        >
            {categoryList.map((item) => (
                <option key={item.id} value={item.value}>{item.attrName}</option>
            ))}
        </select>

        {/* Кнопка для загрузки данных */}
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white p-2 rounded w-60"
        >
          Загрузить данные
        </button>
      </div>

      {/* Результаты */}
      <div className="px-4">
        {loading && <p>Загрузка...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {data && <AttributesShow 
                  data={data}
                />}
      </div>
    </div>
  );
};

export default AttributList;
