import axiosInstance from "services/Axios";

export const getObjectsWithImages = async (q: string = "*", options = {}) => {
  return await axiosInstance.get(
    `/public/collection/v1/search?hasImages=true&q=${q}`,
    options
  );
};
