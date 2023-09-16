
import React from 'react'
import { connect } from 'react-redux'
function CountNum(props:any) {
  return (
    <div>{props.count}</div>
  )
}
const mapStateToProps = (state:any) => {
  return state
}
export default connect(mapStateToProps)(CountNum)