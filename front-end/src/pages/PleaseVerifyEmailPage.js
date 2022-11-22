import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import React from "react";

export const PleaseVerifyEmailPage = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, [history]);

  return (
    <div className='content-container'>
      <h1>Thanks for Signing up</h1>
      <p>A verification email has been to the email provided by you. </p>
    </div>
  );
};
