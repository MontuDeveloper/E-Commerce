import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}prodcategory/`);

  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(
    `${base_url}prodcategory/`,
    category,
    config
  );

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}prodcategory/${id}`, config);

  return response.data;
};

const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${base_url}prodcategory/${category.id}`,
    { title: category.pcatData.title },
    config
  );
  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}prodcategory/${id}`, config);

  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default pCategoryService;
