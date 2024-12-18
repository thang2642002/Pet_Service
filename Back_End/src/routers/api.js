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
import apiPetReview from "./apiPetReview";
import apiServiceReview from "./apiServiceReview";
import apiCart from "./apiCart";
import apiCartItem from "./apiCartItem";
import apiPaginate from "./apiPaginate";
import apiVnPay from "./apiVnPay";
import apiSendEmail from "./apiSendEmail";
import apiContact from "./apiContact";
import apiNotification from "./apiNotification";
import apiPayments from "./apiPayments";

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
  app.use("/v1/api/pet-review", apiPetReview);
  app.use("/v1/api/service-review", apiServiceReview);
  app.use("/v1/api/cart", apiCart);
  app.use("/v1/api/cart-item", apiCartItem);
  app.use("/v1/api/paginate", apiPaginate);
  app.use("/v1/api/vnPay", apiVnPay);
  app.use("/v1/api/contact", apiContact);
  app.use("/v1/api/notification", apiNotification);
  app.use("/v1/api/email", apiSendEmail);
  app.use("/v1/api/payment", apiPayments);
};

export default apiInitWebRouter;
