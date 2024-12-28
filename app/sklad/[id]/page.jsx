import ProductView from "@/components/ProductView";

async function getData(id) {
    const response = await fetch(`https://tg-chat.zwei.fun/warehouse/${id}`, {
      next: { revalidate: 60 }
    });
    return response.json();
   }
   
   export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getData(id)
    return {
      title: `Product ${product.data.name}`
    };
   }
   
   const ProductDetail = async ({ params }) => {
    const { id } = await params;
    const product = await getData(id);
   
    return (
      <div className="m-2">
        <ProductView 
            props={product.data}
        />
      </div>
    );
   };
   
   export default ProductDetail;