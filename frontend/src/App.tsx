import React, { useContext } from "react";
import "./Styles/App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ListingContextProvider } from "./Context/ListingContext";
import { UserContextProvider } from "./Context/UserContext";
import MainPage from "./Pages/MainPage";
import { ViewContext } from "./Context/ViewContext";
import LoginPage from "./Pages/LoginPage";
import AccountCreationPage from "./Pages/AccountCreationPage";

function App() {
  const { currentPage } = useContext(ViewContext);

  let content;
  switch (currentPage) {
    case "HOME":
      content = <MainPage />;
      break;
    case "LOGIN":
      content = <LoginPage />;
      break;
    case "ACCOUNT CREATION":
      content = <AccountCreationPage />;
      break;
  }

  return (
    <div className="container-fluid bg-light">
      <ListingContextProvider>
        <UserContextProvider>
          <Navbar />
          {content}
          <Footer />
        </UserContextProvider>
      </ListingContextProvider>
    </div>
  );
}

export default App;
