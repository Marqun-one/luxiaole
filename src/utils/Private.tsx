import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import React, { ReactNode} from 'react'

interface IProps {
    children?: ReactNode
}
const Private: React.FC<IProps> = (props)=> {
    const token = sessionStorage.getItem('token');
    const location = useLocation();
    if (token) {
        return <>{props.children}</>
    } else {
        // 跳转首页,添加redirce查询参数
        return <Navigate to={'/?redircect=' + location.pathname}></Navigate>
    }
}
export default Private;