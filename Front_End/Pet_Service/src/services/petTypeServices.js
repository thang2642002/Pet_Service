import axios from "../configs/axiosCustommize";

const getAllPetType = () => {
  return axios.get("/pet-type/get-all-pet-type");
};

const createPetType = (type_name, description) => {
  const data = { type_name, description };
  return axios.post("/pet-type/create-pet-type", data);
};

const deletePetType = (pet_type_id) => {
  return axios.delete(`/pet-type/delete-pet-type/${pet_type_id}`, {
    data: { pet_type_id },
  });
};

export { getAllPetType, createPetType, deletePetType };