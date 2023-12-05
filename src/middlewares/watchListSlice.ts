import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";
import { v4 as uuidv4 } from 'uuid';

interface Watch {
  id: number;
  brand: string;
  model_name: string;
  price: number;
  movement_type: string;
  case_material: string;
  case_diameter: string;
  water_resistance: number;
  strap_material: string;
  dial_color: string;
  date_added: string;
  stock_quantity: number;
  is_available: boolean;
  sale: number;
  rate: number;
  description: string;
  image: string;
}
export const getWatchById = createAsyncThunk(
  "watchList/getWatchById",
  async (data) => {
    const response = await api.get(`/watches/${data}`);
    return response.data;
  }
);
export const addWatch = createAsyncThunk(
  "productList/addProduct",
  
  async (data:Watch) => {
    const watchId = uuidv4();
    const response = await api.post("/watches", {
      id: watchId,
      brand: data.brand,
      model_name: data.model_name,
      price: data.price,
      movement_type: data.movement_type,
      case_material: data.case_material,
      case_diameter: data.case_diameter,
      water_resistance: data.water_resistance,
      strap_material: data.strap_material,
      dial_color: data.dial_color,
      date_added: data.date_added,
      stock_quantity: data.stock_quantity,
      is_available: data.is_available,
      sale: data.sale,
      rate: data.rate,
      description: data.description,
      image: data.image,
    });

    return response.data;
  }
);
export const editWatch = createAsyncThunk(
  "productList/editProduct",
  async (data:Watch) => {
    const response = await api.put(`/watches/${data.id}`, {
      brand: data.brand,
      model_name: data.model_name,
      price: data.price,
      movement_type: data.movement_type,
      case_material: data.case_material,
      case_diameter: data.case_diameter,
      water_resistance: data.water_resistance,
      strap_material: data.strap_material,
      dial_color: data.dial_color,
      date_added: data.date_added,
      stock_quantity: data.stock_quantity,
      is_available: data.is_available,
      sale: data.sale,
      rate: data.rate,
      description: data.description,
      image: data.image,
    });
   
    
  
    return response.data;
  }
);
export const updateWatchList = createAsyncThunk(
  "watchList/updateWatchList",
  async (data: any) => {
    const cloneItem = { ...data };
    const cartQuantity = cloneItem.count;
    delete cloneItem.count;
    console.log(cloneItem, data.count);

    const response = await api.put(`/watches/${data.id}`, {
      brand: cloneItem.brand,
      model_name: cloneItem.model_name,
      price: cloneItem.price,
      movement_type: cloneItem.movement_type,
      case_material: cloneItem.case_material,
      case_diameter: cloneItem.case_diameter,
      water_resistance: cloneItem.water_resistance,
      strap_material: cloneItem.strap_material,
      dial_color: cloneItem.dial_color,
      date_added: cloneItem.date_added,
      stock_quantity: cloneItem.stock_quantity - cartQuantity,
      is_available: cloneItem.is_available,
      sale: cloneItem.sale,
      rate: cloneItem.rate,
      description: cloneItem.description,
      image: cloneItem.image,
    });

    return response.data;
  }
);

export const updateWatchStatus  = createAsyncThunk(
  "watchItem/disbaleWatch",
  async (data:Watch) => {
    const response = await api.put(`/watches/${data.id}`, {
      brand: data.brand,
      model_name: data.model_name,
      price: data.price,
      movement_type: data.movement_type,
      case_material: data.case_material,
      case_diameter: data.case_diameter,
      water_resistance: data.water_resistance,
      strap_material: data.strap_material,
      dial_color: data.dial_color,
      date_added: data.date_added,
      stock_quantity: data.stock_quantity,
      is_available: data.is_available,
      sale: data.sale,
      rate: data.rate,
      description: data.description,
      image: data.image,
    });

     return response.data;
  }
);

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    value: [],
  },
  reducers: {},
});


