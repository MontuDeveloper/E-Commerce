import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const uploadImg = async (formData) => {
  try {
    const response = await axios.post(`${base_url}upload/`, formData, config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
