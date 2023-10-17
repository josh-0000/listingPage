import { useEffect, useState } from "react";
import { ToastHeader } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ReactDOM from "react-dom";

const Notification = (message: string) => {
  const toastWrapper = document.createElement("div");
  toastWrapper.className = "toast-container";
  document.body.appendChild(toastWrapper);

  const toastContent = (
    <Toast
      onClose={() => {
        ReactDOM.unmountComponentAtNode(toastWrapper);
        document.body.removeChild(toastWrapper);
      }}
      show={true}
      delay={5000}
      className="mb-2"
      autohide
    >
      <ToastHeader className="custom-toast-header">
        <strong>Notification</strong>
      </ToastHeader>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
  setTimeout(() => {
    ReactDOM.render(toastContent, toastWrapper);
  }, 500);
};

export default Notification;
