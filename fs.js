import fs from "fs";
import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 5000;
const apiKey = process.env.APIKEY;

app.get("/", (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    res.write(data);
    res.end();
  });
});
app.get("/api", (req, res) => {
  fs.readFile("./task.html", (err, data) => {
    res.write(data);
    res.end();
  });
});
