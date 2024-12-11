import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


import Calc1 from './comp/calc/study01'

import Inp1 from './comp/inp/input01'
import Out1 from './comp/inp/output01'

import Log1 from './comp/login/login01'
import Myp1 from './comp/login/mypage01'
import Join1 from './comp/login/Join'
import Login1 from './comp/login/Login'

import Ax1 from './comp/ax/ax01'


import Ref from './comp/inp/Ref01'

import ProItemlist from './comp/login/ItemList'


import Red1 from './comp/red/Red01'





import BoardList1 from './comp/board1/boardlist'
import BoardWrite1 from './comp/board1/boardwrite'
import BoardDetali1 from './comp/board1/boarddetail'
import BoardUpdate1 from './comp/board1/boardupdate'

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



          <Route path={"/log1"} element={<Log1 />} />
          <Route path={"/myp1"} element={<Myp1 />} />
          <Route path={"/join"} element={<Join1 />} />
          <Route path={"/login"} element={<Login1 />} />
          <Route path={"/itemlist"} element={<ProItemlist />} />



          <Route path={"/ax1"} element={<Ax1 />} />


          <Route path={"/ref"} element={<Ref />} />



          <Route path={"/red01"} element={<Red1 />} />






          <Route path={"/boardlist1"} element={<BoardList1 />} />
          <Route path={"/boardwrite1"} element={<BoardWrite1 />} />
          <Route path={"/boardupdate1"} element={<BoardUpdate1 />} />
          <Route path="/boarddetail1/:boardId" element={<BoardDetali1 />} />

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

      <h1>회원가입</h1>
      <Link to="/log1">로그인</Link>
      <h2>1204.ver2</h2>
      <Link to="/join">회원가입</Link>
      <h2>1205.ver2</h2>
      <Link to="/login">Login</Link>

      <h1>Axios</h1>
      <Link to="/ax1">Axios</Link>

      <h1>Ref사용하기</h1>
      <Link to="/ref">Ref</Link>


      <h1>ItemList</h1>
      <Link to="/itemlist">itemlist</Link>


      <h1>boardlsit과제</h1>
      <Link to="/boardlist1">BoardList1</Link>
      <br></br>
      <Link to="/boardwrite1">BoardWrite1</Link>
      <br></br>
      <Link to="/boarddetail1">BoardDetali1</Link>
      <br></br>
      <Link to="/boardupdate1">BoardUpdate1</Link>

      
      <h1>Reducer</h1>
      <Link to="/red01">red01</Link>
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
