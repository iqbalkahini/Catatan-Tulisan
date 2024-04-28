const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const {
  findCatatan,
  insertCatatan,
  findOneCatatan,
  updateCatatan,
  deleteCatatan,
} = require("./schema/model");
const expressLayouts = require("express-ejs-layouts");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:3001/Iqbal")
  .then(() => {
    console.log("mongoDB conected");
  })
  .catch((err) => console.log(err));

// midleware sendiri
const requestTime = (req, res, next) => {
  req.requestTime = moment().format('ll');
  next();
};

// Menjalankan expressJS setelah terkoneksi dengan MongoDB
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/ubah/:id", express.static("public"));
app.use(requestTime);

app.get("/", async function (req, res) {
  const catatan = await findCatatan();
  res.render("main", {
    catatan,
    layout: "layouts/main-layouts",
    title: "Catatan",
    tgl : req.requestTime
  });
});

app.get("/ubah/:_id", async (req, res) => {
  const _id = req.params;
  // Lakukan operasi lainnya di sini
  const findOne = await findOneCatatan(_id);
  res.render("ubah", {
    title: "Catatan",
    layout: "layouts/main-layouts",
    catatan: findOne,
  });
});

app.post("/ubah/:id", async (req, res) => {
  const _id = { _id: req.params.id };
  await updateCatatan(_id, req.body);
  res.redirect("/");
  console.log(_id);
});

app.get("/tambah", (req, res) => {
  res.render("tambah", {
    title: "Catatan",
    layout: "layouts/main-layouts",
  });
});

app.post("/tambah", async (req, res) => {
  await insertCatatan(req.body);
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const _id = {
    _id: req.params.id,
  };
  await deleteCatatan(_id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("App listening on port 3000, http://localhost:3000/");
});
