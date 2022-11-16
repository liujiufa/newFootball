import './App.scss';
import { useEffect } from 'react';
import './lang/i18n'
import { useWeb3React } from '@web3-react/core'
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import Routers from './router'
import { GetQueryString } from './utils/tool'
// import web3 from 'web3';
import { stateType } from './store/reducer'
import { createAddMessageAction, createLoginSuccessAction, createDelMessageAction } from './store/actions'
import { Login } from './API'
import { useConnectWallet } from './web3'
import Loding from './components/loding'
import ViewportProvider from './components/viewportContext'
// import { useNavigate } from "react-router-dom";
// import Home from './view/Home';
import prohibit from './assets/image/prohibit.png'
import cloneIcon from './assets/image/cloneIcon.png'
import { t } from 'i18next';

const Message = styled.span`
  color: #fff;
  text-align: center;
  background:#DB2DCF;
  padding: 5px 12px;
  border-radius: 5px;
`
const MessageRow = styled.div`
  height: 50px;
`
const MessageBox = styled.div`
  position:fixed;
  z-index: 9999;
  top: 90PX;
  right: 40px;
  @media screen and (max-width:967px) {
    right: 0 !important;
  }
  
`
// function GetQueryString(name:string): string | null{
//   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//   var r = window.location.search.substr(1).match(reg);
//   if(r!=null){ return  unescape(r[2]); }else{ return null; }
// }
function App() {
  const web3React = useWeb3React()
  // const navigate = useNavigate();
  useEffect(() => {
    if (web3React.active) {
      LoginFun()
    } else {
      // dispatch(createLoginSuccessAction('',''))
    }
  }, [web3React.account])
  const dispatch = useDispatch();
  let state = useSelector<stateType, stateType>(state => state);
  // useEffect(()=>{
  //   let address = GetQueryString('address')
  //   if(address!=null){
  //     window.localStorage.setItem('address', address);
  //   }
  // },[])
  useConnectWallet()
  function addMessage(msg: string) {
    dispatch(createAddMessageAction({
      message: msg,
      index: state.message.length
    }))
  }
  // function addMessage (msg:string){
  //   // dispatch(createAddMessageAction('添加提醒'))
  // }
  function LoginFun() {
    let refereeUserAddress = GetQueryString("address") || ''
    Login({
      password: "123",
      refereeUserAddress,
      // userAddress: web3React.account as string,
      userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58',
      userPower: 0
    }).then((res: any) => {
      console.log(res, '登陆')
      if (res.code !== 200) {
        addMessage(res.msg)
      }
      dispatch(createLoginSuccessAction(res.data.token, web3React.account as string))
    })
  }
  return (
    <ViewportProvider>
      <div className="App">
        <MessageBox>
          {
            state.message.map((item, index) =>
              <div className="messageItem" key={index}>
                <div className="messageLebel">
                  <img src={prohibit} alt="" />
                </div>
                <div className="messageConter">
                  <div className="title">{t('Info')}</div>
                  <div className="content">
                    {item.message}
                  </div>
                  <img className="clone" onClick={() => { dispatch(createDelMessageAction(item.index)) }} src={cloneIcon} alt="" />
                </div>
              </div>
            )
          }
        </MessageBox>
        <Routers></Routers>
        {state.showLoding && <Loding></Loding>}
      </div>
    </ViewportProvider>
  );
}

export default App;
