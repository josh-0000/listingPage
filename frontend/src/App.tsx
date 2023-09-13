import React from "react";
import "./App.css";
import Categories from "./Components/categories";
import Navbar from "./Components/navbar";
import ListingContainer from "./Components/listingContainer";
import Footer from "./Components/footer";
import ListingPageSwitcher from "./Components/listingPageSwitcher";
import { ListingContextProvider } from "./Context/listingContext";
import LoginPage from "./Components/loginPage";
import AccountCreationPage from "./Components/accountCreationPage";
function App() {
  return (
    <div className="container-fluid">
      <ListingContextProvider>
        <Navbar />
        <AccountCreationPage />
      </ListingContextProvider>
    </div>
  );
}

export default App;
