db = db.getSiblingDB("sandbox-db");

db.appointments.insertMany([
  {
    name: "Надя",
    price: 1200,
    date: new Date("2024-08-13T12:00:00.000Z"),
  },
  {
    name: "Женя",
    price: 2100,
    date: new Date("2024-08-13T15:00:00.000Z"),
  },
  {
    name: "Укупник",
    price: 1000,
    date: new Date("2024-08-01T09:40:13.525Z"),
  },
  {
    name: "Виктор Степанович",
    price: 2000,
    date: new Date("2024-08-03T12:00:00.000Z"),
  },
  {
    name: "Новиков",
    price: 2400,
    date: new Date("2024-07-31T15:00:00.000Z"),
  },
  {
    name: "Натали",
    price: 450,
    date: new Date("2024-07-11T10:15:00.000Z"),
  },
  {
    name: "Перова",
    price: 12,
    date: new Date("2024-09-01T16:10:00.000Z"),
  },
  {
    name: "Савва",
    price: 240,
    date: new Date("2024-09-30T17:30:00.000Z"),
  },
  {
    name: "Алекс",
    price: 1500,
    date: new Date("2024-08-31T18:15:00.000Z"),
  },
  {
    name: "Василий Второй",
    price: 1200,
    date: new Date("2024-08-02T13:10:00.000Z"),
  },
  {
    name: "Олег",
    price: 300,
    date: new Date("2024-08-13T08:00:00.000Z"),
  },
]);

db.users.insertOne({
  login: "lena",
  pass: "$2a$07$kIG.dbBl7tNrCO16LS/pEe92TOqpGy6xN8S4j.hzSsq9q25CBFxEe",
});
