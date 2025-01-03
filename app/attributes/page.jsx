"use client";

import useStore from "@/store/store";
import React, { useState } from "react";
import AttributesShow from "@/components/AttributesShow";

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

const AttributList = () => {
  const setCategory = useStore((state) => state.setCategory)
  const setSubCategory = useStore((state) => state.setSubCategory)

  const setAttributNames = useStore((state) => state.setAttributNames);
  const setOptionNames = useStore((state) => state.setOptionNames);
  const resetAttributeKode = useStore((state) => state.resetAttributeKode);

  const [category, setLocalCategory] = useState("rozetka"); // Первое значение
  const [subCategory, setLocalSubCategory] = useState("internet"); // Второе значение
  const [data, setData] = useState(null); // Состояние для данных
  const [loading, setLoading] = useState(false); // Состояние для отображения загрузки
  const [error, setError] = useState(null); // Состояние для ошибок


  const fetchData = async () => {
    resetAttributeKode();
    setLoading(true);
    setError(null); // Сбрасываем ошибки при новом запросе
    setCategory(category); // Сохраняем в глобальный store
    setSubCategory(subCategory);      // Сохраняем в глобальный store

    try {
      const response = await fetch(
        `https://tg-chat.zwei.fun/${category}/${subCategory}/extended`,
        { next: { revalidate: 60 } }
      );
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      const result = await response.json();


            // Получаем ключи из первого элемента данных, если он есть
            if (result.data && result.data.length > 0) {
              // Получаем все ключи кроме 'attributes'
              const mainKeys = Object.keys(result.data[0]).filter(key => key !== 'attributes');
              setAttributNames(mainKeys);
      
              // Получаем ключи из первого элемента attributes, если он существует
              if (result.data[0].attributes && result.data[0].attributes.length > 0) {
                const attrKeys = Object.keys(result.data[0].attributes[0]);
                setOptionNames(attrKeys);
              }
            }

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
          onChange={(e) => setLocalCategory(e.target.value)}
          className="border p-2 w-60"
        >
            {marketList.map((item) => (
                <option key={item.id} value={item.value}>{item.market}</option>
            ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) => setLocalSubCategory(e.target.value)}
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
      <div className="sm:px-4">
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
