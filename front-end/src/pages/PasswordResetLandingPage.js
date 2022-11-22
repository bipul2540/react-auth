import { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { PasswordResetFailed } from "./PasswordResetFailed";
import { PasswordResetSuccess } from "./PasswordResetSuccess";

export const PasswordResetLandingPage = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const { passwordResetCode } = useParams();

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        newPassword: passwordValue,
      });
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };

  if (isFailure) return <PasswordResetFailed />;

  if (isSuccess) return <PasswordResetSuccess />;

  return (
    <div className='content-container'>
      <h1>Reset Password</h1>
      <p>Please Enter a new Password</p>

      <input
        type='password'
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder='Password'
      />
      <input
        type='password'
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder='Confirm Password'
      />
      <button
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onResetClicked}>
        Reset Password
      </button>
    </div>
  );
};
