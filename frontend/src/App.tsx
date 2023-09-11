import React from "react";
import "./Styles/App.css";
import Categories from "./Components/categories";
import Navbar from "./Components/navbar";
import ListingContainer from "./Components/listingContainer";
import Footer from "./Components/footer";
import ListingPageSwitcher from "./Components/listingPageSwitcher";
import { ListingContextProvider } from "./Context/listingContext";
import ListingContainerHeader from "./Components/listingContainerHeader";
import Featured from "./Components/featured";

function App() {
  return (
    <div className="container-fluid">
      <ListingContextProvider>
        <Navbar />
        <Categories />
        <div className="row listingsContainer bg-light">
          <Featured />
          <ListingContainerHeader />
          <ListingContainer />
        </div>
        <ListingPageSwitcher />
        <Footer />
      </ListingContextProvider>
    </div>
  );
}

export default App;
