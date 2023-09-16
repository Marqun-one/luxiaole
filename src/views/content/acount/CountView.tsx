import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import RecordView from './RecordView'
import ReviewAcountView from './ReviewAcountView'

const CountView: React.FC = () => {
    const navegate = useNavigate();
   const  handleA = () => {
        navegate('/content/count/record');
    }
    const  handleB = () => {
        navegate('/content/count/review');
    }

    return (<>

        <button onClick={handleA}>a</button>
        <button onClick={handleB}>b</button>
        <Routes>
            <Route path='/content/count/record' element={<RecordView />} />
            <Route path='/content/count/review' element={<ReviewAcountView />} />
            <Route path='/' element={<RecordView />} />
        </Routes>
    </>
    )
}

export default CountView
