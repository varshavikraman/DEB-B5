import React from 'react'
import Logos from '../component/Logos'
import IncrementButton from '../component/IncrementButton'

const HomePage = () => {
  return (
    <>
        <Logos/>
        <IncrementButton startNo={1} incrementNo={100}/>
        <IncrementButton startNo={10} incrementNo={1}/>
        <IncrementButton startNo={100} incrementNo={10}/>
    </>
  )
}

export default HomePage