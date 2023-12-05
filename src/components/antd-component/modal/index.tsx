import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal, message } from "antd";
import { DefaultButton2 } from "../../button/defaul-button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./index.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWatch, editWatch } from "../../../middlewares/watchListSlice";

interface Watch {
  id: number;
  brand: string;
  model_name: string;
  price: number;
  movement_type: string;
  case_material: string;
  case_diameter: number;
  water_resistance: number;
  strap_material: string;
  dial_color: string;
  date_added: string;
  stock_quantity: number;
  is_available: boolean;
  sale: number;
  description: string;
  image: string;
}

const ModalComponent = ({
  open,
  showModal,
  getWatchsList,
  handleCancel,
  selectedProduct,
  removeWatchChoosing,
}: {
  open: boolean;
  showModal: () => void;
  getWatchsList: () => void;
  handleCancel: () => void;
  selectedProduct?: Watch;
  removeWatchChoosing: () => void;
}) => {
  let watchSchema = yup.object().shape({
    brand: yup.string().required(),
    model_name: yup.string().required(),
    price: yup.number().required(),
    movement_type: yup.string().required(),
    case_material: yup.string().required(),
    case_diameter: yup.number().required(),
    water_resistance: yup.number().required(),
    strap_material: yup.string().required(),
    dial_color: yup.string().required(),
    date_added: yup.string().required(),
    stock_quantity: yup.number().required(),
    is_available: yup.boolean().required(),
    sale: yup.number().required(),
    description: yup.string().required(),
    image: yup.string().required(),
  });

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(watchSchema),
  });

  const handleOk = (data?: any) => {
    selectedProduct ? updateWatch(selectedProduct.id, data) : addNewWatch(data);
  };

  async function addNewWatch(productItem: any) {
    try {
      const newProductItem = { ...productItem };
      await dispatch(addWatch(newProductItem)).unwrap();
      message.success("Add product successful", 1);
      handleCancel();
      reset();
      getWatchsList();
    } catch (e) {
      alert("something wrong");
    }
  }

  async function updateWatch(id: number, productItem: any) {
    try {
      const newProductItem = {
        id,
        ...productItem,
      };

      await dispatch(editWatch(newProductItem)).unwrap();
      message.success("Edit product successful", 1);
    } catch (error) {
      console.log(error);
    }
    handleCancel();
    removeWatchChoosing();
    // setSelectedImageUrl("");
    getWatchsList();
  }

  useEffect(() => {
    // console.log(product);

    if (selectedProduct === undefined) {
      reset({
        brand: "Longiness",
        model_name: "",
        price: 0,
        movement_type: "Automatic",
        case_material: "",
        case_diameter: 0,
        water_resistance: 0,
        strap_material: "",
        dial_color: "",
        date_added: "",
        stock_quantity: 0,
        is_available: true,
        sale: 0,
        description: "",
        image: "",
      });
    } else {
      reset({
        brand: selectedProduct.brand,
        model_name: selectedProduct.model_name,
        price: selectedProduct.price,
        movement_type: selectedProduct.movement_type,
        case_material: selectedProduct.case_material,
        case_diameter: selectedProduct.case_diameter,
        water_resistance: selectedProduct.water_resistance,
        strap_material: selectedProduct.strap_material,
        dial_color: selectedProduct.dial_color,
        date_added: selectedProduct.date_added,
        stock_quantity: selectedProduct.stock_quantity,
        is_available: selectedProduct.is_available,
        sale: selectedProduct.sale,
        description: selectedProduct.description,
        image: selectedProduct.image,
      });
    }
  }, [selectedProduct]);

  return (
    <>
      
      <DefaultButton2 handleOk={showModal} content="Add new product" />
      <Modal
        open={open}
        title={selectedProduct ? "Update product" : "Add new product"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form id="modal" onSubmit={handleSubmit(handleOk)}>
          <div className="form__container">
            <label htmlFor="modal__brand">Brand</label>
            <select id="modal_brand" {...register("brand")}>
              <option value="Longiness">Longiness</option>
              <option value="Rolex">Rolex</option>
              <option value="Audemars Piguet">Audemars Piguet</option>
              <option value="Patek Philippe">Patek Philippe</option>
            </select>
            <p className="error" id="sale-error"></p>
          </div>

          <div className="form__container">
            <label htmlFor="modal__name">Name</label>
            <input
              type="text"
              {...register("model_name")}
              placeholder="Input name"
              id="modal__name"
            />
            <p className="error" id="name-error"></p>
          </div>

          <div className="form__container">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              {...register("price")}
              placeholder="Input price"
              id="price"
            />
            <p className="error" id="name-error"></p>
          </div>
          <div className="form__container">
            <label htmlFor="movement_type">Movement Type</label>
            <select id="movement_type" {...register("movement_type")}>
              <option value="Automatic">Automatic</option>
              <option value="Quartz">Quartz</option>
              <option value="Mechanical">Mechanical</option>
            </select>
            <p className="error" id="movement_type-error">
              {errors.movement_type?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="case_material">Case Material</label>
            <input
              type="text"
              {...register("case_material")}
              placeholder="Enter case material"
              id="case_material"
            />
            <p className="error" id="case_material-error">
              {errors.case_material?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="case_diameter">Case Diameter</label>
            <input
              type="number"
              {...register("case_diameter")}
              placeholder="Enter case diameter"
              id="case_diameter"
            />
            <p className="error" id="case_diameter-error">
              {errors.case_diameter?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="water_resistance">Water Resistance</label>
            <input
              type="number"
              {...register("water_resistance")}
              placeholder="Enter water resistance"
              id="water_resistance"
            />
            <p className="error" id="water_resistance-error">
              {errors.water_resistance?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="strap_material">Strap Material</label>
            <input
              type="text"
              {...register("strap_material")}
              placeholder="Enter strap material"
              id="strap_material"
            />
            <p className="error" id="strap_material-error">
              {errors.strap_material?.message}
            </p>
          </div>
          <div className="form__container">
            <label htmlFor="dial_color">Dial Color</label>
            <input
              type="text"
              {...register("dial_color")}
              placeholder="Enter dial color"
              id="dial_color"
            />
            <p className="error" id="dial_color-error">
              {errors.dial_color?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="date_added">Date Added</label>
            <input
              type="date"
              {...register("date_added")}
              placeholder="Select date added"
              id="date_added"
            />
            <p className="error" id="date_added-error">
              {errors.date_added?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="stock_quantity">Stock Quantity</label>
            <input
              type="number"
              {...register("stock_quantity")}
              placeholder="Enter stock quantity"
              id="stock_quantity"
            />
            <p className="error" id="stock_quantity-error">
              {errors.stock_quantity?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="is_available">Is Available</label>
            <select id="is_available" {...register("is_available")}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <p className="error" id="is_available-error">
              {errors.is_available?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="sale">Sale</label>
            <input
              type="number"
              {...register("sale")}
              placeholder="Enter sale percentage"
              id="sale"
            />
            <p className="error" id="sale-error">
              {errors.sale?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              {...register("description")}
              placeholder="Enter product description"
              id="description"
            />
            <p className="error" id="description-error">
              {errors.description?.message}
            </p>
          </div>

          <div className="form__container">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              {...register("image")}
              placeholder="Enter image URL"
              id="image"
            />
            <p className="error" id="image-error">
              {errors.image?.message}
            </p>
          </div>
          <button className="bg-sky-400 px-4 py-2 rounded-lg" type="submit">
            {selectedProduct ? "Edit" : "Add"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalComponent;
