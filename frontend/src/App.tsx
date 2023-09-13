import React from "react";
import "./Styles/App.css";
import HeaderCategories from "./Components/HeaderCategories";
import Navbar from "./Components/Navbar";
import ListingContainer from "./Components/ListingContainer";
import Footer from "./Components/Footer";
import ListingPageSwitcher from "./Components/ListingPageSwitcher";
import { ListingContextProvider } from "./Context/ListingContext";
import ListingContainerHeader from "./Components/ListingContainerHeader";
import FeaturedCard from "./Components/FeaturedCard";
import ListingContainerFilters from "./Components/LIstingContainerFilters";
import { AppContextProvider } from "./Context/AppContext";

function App() {
  return (
    <div className="container-fluid bg-light">
      <ListingContextProvider>
        <AppContextProvider>
          <Navbar />
          <HeaderCategories />
          <div className="row listingsContainer bg-light p-10 m-2">
            <FeaturedCard />
            <ListingContainerHeader />
            <ListingContainer />
          </div>
          <Footer />
        </AppContextProvider>
      </ListingContextProvider>
    </div>
  );
}

export default App;
