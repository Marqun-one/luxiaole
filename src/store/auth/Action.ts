import { login as loginApi } from "../../api/Auth";
import { SET_TOKEN, UserType } from "../../type/Types";
import {Dispatch} from 'redux'
import { login as login1 } from '../../api/Auth'

function login(data: UserType) {
    // return (dispatch: Dispatch) => {
    //     loginApi()
    //         .then((res: any) => {
    //             if (res.data.code === 200) {
    //                 sessionStorage.setItem('token', res)
    //                 sessionStorage.setItem('userInfo', JSON.stringify(res.data.user))
    //                 dispatch({ type: SET_TOKEN, payload: res.data.token })
    //                 dispatch({ type: SET_USER, payload: res.data.user })
    //             }
    //         })
    // }
}

export const addAction = (num:number)=> {
  console.log('====1')
    return {
      type: 'ADD_NUM',
      payload: {
        num
      }
    }
  }

  export const addActionSync = ()=> {
    return (dispatch: Dispatch) => {
          const num = login1()
          return addAction(num);
    }
  }
  
  export const reduceAction=(num:number)=> {
    return {
      type: 'REDUCE_NUM',
      payload: {
        num
      }
    }
  }
export default login;