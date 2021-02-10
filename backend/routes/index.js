const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ response: "Connencted!" }).status(200);
});

module.exports = router;
