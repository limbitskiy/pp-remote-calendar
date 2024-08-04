const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 5005;
const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME || "appointments";

let db;

const app = express();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Connection established on port ${PORT}`);
    });
    db = getDb();
  } else {
    console.error(err);
  }
});

app.post("/get-month", (req, res) => {
  const startDate = new Date(Date.UTC(+req.body.year, +req.body.month - 1, 1));
  const endDate = new Date(Date.UTC(+req.body.year, +req.body.month, 1));

  let results = [];

  const query = {
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  const options = {
    sort: { date: 1 },
  };

  db.collection(COLLECTION_NAME)
    .find(query, options)
    .forEach((item) => results.push(item))
    .then(() => {
      res.status(200).json(results);
    });
});

app.post("/get-day", (req, res) => {
  const startDate = new Date(Date.UTC(+req.body.year, +req.body.month - 1, +req.body.day, 0, 0, 0));
  const endDate = new Date(Date.UTC(+req.body.year, +req.body.month - 1, +req.body.day, 23, 59, 59));

  let results = [];

  const query = {
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  const options = {
    sort: { date: 1 },
  };

  db.collection(COLLECTION_NAME)
    .find(query, options)
    .forEach((item) => results.push(item))
    .then(() => {
      res.status(200).json(results);
    });
});

app.post("/get-appointment", (req, res) => {
  db.collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(req.body.id) })
    .then((doc) => {
      res.status(200).json(doc);
    });
});

app.post("/create-appointment", (req, res) => {
  let withDateObject;

  // convert to date object
  if (Date.parse(req.body.date)) {
    withDateObject = { ...req.body, date: new Date(req.body.date) };
  } else {
    res.status(500).json({ error: `Wrong date format` });
    return;
  }

  db.collection(COLLECTION_NAME)
    .insertOne(withDateObject)
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(500).json({ error: `Could not create. Error: ${err}` }));
});

app.post("/edit-appointment", (req, res) => {
  let withDateObject;

  if (Date.parse(req.body.payload.date)) {
    withDateObject = { ...req.body.payload, date: new Date(req.body.payload.date) };
  } else {
    res.status(500).json({ error: `Wrong date format` });
    return;
  }

  if (ObjectId.isValid(req.body.id)) {
    db.collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(req.body.id) }, { $set: withDateObject })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: `Could not update document` });
      });
  }
});

app.post("/remove-appointment", (req, res) => {
  if (ObjectId.isValid(req.body.id)) {
    db.collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(req.body.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: `Could not delete document` });
      });
  }
});

app.post("/login", (req, res) => {
  const pass = req.body.pass;

  console.log(pass);

  if (pass) {
    const query = {
      login: "lena",
    };

    db.collection("users")
      .findOne(query)
      .then((db) => {
        bcrypt.compare(pass, db?.pass, function (err, result) {
          if (result) {
            res.status(200).json({ msg: `Login successfull` });
          } else {
            res.status(401).json({ msg: `Wrong password` });
          }
        });
      })
      .catch((err) => {
        res.status(400).json({ error: `Could not login` });
      });
  }
});
