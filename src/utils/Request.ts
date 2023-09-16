// import axios from 'axios';
// import { message } from 'antd';
// 添加加载提示
import Nprogress from 'nprogress';
export default Nprogress;
Nprogress.settings.showSpinner = false;
// export const request = axios.create({
//     baseURL: '/app',
//     timeout:5000
// });

// request.interceptors.request.use(config => {
//     let token = sessionStorage.getItem('token');
//     Nprogress.start();
//     if(token) {
//         config.headers['Authorization'] = "Bearer" + token;
//     }
//     return config;
// });

// request.interceptors.response.use(
//     res=> {
//         const status = res.status;
//         Nprogress.done();
//         if(res.status ===200) {
//             return res;
//         }
//         // 没有请求成功
//         if(status === 401) {
//             // 没有权限
//             message.info("没有权限")
//         } else if (status === 500 || status === 505) {
//             message.info("服务器错误")
//         } else {
//             message.info("错误" + status)
//         }
//         return res;
//     },
//     err=>{
//         Nprogress.done();
//         message.info("请求错误");
//         console.error(err);
//         return err;
//     }
// )