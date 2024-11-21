import db from "../models/index";
const getAllAppointment = async () => {
  try {
    const getAllAppointment = await db.Appointments.findAll({
      include: [
        { model: db.Services, as: "service" },
        { model: db.UserPet, as: "user_pet" },
      ],
    });
    return getAllAppointment;
  } catch (error) {
    console.log(error);
  }
};

const createAppointment = async (
  // appointment_date,
  status,
  service_id,
  user_pet_id
) => {
  try {
    const createAppointment = await db.Appointments.create({
      // appointment_date,
      status,
      service_id,
      user_pet_id,
    });
    return createAppointment;
  } catch (error) {
    console.log(error);
  }
};

const updateAppointment = async (
  appointment_id,
  appointment_date,
  status,
  service_id,
  user_pet_id
) => {
  try {
    const updateAppointment = await db.Appointments.findByPk(appointment_id);
    if (!updateAppointment) {
      return null;
    }
    await updateAppointment.update({
      appointment_date,
      status,
      service_id,
      user_pet_id,
    });
    return updateAppointment;
  } catch (error) {
    console.log(error);
  }
};

const deleteAppointment = async (appointment_id) => {
  try {
    const deleteAppointment = await db.Appointments.destroy({
      where: { appointment_id: appointment_id },
    });
    return deleteAppointment;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};