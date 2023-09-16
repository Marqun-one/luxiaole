import React, { Component } from 'react'
import { Image } from 'antd';
import img  from '../../static/img/leigu.jpg'

export default class InfoView extends Component {
  render() {
    return (
      <div>
        <Image
          width={600}
          src={img}
        />
      </div>
    )
  }
}
