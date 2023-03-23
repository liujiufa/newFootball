import React from 'react'
import noDataImg from '../assets/image/nodata.png'

export default function NoData() {
  return (
    <div className="NoData flexCenter">
      <div className="box">
        <img src={noDataImg} alt="" />
        <div className='title'>没有数据</div>
      </div>
    </div>
  )
}
