import { setCategoriesR, setPriceR } from "@/store/filterSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";

function ProductsFilter() {
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const products =  useSelector((state: RootState) => state.data.products);
  const categories = useSelector((state: RootState) => state.filter.categories);
  const price = useSelector((state: RootState) => state.filter.price);
  const dispatch = useDispatch();

  useEffect(() => {
    const allCategories = products.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(allCategories)); // Remove duplicates
    setFilteredCategories(uniqueCategories);
  }, [products])


  // Function to handle category toggling
  const handleCategoryChange = (category: string) => {
    const updatedCategories = categories.includes(category)
      ? categories.filter((cat) => cat !== category) // Remove if already selected
      : [...categories, category]; // Add if not selected

    // Dispatch the action to update the categories in Redux
    dispatch(setCategoriesR(updatedCategories));
  };

  const handlePrice = (newPrice: number[]) => {
    dispatch(setPriceR(newPrice));
  } 

  return (
    <div className="bg-[#d8d1cd] rounded-md text-black flex flex-col p-5">
      <h4 className='text-lg'>Categories</h4>
      <div className='w-[40px] border-b-[1px] border-black  mb-3 mt-1'></div>
      {filteredCategories.map((category) => (
        <div key={category} className="flex items-center">
          <input
            type="checkbox"
            id={category}
            checked={categories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          <label htmlFor={category} className="ml-2">{category}</label>
        </div>
      ))}

      <div className="w-full flex flex-col items-center mt-7">
        <h4 className="self-start text-lg">Price Range</h4>
      <div className='w-[40px] border-b-[1px] border-black  mb-8 mt-1 self-start'></div>
        <div className="w-full">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[0, 300000]}
            min={0}
            max={300000}
            step={500}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            pearling
            minDistance={0}
            onChange={handlePrice}
          />
          <div className="flex justify-between mt-4 text-sm">
            <span>Price: {price[0]} EGP</span>
            <span>{price[1]} EGP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsFilter;