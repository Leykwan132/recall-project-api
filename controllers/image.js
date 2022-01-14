const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "f31ffbee865b420db0241a3d6e1df12c",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      // THE JPG
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};