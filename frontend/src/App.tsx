import React from "react";
import "./Styles/App.css";
import Categories from "./Components/categories";
import Navbar from "./Components/navbar";
import ListingContainer from "./Components/listingContainer";
import Footer from "./Components/footer";
import ListingPageSwitcher from "./Components/listingPageSwitcher";
import { ListingContextProvider } from "./Context/listingContext";
import Filters from "./Components/filter";
import Sort from "./Components/sort";

function App() {
  return (
    <div className="container-fluid">
      <ListingContextProvider>
        <Navbar />
        <Categories />
        <Sort />
        <div className="row listingsContainer bg-light">
          <Filters />
          <ListingContainer />
        </div>
        <ListingPageSwitcher />
        <Footer />
      </ListingContextProvider>
    </div>
  );
}

export default App;
