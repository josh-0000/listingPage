import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/ListingContext";
import { ViewContext } from "src/Context/ViewContext";

function LoginPage(): JSX.Element {
  const { changePage } = useContext(ViewContext);
  return (
    <div className="container text-center account-information-container">
      <div className="row m-4 justify-content-center">
        <h1>Account Login</h1>
      </div>
      <form action="/login" method="POST">
        <div className="form-group row justify-content-center">
          <label htmlFor="email" className="row mt-2 justify-content-center">
            Email
          </label>
          <div className="row mt-2 mb-4 account-input-field-container">
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-control account-input-field"
            />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label htmlFor="password" className="row justify-content-center mt-2">
            Password
          </label>
          <div className="row mt-2 account-input-field-container">
            <input
              type="password"
              id="password"
              name="password"
              required
              className="form-control account-input-field"
            />
          </div>
        </div>
        <div className="form-group row m-4 justify-content-center">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
        <div id="passwordHelpBlock" className="form-text">
          New to React App?
          <button
            type="button"
            onClick={() => changePage("ACCOUNT CREATION")}
            className="link-button m-1"
          >
            Create Account
          </button>
        </div>
        <a href="#" className="row justify-content-center mt-2">
          Forgot Password
        </a>
      </form>
    </div>
  );
}

export default LoginPage;
