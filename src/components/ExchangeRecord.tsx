// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ExchangeRecord.scss'
function ExchangeRecord(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='ExchangeRecord'
                centered
                width={'525px'}
                closable={false}
                footer={null}
            >
                <p className='title'>兌換記錄</p>

                <div className="titleBox">
                    <div className="itemTitle">時間</div>
                    <div className="itemTitle itemSBL">SBL的消耗</div>
                    <div className="itemTitle itemSBLGet">MBA獲得</div>
                </div>

                <div className="valueBox">
                    <div className="itemValue">2022-01-07 </div>
                    <div className="itemValue itemSBL">200</div>
                    <div className="itemValue itemSBLGet">200</div>
                </div>
                <span>點擊任意地方關閉</span>
            </Modal>
        </>
    )
}
export default ExchangeRecord
