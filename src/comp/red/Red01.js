import { useState } from "react"

export default function Red01() {

    const [data, setdata] = useState(0)

    return (
        <div>
            <h1>Reducer 01</h1>
            {data}
            <input type="button" value='증가'
                onClick={
                    e => {
                        setdata(data + 1)
                    }
                } />
            <input type="button" value='감소'
                onClick={
                    e => {
                        setdata(data - 1)
                    }
                } />
        </div>
    )
}