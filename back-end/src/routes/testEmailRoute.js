import { sendEmail } from "../util/sendEmail";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import { v4 as uuidv4 } from "uuid";
uuidv4();

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      const { _id, email } = req.body;
      //   const currentUrl = "https://localhost:5000/";

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "robert.david2540@gmail.com",
          pass: "Robertdavid@2540",
        },
      });

      const details = {
        from: "bipulkumar73520@gmail.com",
        to: "robert.david2540@gmail.com",
        subject: "Does this work",
        text: "yes it works",
      };

      transporter.sendMail(details, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
