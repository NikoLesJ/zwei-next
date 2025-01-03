import SaleList from "@/components/SaleList";

async function getData() {
  const response = await fetch("https://tg-chat.zwei.fun/sales", {
    next: {
      revalidate: 60
    }
  })
  return response.json();
}

const SalesPage = async () => {
  const saleList = await getData()
  return (
    <div>
      <SaleList data={saleList} />
    </div>
  )
}

export default SalesPage