import { memo } from "react";
import Image from "next/image";
import CatImage1 from "../../assets/category-cavat.jpg";
import CatImage2 from "../../assets/category-watch.jpg";
import CatImage3 from "../../assets/category-shoes.jpg";
import { ShoppingOutlined } from "@ant-design/icons";

function CategoryComponent() {
  return (
    <>
      <div className="h-[50vh] w-full flex flex-col items-center">
        <h2 className="text-3xl mt-[3%]">Category <ShoppingOutlined /></h2>
        <div
          className="flex justify-between w-3/5 flex-wrap"
        >
          <a href="/Product" className="group w-1/3 max-w-[calc(33.33% - 20px)] max-h-44 p-2 transition-transform transform-gpu hover:scale-90">
            <Image src={CatImage1} alt={""}></Image>
            <h3 className="text-2xl mt-3% text-center">Cravat</h3>
          </a>
          <a href="/Product" className="group w-1/3 max-w-[calc(33.33% - 20px)] max-h-44 p-2 transition-transform transform-gpu hover:scale-90">
            <Image src={CatImage2} alt={""}></Image>
            <h3 className="text-2xl mt-3% text-center">Watch</h3>
          </a>
          <a href="/Product" className="group w-1/3 max-w-[calc(33.33% - 20px)] max-h-44 p-2 transition-transform transform-gpu hover:scale-90">
            <Image src={CatImage3} alt={""}></Image>
            <h3 className="text-2xl mt-3% text-center">Shoes</h3>
          </a>
        </div>
      </div>
    </>
  );
}

export default memo(CategoryComponent);
