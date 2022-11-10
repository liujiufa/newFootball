import React , {useState} from 'react'
import Card from './CardEmbedded'
import { useTranslation } from "react-i18next";
import { addMessage } from "../utils/tool";
import share from '../assets/image/share.png'
interface propsType{
    title:string,
    tokenIcon:string,
    tokenA:string,
    tokenB:string,
}
export default function FarmsItem(props:propsType) {
    let { t, i18n } = useTranslation();
    function noOpen() {
    addMessage(t("Not opened yet"));
    }
    let [weight,setWeight] = useState(0)
    return (
        <Card title={props.title} tokenA={props.tokenA} tokenB={props.tokenB} multiple={weight} tokenIcon={props.tokenIcon}>
            <div>
                <div className='card-list'>
                    <span>APR</span>
                    <span>9225.50%</span>
                </div>

                <div className='card-list'>
                    <span>{t('Earn')}：</span>
                    <span>SBL</span>
                </div>

                <div className='card-operate'>
                    <div>
                        <p>{t('EARNED')} SBL</p>
                        <p>0.000000</p>
                    </div>
                    <button onClick={noOpen}>{t('Harvest')}</button>
                </div>

                {/* <div className='card-list'><span className='card-tip'> <FormattedMessage id='Pledged' /> {props.title} </span></div> */}
                <div className="pledge">
                    <div className='pledgeLeft'>
                        <div>
                            <span className='card-tip'> {t('Stake')} SBL-MBA</span>
                        </div>
                        <div className='pledgeNum'>0.000000</div>
                    </div>
                    <div className="pledgeRight">
                        <div style={{marginRight:20}}>-</div>
                        <div>+</div>
                    </div>
                </div>
                {/* {
                    !allowance && <div className='card-buy'>
                                      <button onClick={Approve}><FormattedMessage id='Approve Contract'  /></button>
                                  </div>
                }
                {
                    !!allowance && <div className='card-buy'>
                                      <button onClick={pledge}><FormattedMessage id='Determine'  /></button>
                                  </div>
                } */}
                
                <div className='card-underline'></div>

                <div className='card-list'>
                    <span>{t('Stake')}：</span>
                    {/* <span>{props.title} LP </span>  */}
                    <span style={{color: '#7F53FE'}}>{props.title} LP</span> 
                    <img style={{marginLeft:'8px'}} src={share} alt="" />
                    {/* <a rel="noreferrer" target="_blank" href="https://www.cherryswap.net/#/pool">
                        <span style={{color: '#7F53FE'}}>SBL-BNB LP</span> 
                        <img style={{marginLeft:'8px'}} src={share} alt="" />
                    </a> */}
                </div>

                <div className='card-list'>
                    <span>{t('Total stake')}：</span>
                    <span>$7,987,899</span>
                </div>
                <div className='card-view'  >{t('View on Bscscan')}<a  rel="noreferrer" href={"https://www.oklink.com/okexchain-test/address/"} target="_blank"></a></div>
            </div>
        </Card>
    )
}