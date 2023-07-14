import axios from "axios";

export const saveLeadData = async (bodyFormData) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/save-lead-details",
    bodyFormData
  );
  return response;
};
export const saveLoginInfo = async (bodyFormData) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/user-info",
    bodyFormData
  );
  return response;
};
