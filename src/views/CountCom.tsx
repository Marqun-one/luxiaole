import React from 'react'
import { connect } from 'react-redux'
import { addAction, reduceAction, addActionSync } from '../store/auth/Action'
import { Dispatch } from 'redux'
import { login } from '../api/Auth'
import axios from 'axios'

function CountCom(props: any) {
  const addTen = () => {
    props.sendAdd(10)
  }
  const reduceTwo = () => {
    props.sendReduce(2)
  }
  return (
    <div>
      <button onClick={addTen}> +10 </button>
      <button onClick={reduceTwo}> -2 </button>
    </div>
  );
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    // dispatch 一个 addAction
    sendAdd: (num: number) => {
      const action = (dispatch: Dispatch) => {
        axios.get('http://localhost:4001/api/login/').then(res => {
          const number = res.data.data;
          dispatch(addAction(number));
        });
        // return addAction(num);
      };
      dispatch(action)
    },
    // dispatch 一个 reduceAction
    sendReduce: (num: number) => {
      dispatch(reduceAction(num))
    }
  }
}
export default connect(null, mapDispatchToProps)(CountCom);