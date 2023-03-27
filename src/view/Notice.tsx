import React, { useEffect, useState, useRef } from "react";
import { getNoticeList } from "../API";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { stateType } from "../store/reducer";
import { dateFormat } from "../utils/tool";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/style/Invitation.scss";
import "../assets/style/componentsStyle/MyDealRecord.scss";
import "../assets/style/componentsStyle/Reward.scss";
import NoData from "../components/NoData";
import { useViewport } from "../components/viewportContext";
import closeIcon from '../assets/image/closeIcon.png'

export default function Invitation() {
  let location = useLocation();
  let navigate = useNavigate()
  //   console.log(location.state);
  let { t } = useTranslation();
  const { width } = useViewport()
  let state = useSelector<stateType, stateType>((state) => state);
  const [ShowMoreDetail, setShowMoreDetail] = useState<any>()
  const [noticeList, setNoticeList] = useState<any>([])

  useEffect(() => {
    getNoticeList().then((res: any) => {
      if (res.code === 200) {
        console.log(res.data, "公告");
        setNoticeList(res.data)
      }
    })
  }, [state.token])


  return (
    <div className="Edition-Center" id="Notice">
      <div className="SwapTitle">公告中心</div>
      <div className="smallTitle">
        最新公告
      </div>
      <div className="content">
        {noticeList.length > 0 ? <>
          <div className="items">
            {noticeList.map((item: any, index: any) => <div key={index} className="item" onClick={() => { setShowMoreDetail(item) }}> {item.title} <span> {dateFormat('YYYY-mm-dd', new Date(item.createTime))}</span></div>)}
          </div>
          {/* <div className="items">
            {noticeList.map((item: any, index: any) => <div key={index} className={index % 2 === 0 ? "itemDisplay" : "item"} onClick={() => { setShowMoreDetail(item) }}> {item.title} <span> {dateFormat('YYYY-mm-dd', new Date(item.createTime))}</span></div>)
            }
          </div > */}
        </> : <NoData></NoData>}
      </div >

      <Modal
        visible={!!ShowMoreDetail}
        className='NoticeModal'
        centered
        width={'855px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowMoreDetail(null) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setShowMoreDetail(null)} />
        <div className="box">
          <div className="title">{ShowMoreDetail?.title}</div>
          <div className="time">{dateFormat('YYYY-mm-dd', new Date(ShowMoreDetail?.createTime))}</div>
          <div className="tip" dangerouslySetInnerHTML={{ __html: ShowMoreDetail?.content }}>

          </div>
        </div>
      </Modal>

    </div >
  );
}
