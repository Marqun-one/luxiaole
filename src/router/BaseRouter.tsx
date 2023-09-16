import CountView from "../views/content/acount/CountView";
import InfoView from "../views/content/InfoView";
import NoteView from "../views/content/NoteView";
const baseRouter = [
    {path:'/content/info', element:<InfoView/>},
    {path:'/content/note', element:<NoteView/>},
    {path:'/content/count', element:<CountView/>,
       children:[]
    }
]
export default baseRouter