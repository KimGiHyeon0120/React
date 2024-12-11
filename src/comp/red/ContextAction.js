import { useContext, useEffect, useState } from "react"
import { ContextAPI } from "../../context/ContextAPi"

export default function  ContetxtAction() {

    const { parent , setParent } = useContext(ContextAPI);

    const [inp, setInp] = useState(0);

    useEffect(() => {
        setParent(5);
    }, [])

    return (
        <div>
            <h1>Context </h1>
            <input type="text" onChange={
                e=> setInp(e.target.value)
            }></input>
            <input type="button" value="전달" 
                onClick={e => {
                    setParent(inp);
                }}
            />
            {inp} / par: {parent}
        </div>
    )
}