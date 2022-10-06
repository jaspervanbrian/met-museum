import axiosInstance from "services/Axios";

export const getObjects = async (options = {}) => {
  return await axiosInstance.get(`/public/collection/v1/objects`, options);
};

export const searchObjectsWithImages = async (
  q: string = "*",
  options = {}
) => {
  return await axiosInstance.get(
    `/public/collection/v1/search?hasImages=true&q=${q}`,
    options
  );
};

export const getObject = (id: number, options = {}) => {
  return axiosInstance.get(`/public/collection/v1/objects/${id}`, options);
};
