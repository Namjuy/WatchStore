import { PriceStep } from "../../../components/antd-component/price-step";
import { FilterButton } from "../../../components/button/filter-button";
import "./index.css";
interface FilterItem {
  selectedBrand: string;
  selectedColor: string;
  selectedType: string;
  selectedMaterial: string;
  setSelectedBrand: (any: string) => void;
  setSelectedColor: (any: string) => void;
  setSelectedType: (any: string) => void;
  setSelectedMaterial: (any: string) => void;
  filtWatch: () => void;
}

export const WatchFilter: React.FC<FilterItem> = ({
  selectedBrand,
  selectedColor,
  selectedMaterial,
  selectedType,
  setSelectedBrand,
  setSelectedColor,
  setSelectedType,
  setSelectedMaterial,
  filtWatch,
}) => {
  const handleDoubleClick = (setterFunction: any) => {
    return () => {
      setterFunction("");
    };
  };

  return (
    <>
      <div className="filter__heading">Lọc sản phẩm</div>
      <h2 className="filter__title">DANH MỤC</h2>
      <div className="filter__line"></div>
      <h2 className="filter__title">Hãng</h2>
      <div className="filter__category">
        <div className="filter__category-brand">
          {" "}
          <input
            type="radio"
            id="brand1"
            name="brand"
            value="rolex"
            checked={selectedBrand === "rolex"}
            onChange={() => setSelectedBrand("rolex")}
            onDoubleClick={handleDoubleClick(setSelectedBrand)}
          />
          <label htmlFor="brand1"> Rolex</label>
        </div>
        <div className="filter__category-brand">
          {" "}
          <input
            type="radio"
            id="brand2"
            name="brand"
            value="casio"
            checked={selectedBrand === "casio"}
            onChange={() => setSelectedBrand("casio")}
            onDoubleClick={handleDoubleClick(setSelectedBrand)}
          />
          <label htmlFor="brand2"> Casio</label>
        </div>
      </div>
      <h2 className="filter__title">Giá (VNĐ)</h2>
      <div className="filter__category">
        <PriceStep />
      </div>
      <h2 className="filter__title">Màu</h2>
      <div className="filter__category">
        <div className="filter__category-color">
          {" "}
          <input
            type="radio"
            id="color1"
            name="color"
            value="black"
            checked={selectedColor === "black"}
            onChange={() => setSelectedColor("black")}
            onDoubleClick={handleDoubleClick(setSelectedColor)}
          />
          <label htmlFor="color1"> Black</label>
        </div>
        <div className="filter__category-color">
          {" "}
          <input
            type="radio"
            id="color2"
            name="color"
            value="grey"
            checked={selectedColor === "grey"}
            onChange={() => setSelectedColor("grey")}
            onDoubleClick={handleDoubleClick(setSelectedColor)}
          />
          <label htmlFor="color2"> Grey</label>
        </div>

        <div className="filter__category-color">
          <input
            type="radio"
            id="color3"
            name="color"
            value="leather"
            checked={selectedColor === "leather"}
            onChange={() => setSelectedColor("leather")}
            onDoubleClick={handleDoubleClick(setSelectedColor)}
          />
          <label htmlFor="color3"> Leather </label>
        </div>
        <br />
      </div>
      <h2 className="filter__title">Phân loại</h2>
      <div className="filter__category">
        <div className="filter__category-type">
          {" "}
          <input
            type="radio"
            id="type1"
            name="type"
            value="automatic"
            checked={selectedType === "automatic"}
            onChange={() => setSelectedType("automatic")}
            onDoubleClick={handleDoubleClick(setSelectedType)}
          />
          <label htmlFor="type1"> Automatic</label>
        </div>
        <div className="filter__category-type">
          {" "}
          <input
            type="radio"
            id="type2"
            name="type"
            value="quartz"
            checked={selectedType === "quartz"}
            onChange={() => setSelectedType("quartz")}
            onDoubleClick={handleDoubleClick(setSelectedType)}
          />
          <label htmlFor="type2"> Quartz</label>
        </div>
      </div>

      <h2 className="filter__title">Chất liệu</h2>
      <div className="filter__category">
        <div className="filter__category-material">
          {" "}
          <input
            type="radio"
            id="material1"
            name="material"
            value="Stainless Steel"
            checked={selectedMaterial === "Stainless Steel"}
            onChange={() => setSelectedMaterial("Stainless Steel")}
            onDoubleClick={handleDoubleClick(setSelectedMaterial)}
          />
          <label htmlFor="material1"> Stainless Steel</label>
        </div>
        <div className="filter__category-material">
          {" "}
          <input
            type="radio"
            id="material2"
            name="material"
            value="resin"
            checked={selectedMaterial === "resin"}
            onChange={() => setSelectedMaterial("resin")}
            onDoubleClick={handleDoubleClick(setSelectedMaterial)}
          />
          <label htmlFor="material2"> Resin</label>
        </div>
      </div>
      <div className="filter__category">
        <FilterButton onClick={filtWatch} />
      </div>
    </>
  );
};
