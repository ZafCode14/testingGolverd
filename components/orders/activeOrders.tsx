import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

interface Address {
  address: string;
  firstName: string;
  city: string;
  country: string;
  apartment: string;
  postalCode: string;
};

interface Product {
  name: string;
  price: string;
  images: string[];
  docID: string;
}

interface Products {
  product: Product;
  quantity: number;
};

interface Price {
  total: number;
  subtotal: number;
  discount: number;
  delivery: number;
}

interface Order {
  id: string;
  userId: string;
  address: Address;
  products: Products[];
  totalPrice: number;
  price: Price;
  status: string;
  paymentMethod: string;
  createdAt: Timestamp;
  estimatedArrival: Timestamp;
};
interface Props {
  orders: Order[];
  status: string;
}
function ActiveOrders({ orders, status }:Props) {
  const filteredAndSortedOrders = [...orders]
  .filter((order) => order.status === status) // Filter by status
  .sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()); // Sort by createdAt

  return (
    <div className="flex w-full pt-10 mt-[2px]" style={{
      height: "calc(100vh - 220px)"
    }}>
      {/* Order Information */}
      <div className="flex flex-col w-full">
      {
        filteredAndSortedOrders.map((order, index) => {
          return (
            <div key={index} className={`
              flex flex-col-reverse md:flex-row
              pb-20
            `}>

              {/* Pricing information */}
              <div className="flex flex-col w-full md:w-[50%] px-10 mb-20]">
                {/* Orders timestamps */}
                <div className="bg-[white] rounded-md px-5 py-2">
                  <div className="flex justify-between">
                    <p className="text-[12px]">Order Placed</p>
                    <p className="text-[12px]">9/8/2024</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[12px]">Estimated Delivery Date</p>
                    <p className="text-[12px]">16/8/2024</p>
                  </div>
                </div>

                {/* Orders Total and Subtotal */}
                <div className="flex flex-col w-full bg-[white] px-5 rounded-md justify-center mt-2">
                  {/* Sub Total */}
                  <div className="flex justify-between mb-1 text-[10px] font-bold">
                    <p>Sub Total</p>
                    <p>{order.price.subtotal} EGP</p>
                  </div>

                  {/* Gem Discount */}
                  <div className="flex justify-between mb-1 text-[10px]">
                    <p>Discount</p>
                    <p>-{order.price.discount} EGP</p>
                  </div>

                  {/* Delivery */}
                  <div className="flex justify-between mb-1 text-[10px]">
                    <p>Delivery</p>
                    <p>{order.price.delivery} EGP</p>
                  </div>

                  <div className="border-b border-[#c9c9c9] mb-1"></div>

                  {/* Total */}
                  <div className="flex justify-between font-bold text-lg">
                    <p className="text-[12px]">Total Price</p>
                    <p className="text-[12px]">{order.price.total} EGP</p>
                  </div>
                </div>
              </div>

              {/* product Information */}
              <div className="w-full md:w-[50%]">
                {order.products.map(({ product, quantity }, index) => (
                  <div
                    key={index}
                    className="flex bg-[white] items-center justify-between mb-2 rounded-md text-[12px]"
                  >
                    <Image
                      alt="product image"
                      src={product.images[0]}
                      width={80}
                      height={80}
                      priority
                      className="h-[70px] w-[70px] ml-2 object-contain"
                    />
                    <p>{product.name}</p>
                    <div className="flex flex-col items-center">
                      <p>{product.price} EGP</p>
                      <p>x{quantity}</p>
                    </div>
                    <div className="flex items-center">

                    <Link href={`/shop/product/${product.docID}`} className="mx-2 font-bold underline">View in Store</Link>

                    </div>
                  </div>
                ))}
              </div>
            </div>

          )
        })
      }
      </div>
    </div>
  );
}

export default ActiveOrders;