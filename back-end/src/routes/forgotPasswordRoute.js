import { v4 as uuid } from "uuid";
import { sendEmail } from "./../util/sendEmail";
import { getDbConnection } from "../db";

export const forgotPasswordRoute = {
  path: "/api/forgot-password/:email",
  method: "put",

  handler: async (req, res) => {
    const { email } = req.params;

    const db = getDbConnection("react-auth-db");
    const passwordResetcode = uuid();
    const { result } = await db
      .collection("users")
      .updateOne({ email }, { $set: { passwordResetcode } });

    if (result.nModified > 0) {
      try {
        await sendEmail({
          to: email,
          from: "robert.david2540@gmail.com",
          subject: "Password reset",
          text: `
                    To rest password click this link:
                    http://localhost:3000/reset-password/${passwordResetcode}`,
        });
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }

    res.sendStatus(200);
  },
};
