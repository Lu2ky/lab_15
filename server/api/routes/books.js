const express = require("express");
const repo = require("../model/model");

const router = express.Router();

router.get("/", async (req, res) => {
    getBooks(res);
});
router.post("/", async (req, res) => {
    postBooks(req, res);
});
router.patch("/:id", async (req, res) => {
    patchBooks(req, res);
});
router.delete("/:id", async (req, res) => {
    deleteBooks(req, res);
});

module.exports = router;
