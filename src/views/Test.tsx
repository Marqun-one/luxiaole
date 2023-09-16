
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = memo(() => {
  const navigate=useNavigate()
 const  goDetail = () => {
    navigate('/Detail?name=tom&age=18')
  }
  const goAbout = () => {
    navigate('/About/jack')
  }
  const goshop = () => {
    navigate('/Detail/Shop', { state: {name:'tom',age:"20"} })
  }
  return (
    <div>
      <button onClick={goDetail}>点我去Detail页面并且传递search参数</button>
      <button onClick={goAbout}>点我去About页面并且传递params参数</button>
      <button onClick={goshop}>点我去shop页面并且传递state参数</button>
    </div>
  )
})
 