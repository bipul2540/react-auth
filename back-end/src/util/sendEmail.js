import nodemailer from "nodemailer";

export const sendEmail = ({ to, from, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "robert.david2540@gmail.com",
      pass: "Robertdavid@2540",
    },
  });

  const msg = { to, from, subject, text };
  console.log(to);

  //   transporter.verify((err, success) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("ready for message");
  //       console.log(success);
  //     }
  //   });

  transporter.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
