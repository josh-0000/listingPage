import React from 'react';
import logo from './logo.svg';
import './App.css';
import Categories from './Components/categories';
import Navbar from './Components/navbar';
import Listings from './Components/listings';

function App() {
  return (
    <div className="container border">
     <Navbar />
      <div className="row border">
        <Categories />
        <Listings />
      </div>
    </div>
  );
}

export default App;
