import React, { useState, Component } from 'react'
import { Button, Form, Input } from 'antd';
// import { useDispatch } from 'react-redux'
// import type { Dispatch } from 'redux';
import {login} from '../api/Auth';





// export default function LogginView(props:any) {
//     // const dispatch: Dispatch<any> = useDispatch() ;
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     // 验证成功
//     const onFinish = (values: any) => {
//         // 执行dispatch的动作
//         // dispatch(login({name, password}))
//         console.log(values)
//         login();
//     };

//     // 验证失败
//     const onFinishFailed = (errorInfo: any) => {
//         console.log('Failed:', errorInfo);
//     };
//     return (
//         <div className='loginBox'>
//             <h2><span className='primary'>快团团</span>登录</h2>
//             <Form
//                 name="basic"
//                 style={{ maxWidth: 600 }}
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 autoComplete="off"
//             >
//                 <Form.Item
//                     name="username"
//                     rules={[{ required: true, message: 'Please input your username!' }]}
//                 >
//                     <Input placeholder='用户名:' value={name} onChange={(e) => setName(e.target.value)} />
//                 </Form.Item>

//                 <Form.Item
//                     name="password"
//                     rules={[{ required: true, message: 'Please input your password!' }]}
//                 >
//                     <Input.Password placeholder='密码:' value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </Form.Item>

//                 <Form.Item>
//                     <Button type="primary" htmlType="submit" block>
//                         登录
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     )
// }



export default class LogginView extends Component {

    // 验证成功
    onFinish = (values: any) => {
        // 执行dispatch的动作
        // dispatch(login({name, password}))
        login();
    };

    // 验证失败
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };




  render() {

    return (
        <div className='loginBox'>
            <h2><span className='primary'>快团团</span>登录</h2>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='用户名:'  onChange={(e) => console.log(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder='密码:'  onChange={(e) => console.log(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
  }
}

