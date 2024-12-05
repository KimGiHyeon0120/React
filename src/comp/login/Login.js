import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { memberLogin } from '../api/member'

export default function Study() {

    const navigate = useNavigate();

    const idRef = useRef('');
    const pwRef = useRef('');


    useEffect(()=> {
        localStorage.removeItem('userId')
    }, [])
    const loginAction = () => {

        const idValue = idRef.current.value;
        const pwValue = pwRef.current.value;

        //데이터 포장
        let obj = new Object();
        obj.userId = idValue;
        obj.userPw = pwValue;

        memberLogin(obj)
        .then(res => {
            const data = res.data;
            if(data.code === '200' && data.data === 'Y') {
                //다음 페이지 이동!
                console.log('성공');
                localStorage.setItem('userId', idValue);
                localStorage.setItem('auto','random UUID JWT')
                navigate('/itemlist')
            }
            else {
                idRef.current.value = '';
                pwRef.current.value = '';
                idRef.current.focus();
                alert('아이디를 재 입력해주세요.');
            }
            
        })
    }

    return (
        <div>
            <h1>로그인</h1>
            <input
                type="text"
                placeholder="아이디 입력"
                ref={idRef} /><br/>
            <input
                type="password"
                placeholder="패스워드 입력"
                ref={pwRef} /><br/>

            <input type="button" value="회원가입" onClick={
                () => {
                    navigate('/join');
                }
            }/>
            <input type="button" value="로그인" onClick={loginAction} />

        </div>
    )
}