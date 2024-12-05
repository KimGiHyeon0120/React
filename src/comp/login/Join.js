import { useEffect, useState } from 'react';
import { memberIdCheck, areaList, memberLoginCheck } from '../api/member'
import { useNavigate } from 'react-router-dom';

function Study() {

    const [아이디, 변경아이디] = useState('');              //아이디
    const [password, setPassword] = useState('');         //password
    const [birth, setBirth] = useState('');              //생년월일
    const [name, setname] = useState('');               //이름
    const [email, setEmail] = useState('');                 //이메일
    const [gender, setgender] = useState('M');              //성별
    const [area, setArea] = useState([]);                 //지역




    const [areas, setAreas] = useState([]);                 //지역정보

    const [로그인, 변경로그인] = useState('');
    const [비번, 변경비번] = useState('');
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
                setArea(res.data.data[0].Idx)
            })
    }





    function joinAction() {

        const obj = {
            'userId': 아이디,
            'userPw': password,
            'userName': name,
            'email': email,
            'birth': birth,
            'gender': gender,
            "areaIdx": area
        }
        console.log(obj)

    }







    return (
        <div className="App">


            <h1>아이디</h1>
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

            <br></br>


            <input
                type='text'
                placeholder='비밀번호입력'
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                }}
            /><br></br>

            <input type='text'
                placeholder='이름을 입력해주세요'
                value={name}
                onChange={e => {
                    setname(e.target.value)
                }}
            /><br></br>

            <input type='text'
                placeholder='email을 입력해주세요'
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                }}
            /><br></br>


            생년월일 <input type='date'
                value={birth}
                onChange={e => setBirth(e.target.value)} /><br></br>


            <input type='radio'
                name='gender'
                value='M'
                onChange={e => {
                    setgender(e.target.value)
                }}
                checked />남자

            <input type='radio'
                name='gender'
                value='F'
                onChange={e => {
                    setgender(e.target.value)
                }} />여자



<br></br>
            지역정보리스트
            <select onChange={e => { setArea(e.target.value) }}>
                {areas.map((item, index) => (
                    <option key={index} value={item.idx}>
                        {item.areaName}
                    </option>
                ))}
            </select>



            <input type='button' value='회원가입' onClick={joinAction()} />












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
                value={비번}
                onChange={e => {
                    변경비번(e.target.value);
                }}
            />
            <br></br>
            <input type='button' value='로그인' onClick={
                () => {
                    let obj = new Object();
                    obj.userId = 로그인;
                    obj.userPw = 비번;

                    const check = memberLoginCheck(obj);
                    //성공!
                    check.then(res => {

                        if (res.data.data === 'Y') {
                            alert('로그인 성공');
                            send();
                        }
                        else {
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