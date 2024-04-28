const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skemaCatatan = new Schema(
  {
    title: String,
    description: String,
  },
  {
    statics: {
      findCatatan: function () {
        return this.find();
      },
      updatetCatatan: function (_id, doc) {
        return this.updateOne(_id, doc);
      },
      deleteCatatan: function (_id) {
        return this.deleteOne(_id);
      },
    },
  }
);

const modelCatatan = mongoose.model("Catatan", skemaCatatan, "Catatan");

const findCatatan = async () => {
  return await modelCatatan.findCatatan();
};

const findOneCatatan = async (_id) => {
  try {
    const findOne = await modelCatatan.findOne(_id);
    return findOne;
  } catch (err) {
    console.log("ada error, " + err);
  }
};

const insertCatatan = async (catatan) => {
  const doc = new modelCatatan(catatan);
  const save = await doc.save();
};

const updateCatatan = async (_id, doc) => {
  try {
    return await modelCatatan.updatetCatatan(_id, doc);
  } catch (err) {
    console.log("ada error, " + err);
  }
};

const deleteCatatan = async (_id) => {
  try {
    await modelCatatan.deleteCatatan(_id);
  } catch (err) {
    console.log("ada error, " + err);
  }
};

module.exports = {
  findCatatan,
  findOneCatatan,
  insertCatatan,
  updateCatatan,
  deleteCatatan,
};
