// 1：使用记录2：兑换记录
import React, { useState, useEffect } from 'react'
import { Modal, Table } from 'antd';
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getExchangeRecord, getMbaUseRecord } from '../API/index'
import { dateFormat } from "../utils/tool";
import '../assets/style/componentsStyle/DonationRecord.scss'
import { useTranslation } from 'react-i18next';
const { Column } = Table;
function ExchangeRecord(props: any) {
    let { t } = useTranslation()
    const ojb: any = { '1': { title: t('Usage record'), time: t('Time'), item1: t('Badge ID'), item2: t('MBA cost') }, '2': { title: t('Convert record'), time: t('Time'), item1: t('SBL cost'), item2: t('MBA get') }, }
    let state = useSelector<stateType, stateType>(state => state);
    let [donationRecord, setDonationRecord] = useState([])

    useEffect(() => {

        if (state.token && props.showModal && props.id === 1) {
            getMbaUseRecord().then(res => {
                setDonationRecord(res.data)
                console.log(res.data, "使用记录")
            })
        }
        if (state.token && props.showModal && props.id === 2) {
            getExchangeRecord().then(res => {
                setDonationRecord(res.data)
                console.log(res.data, "兑换记录")
            })
        }
    }, [state.token, props.showModal, props.id])
    return (
        <>
            <Modal
                visible={props.showModal}
                className="ExchangeRecord"
                centered
                width={"525px"}
                closable={false}
                footer={null}
                onCancel={() => props.close()}
            >
                <p className="title"> {ojb[props.id]?.title} </p>
                <Table
                    dataSource={donationRecord}
                    pagination={false}
                    rowKey="id"
                    scroll={{ y: 260 }}
                >
                    <Column
                        title={ojb[props.id]?.time}
                        width={140}
                        render={(item) => (
                            <>
                                <div>{dateFormat('YYYY-mm-dd HH:MM', new Date(item.createTime))}</div>
                            </>
                        )}
                    />
                    <Column
                        title={ojb[props.id]?.item1}
                        render={(item) => (
                            <>
                                <div>{props.id === 1 ? item.cardNo : item.consumeAmount}</div>
                            </>
                        )}
                    />
                    <Column
                        title={ojb[props.id]?.item2}
                        width={140}
                        className='rewardBNB'
                        render={(item) => (
                            <>
                                <div>{props.id === 1 ? item.amount : item.earnAmount}</div>
                            </>
                        )}
                    />
                </Table>
                <span>{t("clickLeave")}</span>
            </Modal>
        </>
    )
}
export default ExchangeRecord
