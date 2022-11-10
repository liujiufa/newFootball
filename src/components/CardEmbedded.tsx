import React from 'react'
import "../assets/style/componentsStyle/CardEmbedded.scss"
interface propsType{
  tokenIcon:string,
  title:string,
  tokenA:string,
  tokenB:string,
  multiple:number,
  children:React.ReactNode
}
function  Card(props:propsType) {

  return (
    <div className="m-card">
      <div className='card-header'>
        <div className='user-img'>
          <span style={{background: "url('"+props.tokenA+"')",backgroundSize:'100% 100%'}}></span>
          <span style={{background: "url('"+props.tokenB+"')",backgroundSize:'100% 100%'}}></span>
        </div>
        <div className='user-desc'>
          <p>
            {props.title}
          </p>
          <p>X{props.multiple}</p>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Card
