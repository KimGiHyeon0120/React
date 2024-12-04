import { useEffect, useState } from 'react';
import { memberIdCheck, areaList, memberLoginCheck } from '../api/member'
import { useNavigate } from 'react-router-dom';

function Study() {

    const [아이디, 변경아이디] = useState('');
    const [areas, setAreas] = useState([]);

    const [로그인, 변경로그인] = useState('');
    const [비밀번호, 변경비밀번호] = useState('');
    //화면이 처음 출력 되었을 때, list에 어떻게 표현 시킬 것인가?


    const navigate = useNavigate();

    function send() {
        navigate('/');

    }





    useEffect(() => {
        startList();
    }, []); // 페이지가 처음으로 불러오는 현상 ( 마운트 ) 이 때만 동작 되게 해달라!

    function startList() {
        console.log('=== startList');
        areaList()
            .then(res => {
                console.log(res);
                setAreas(res.data.data);
            })
    }









    return (
        <div className="App">


            <h1>회원 중복체크</h1>
            <input
                type='text'
                placeholder='아이디 입력'
                value={아이디}
                onChange={e => {
                    변경아이디(e.target.value);
                }}
            />
            <input type='button' value='중복 체크' onClick={
                () => {
                    let obj = new Object();
                    obj.id = 아이디;

                    const check = memberIdCheck(obj);

                    //성공!
                    check.then(res => {
                        console.log(res.data.data)
                        console.log('===== 성공!!!');
                        console.log(res);
                    })

                    //실패
                    check.catch(err => {
                        console.log(err);
                    })
                }
            } />










<h1>지역정보리스트</h1>

            <select>
                {areas.map((item, index) => (
                    <option key={index} value={item.idx}>
                        {item.areaName}
                    </option>
                ))}
            </select>










            <h1>로그인 과제</h1>
            <input
                type='text'
                placeholder='아이디 입력'
                value={로그인}
                onChange={e => {
                    변경로그인(e.target.value);
                }}
            />
            <input
                type='text'
                placeholder='비밀번호입력'
                value={비밀번호}
                onChange={e => {
                    변경비밀번호(e.target.value);
                }}
            />
            <br></br>
            <input type='button' value='로그인' onClick={
                () => {
                    let obj = new Object();
                    obj.userId = 로그인;
                    obj.userPw = 비밀번호;

                    const check = memberLoginCheck(obj);
                    //성공!
                    check.then(res => {
                        
                        if(res.data.data === 'Y'){
                            console.log('로그인 성공');
                            send();
                        }
                        else{
                            alert('로그인 실패');
                        }
                    })

                    //실패
                    check.catch(err => {
                        console.log(err);
                    })
                }
            } />

        </div>
    );
}

export default Study;