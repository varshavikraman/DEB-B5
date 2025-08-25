import React, {useState} from 'react'
import { useEffect } from 'react'


const IncrementButton = ({startNo, incrementNo=1}) => {
    const [count,setCount] = useState(startNo)
    const [heading,setHeading] = useState("Hello World")

    useEffect(()=>{
        console.log('UseEffect is called','Count is ',count);
        
    },[count])
  return (
    <button onClick={() => {setCount((count) => count + incrementNo)
        setHeading("New Heading")}
    }>
          count is {heading}
    </button>
  )
}

export default IncrementButton
