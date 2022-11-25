import bcrypt from "bcrypt";
import { getDbConnection } from "../db";

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",

  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { newPassword } = req.body;

    const db = getDbConnection("react-auth-db");

    const newSalt = uuid();
    const pepper = process.env.PEPPER_STRING;

    const newPasswordHash = await bcrypt.hash(
      newSalt + newPassword + pepper,
      10
    );

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { passwordResetcode: passwordResetCode, salt: newSalt },
        { $set: { passwordHash: newPasswordHash } },
        { $unset: { passwordResetcode: "" } }
      );

    if (result.lastErrorObject.n === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  },
};
