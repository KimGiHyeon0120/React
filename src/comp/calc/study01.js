import { useState } from "react"

export default function Study() {

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [op, setOp] = useState('1');

    const result = () => {
        switch (op) {
            case '1':
                return Number(num1) + Number(num2);
            case '2':
                return Number(num1) - Number(num2);
            case '3':
                return Number(num1) * Number(num2);
            case '4':
                return Number(num1) / Number(num2);
        }
    }


    return (
        <div>
            <h1>계산기 status</h1>
            <input type='text' placeholder="첫 번째 수" value={num1}
                onChange={e => { setNum1(e.target.value) }} />

            <select onChange={
                e => {
                    setOp(e.target.value)
                }
            }>
                <option value='1'>+</option>
                <option value='2'>-</option>
                <option value='3'>*</option>
                <option value='4'>/</option>
            </select>

            <input type='text' placeholder="두 번째 수" value={num2}
                onChange={e => { setNum2(e.target.value) }} />

            <h2>결과 : {result()} </h2>
        </div>
    )

}