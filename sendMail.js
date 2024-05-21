import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({
  path: "./.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER, //sender gmail
    pass: process.env.APP_PASSWORD, //App password from Gmail
  },
});

const mailOptions = {
  from: {
    name: "N9 Solution",
    address: process.env.USER,
  }, // sender address
  to: ["sudha3neupane@gmail.com"], // list of receivers
  subject: "Sent email using nodemailer in the gmail", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
  attachments: {
    filename: "Finder.pptx",
    path: path.join(__dirname, "Finder.pptx"),
  },
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent succesfully");
  } catch (error) {
    console.log(error);
  }
};

sendMail(transporter, mailOptions);
