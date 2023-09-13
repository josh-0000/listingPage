import React, { useContext } from "react";
import { ViewContext } from "src/Context/ViewContext";

function AccountCreationPage(): JSX.Element {
  const { changePage } = useContext(ViewContext);
  return (
    <div className="container text-center account-information-container">
      <div className="row m-4 justify-content-center">
        <h1>Create Account</h1>
      </div>
      <form action="/login" method="POST">
        <div className="form-group row justify-content-center">
          <label htmlFor="email" className="row mt-2 justify-content-center">
            Email
          </label>
          <div className="row mt-2 account-input-field-container">
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
          <label htmlFor="username" className="row mt-2 justify-content-center">
            Username
          </label>
          <div className="row mt-2 mb-2 account-input-field-container">
            <input
              type="text"
              id="username"
              name="username"
              required
              className="form-control account-input-field"
            />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label htmlFor="password" className="row justify-content-center">
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
        <div className="form-group row justify-content-center">
          <label
            htmlFor="re-enter-password"
            className="row justify-content-center mt-2"
          >
            Re-Enter Password
          </label>
          <div className="row mt-2 account-input-field-container">
            <input
              type="password"
              id="re-enter-password"
              name="re-enter-password"
              required
              className="form-control account-input-field"
            />
          </div>
        </div>
        <div className="form-group row m-4 justify-content-center">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </div>
        <div id="passwordHelpBlock" className="form-text">
          Have an Account?
          <button
            type="button"
            onClick={() => changePage("LOGIN")}
            className="link-button m-1"
          >
            Sign In
          </button>
        </div>
        <a href="#" className="row justify-content-center mt-2">
          Help
        </a>
      </form>
    </div>
  );
}

export default AccountCreationPage;
