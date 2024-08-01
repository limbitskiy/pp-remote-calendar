export const addAppointment = async (payload) => {
  const result = await $fetch("/api/appointments/add", {
    method: "POST",
    body: payload,
  });

  if (!result.acknowledged) {
    throw new Error("Error creating an appointment!");
  }

  return true;
};

export const removeAppointment = async (_id) => {
  const result = await $fetch("/api/appointments/remove", {
    method: "POST",
    body: { id: _id },
  });

  if (!result.acknowledged) {
    throw new Error("Error removing an appointment!");
  }

  return true;
};

export const editAppointment = async (payload) => {
  const id = payload._id;

  const data = {};

  Object.keys(payload).forEach((key) => {
    if (key === "_id") return;
    data[key] = payload[key];
  });

  const result = await $fetch("/api/appointments/edit", {
    method: "POST",
    body: { id, payload: data },
  });

  if (!result.acknowledged) {
    throw new Error("Error editing an appointment!");
  }

  return true;
};
