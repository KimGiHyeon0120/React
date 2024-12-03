import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Home(){
  return(
    <div>
      <h1>Home</h1>
      <Link to="/about">about으로 이동</Link>
    </div>
  );
}

function About(){
  return(
    <div>
      <h1>About 입니다</h1>
      <Link to="/">Home으로 이동</Link>
    </div>
  );
}
export default App;
