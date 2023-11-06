const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const dotenv = require(`dotenv`);
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const cvRoutes = require("./routes/cvRoutes");

dotenv.config();
connectDB();
const app = express();
const cors = require("cors");

const localfrontend = "http://localhost:3000";

const corsOptions = {
  origin: localfrontend,
  credentials: true,
  optionSuccessStatus: 200,
};

const tempFileDir = "./temp/";

if (!fs.existsSync(tempFileDir)) {
  fs.mkdirSync(tempFileDir);
}

app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json()); // for server to accept json data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempFileDir,
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cv", cvRoutes);

app.get("/home", (req, res) => {
  console.log("reached home");
  res.send("Reached home");
});

const PORT = process.env.PORT || 5001; //PORT = 5001

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
