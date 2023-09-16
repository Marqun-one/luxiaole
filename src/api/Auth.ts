// import { LoginResponseType, UserType } from '../type/Types';
import { UserType } from '../type/Types';
// import {request} from '../utils/Request';
import axios from 'axios'
//登录api
// export function login(data: UserType): Promise<AxiosResponse<LoginResponseType>>{
// export function login(data: UserType): any{
//     // 返回结果
//      axios.get('/app/api/login')
//     .then(res => console.log(res));
// }

axios.defaults.timeout = 5000;
// 允许跨域
axios.defaults.withCredentials = false;
// Content-Type 响应头
axios.defaults.headers.post["Access-Control-Allow-Origin"] =
  "*";
// 基础url
// axios.defaults.baseURL = 后台接口地址;
// axios.defaults.baseURL = 线上生产环境地址;
export  function login(): any{
  let num = 110;
    // 返回结果
     axios.get('http://localhost:4001/api/login/').then(res =>{
      // const obj = JSON.parse(res.data);
        console.log('res.data.data');
        console.log(res.data.data);
        num = res.data.data;
      });
      return num;
}