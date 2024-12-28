import PageHead from '@/components/PageHead';
import ProductList from '@/components/ProductList';
import Link from 'next/link';
import React from 'react'

export const metadata = {
  title: "Sklad",
  description: "All Products from Sklad",
};

async function getData() {
  const response = await fetch("https://tg-chat.zwei.fun/warehouse/", {
    next: {
      revalidate: 60
    }
  })
  return response.json()
}

const Sklad = async () => {
  const products = await getData()

  return (
    <>
    <PageHead />
    <ProductList content={products} />
    </>
  )
}

export default Sklad