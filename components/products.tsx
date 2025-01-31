"use client";
import { useDispatch, useSelector } from "react-redux";
import Product from "./product";
import { RootState } from "@/store/store";
import { Product as ProductType } from "@/lib/types";
import { setCategoriesR, setSearchR } from "@/store/filterSlice";

type Props = {
  products: ProductType[];
}
const Products = ({ products }: Props) => {
  const dispatch = useDispatch();
  const vendors =  useSelector((state: RootState) => state.data.vendors);
  const categories = useSelector((state: RootState) => state.filter.categories);
  const price = useSelector((state: RootState) => state.filter.price);
  const search = useSelector((state: RootState) => state.filter.search);

  // Filter products based on criteria
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    const matchesPrice = product.price >= price[0] && product.price <= price[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="flex flex-wrap justify-around">
      {filteredProducts.map((product) => {
        return (
          <div
            key={product.docID} // Use unique identifier for key
            className="max-w-[48%] w-[200px] xl:w-[18%] h-[150px] mb-[70px] mx-[1%]"
            onClick={() => {
              dispatch(setCategoriesR([]));
              dispatch(setSearchR(""));
            }}
          >
            <Product product={product} vendors={vendors} />
          </div>
        );
      })}
    </div>
  );
};

export default Products;