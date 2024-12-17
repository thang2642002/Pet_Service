import express from "express";
import notificationController from "../controllers/notificationController";

const routes = express.Router();
routes.get("/get-all-notification", notificationController.getAllNotification);
routes.post("/create-notification", notificationController.createNotification);
routes.get(
  "/get-user-notification/:id",
  notificationController.getUserNotification
);

export default routes;
