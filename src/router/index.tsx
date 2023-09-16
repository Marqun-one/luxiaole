import { Route, Routes } from 'react-router-dom'
import InfoView from '../views/content/InfoView'
import NoteView from '../views/content/NoteView'
import RecordView from '../views/content/acount/RecordView'
import ReviewAcountView from '../views/content/acount/ReviewAcountView'
import TimeOut from '../views/content/stillon/TimeOut'

// import AdminView from '../views/admin/AdminView';
// import LogginView from '../views/LogginView';
// function RouterView() {
//     const element = useRoutes(baseRouter)
//     return (<>{element}</>)
// }
function ContentRouterView() {
    return (<Routes>
        <Route path='content/info' element={<InfoView />} />
        <Route path='/content/count/record' element={<RecordView />} />
        <Route path='/content/count/review' element={<ReviewAcountView />} />
        <Route path='content/note' element={<NoteView />} />
        <Route path='/content/stillon/health' element={<TimeOut />} />
        <Route path='/content/stillon/sport' element={<TimeOut />} />
        <Route path='*' element={<NoteView />} />
    </Routes>)

}
export default ContentRouterView;