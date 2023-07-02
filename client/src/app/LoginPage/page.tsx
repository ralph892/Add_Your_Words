"use client";
import { IUser, loginUser } from "@/api/apiAuth";
import { Button } from "@/components/Button";
import React, { ChangeEvent } from "react";

type Props = {};

const Page = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let data: IUser = { email, password };
    const response = await loginUser(data);
    if (response) {
      setError("");
      location.assign("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="form-login_container">
      <form className="form_login">
        <div className="form-header">Login</div>
        <div className="form_section">
          <label className="form-adding_label">Email</label>
          <input
            value={email}
            className="form_input"
            type="email"
            onChange={(e) => handleEmail(e)}
          ></input>
        </div>
        <div className="form_section">
          <label className="form-adding_label">Password</label>
          <input
            className="form_input"
            type="password"
            value={password}
            onChange={(e) => handlePassword(e)}
          ></input>
        </div>
        <div className="invalid-message">
          {error !== "" && <div>{error}</div>}
        </div>
        <Button primary medium onClick={(e) => handleClick(e)}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Page;
