import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


import Calc1 from './comp/calc/study01'

import Inp1 from './comp/inp/input01'
import Out1 from './comp/inp/output01'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <About />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/cal1"} element={<Calc1 />} />

          <Route path={"/inp1"} element={<Inp1 />} />
          <Route path={"/oup1"} element={<Out1 />} />

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
      <br></br>
      <Link to="/cal1">cal1으로 이동</Link>
      <h1>데이터 옮기기</h1>

      <Link to="/inp1">데이터 입력</Link>
      <br></br>
      <Link to="/oup1">데이터 출력</Link>

    </div>
  );
}

function About(){
  return(
    <div style={
      {
        border : '2px black solid'
      }
    }>
      <Link to="/">Home으로 이동</Link>
    </div>
  );
}
export default App;
