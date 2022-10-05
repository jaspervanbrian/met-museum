import axiosInstance from "services/Axios";

export const getObjects = async (options = {}) => {
  console.log("ASDASD");
  console.log(
    await axiosInstance.get(`/public/collection/v1/objects`, options)
  );
  return await axiosInstance.get(`/public/collection/v1/objects`, options);
};

export const getObjectsWithImages = async (q: string = "*", options = {}) => {
  return await axiosInstance.get(
    `/public/collection/v1/search?hasImages=true&q=${q}`,
    options
  );
};

export const getObject = (id: number, options = {}) => {
  return axiosInstance.get(`/public/collection/v1/objects/${id}`, options);
};
