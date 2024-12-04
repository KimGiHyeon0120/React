import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function InputStudy() {

    const [id, setId] = useState('');
    const [paw, setPaw] = useState('');
    const [ema, setEma] = useState('');
    const [area, setArea] = useState('');
    const [sel, setSel] = useState('2000');
    const [hobby, setHobby] = useState([]);

    const navigate = useNavigate();








    const hobbyList = [
        {
            name: '축구'
        },
        {
            name: '농구'
        }, {
            name: '야구'
        }
    ]





    function changeArea(e) {
        setArea(e.target.value)
        console.log('성별 : ', area)

    }






    function handleHobby(e) {
        if (hobby.includes(e.target.value)) {
            setHobby(
                hobby.filter(item => item !== e.target.value)
            )
        }
        else {
            setHobby([...hobby, e.target.value]);
        }
    }






    function send() {

        localStorage.setItem('id', id);
        localStorage.setItem('pwa', paw);
        localStorage.setItem('email', ema);
        localStorage.setItem('area', area);
        localStorage.setItem('sel', sel);
        localStorage.setItem('hobby', hobby);
        navigate('/myp1');

    }




    return (
        <div>
            <h1>회원가입</h1>
            <input
                type='text'
                value={id}
                placeholder="아이디"
                onChange={e => setId(e.target.value)} />
            <input
                type='text'
                value={paw}
                placeholder="비밀번호"
                onChange={e => setPaw(e.target.value)} />
            <input
                type='text'
                value={ema}
                placeholder="이메일"
                onChange={e => setEma(e.target.value)} />









            <h4>성별</h4>
            <input type='radio' name='area' value='남' onChange={
                e => changeArea(e)
            } />남
            <input type='radio' name='area' value='여' onChange={
                e => changeArea(e)
            } />여




            <h4>출생년도</h4>
            <select onChange={
                e => { setSel(e.target.value) }
            }>
                <option value='2000'>2000</option>
                <option value='2001'>2001</option>
                <option value='2002'>2002</option>
                <option value='2003'>2003</option>
                <option value='2004'>2004</option>
                <option value='2005'>2005</option>
                <option value='2006'>2006</option>
            </select>



            <h4>취미</h4>

            {hobbyList.map((item, index) => (
                <div key={index}>
                    <input
                        type='checkbox'
                        value={item.name}
                        checked={hobby.includes(item.name)}
                        onChange={handleHobby}
                    />{item.name}
                </div>
            ))
            }


            <br></br>


            <input type='button'
                value='전송'
                onClick={send} />
        </div>
    )
}