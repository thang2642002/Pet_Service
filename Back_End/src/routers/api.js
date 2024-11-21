import apiUser from "./apiUser";
import apiPetType from "./apiPetType";
import apiCategory from "./apiCategory";
import apiPost from "./apiPost";
import apiServive from "./apiService";
import apiPet from "./apiPet";
import apiProduct from "./apiProduct";
import apiOrder from "./apiOrder";
import apiUserPet from "./apiUserPet";
import apiPetScores from "./apiPetScores";
import apiAppointment from "./apiAppointment";
import apiOrderItem from "./apiOrderItem";
import apiProductReview from "./apiProductReview";
import apiServiceReview from "./apiServiceReview";

const apiInitWebRouter = (app) => {
  app.use("/v1/api/user", apiUser);
  app.use("/v1/api/pet-type", apiPetType);
  app.use("/v1/api/category", apiCategory);
  app.use("/v1/api/post", apiPost);
  app.use("/v1/api/service", apiServive);
  app.use("/v1/api/pet", apiPet);
  app.use("/v1/api/product", apiProduct);
  app.use("/v1/api/order", apiOrder);
  app.use("/v1/api/user-pet", apiUserPet);
  app.use("/v1/api/pet-scores", apiPetScores);
  app.use("/v1/api/appointment", apiAppointment);
  app.use("/v1/api/order-item", apiOrderItem);
  app.use("/v1/api/product-review", apiProductReview);
  app.use("/v1/api/service-review", apiServiceReview);
};

export default apiInitWebRouter;