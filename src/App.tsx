import React from 'react';
import logo from './logo.svg';
import './App.css';
import Categories from './Components/categories';
import Navbar from './Components/navbar';
import Listings from './Components/listings';

function App() {
  return (
    <div className="container-fluid">
     <Navbar />
     <Categories />
      <div className="row listingsContainerHeight">
        <Listings />
      </div>
    </div>
  );
}

export default App;
