import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OutStudy() {

    const [id, setId] = useState('');
    const [paw, setPaw] = useState('');
    const [ema, setEma] = useState('');
    const [area, setArea] = useState('');
    const [sel, setSel] = useState('2000');
    const [hobby, setHobby] = useState([]);

    const navigate = useNavigate();

    function start() {
        const data1 = localStorage.getItem('id');
        const data2 = localStorage.getItem('pwa');
        const data3 = localStorage.getItem('email');
        const data4 = localStorage.getItem('area');
        const data5 = localStorage.getItem('sel');
        const data6 = localStorage.getItem('hobby');
        if(data1 !== '' && data1 !== 'null' && data2 !== '' && data2 !== 'null'&& data3 !== '' && data3 !== 'null'
            && data4 !== '' && data4 !== 'null'&& data5 !== '' && data5 !== 'null'&& data6 !== '' && data6 !== 'null'
        ) {
            setId(data1);
            setPaw(data2);
            setEma(data3);
            setArea(data4);
            setSel(data5);
            setHobby(data6);
        }
    }
    
    function back(){
        navigate('/log1');
    }


    //처음 화면이 마운트 되었을 때 ( java 이벤트 헨들러: onLoad하고 비슷하다. )
    useEffect(() => {
        start();
    }, [])

    return (
        <div>
            <h1>내 정보</h1>
            id : {id}<br></br><br></br>
            password : {paw}<br></br><br></br>
            email : {ema}<br></br><br></br>
            성별 : {area}<br></br><br></br>
            출생년도 : {sel}<br></br><br></br>
            취미 : {hobby}<br></br><br></br>


            <input type='button'
                value='뒤로가기'
                onClick={back} />
        </div>
    )
}