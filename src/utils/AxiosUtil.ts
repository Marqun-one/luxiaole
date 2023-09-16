import axios, { AxiosResponse } from 'axios'
import { port, url } from '../common/publicConfig/Public';
axios.defaults.timeout = 5000;
// 允许跨域
axios.defaults.withCredentials = false;
// Content-Type 响应头
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export function login(): any {
  let num = 110;
  // 返回结果
  axios.get('http://localhost:4001/api/login/').then(res => {
    // const obj = JSON.parse(res.data);
    console.log('res.data.data');
    console.log(res.data.data);
    num = res.data.data;
  });
  return num;
}

const combineUrl = (uri: string, params: any | undefined): string => {
  let path = url + ':' + port + uri;
  if (params === undefined) {
    return path;
  }
  path += '?';
  path += "params=" + JSON.stringify(params);
  return path;
}

// 端口号后面的uri,传入 /login 则向localhost:4001/login发送请求
export function sendGetRequest(uri: string, params?: object): Promise<AxiosResponse>;
export function sendGetRequest(uri: string, params?: object): Promise<AxiosResponse> {
  const resUrl = combineUrl(uri, params);
  return axios.get(resUrl);
}


// 端口号后面的uri,传入 /login 则向localhost:4001/login发送请求
export const sendPostRequest = (uri: string, data: any): Promise<AxiosResponse> => {
  const resUrl = combineUrl(uri, []);
  return axios.post(resUrl, data);
}