import React from 'react'
import '../assets/style/farms.scss'
import { useTranslation } from "react-i18next";
import FarmsItem from '../components/FarmsItem'
import BNBToken from '../assets/image/BNBIcon.svg'
import SBLTokenIcon from '../assets/image/SBLTokenIcon.png'
import MBAToken from '../assets/image/MBAToken.png'
import USDCIcon from '../assets/image/USDCIcon.png'

export default function Farms() {
  let { t } = useTranslation();
  return (
    <div>
        <div className="farmsTitle">{t('Farms')}</div>
        <div className="FarmsCardList">
            <FarmsItem tokenA={SBLTokenIcon} tokenB={BNBToken} title="SBL-BNB" tokenIcon="tokenIcon"></FarmsItem>
            <FarmsItem tokenA={SBLTokenIcon} tokenB={MBAToken} title="SBL-MBA" tokenIcon="tokenIcon"></FarmsItem>
            <FarmsItem tokenA={SBLTokenIcon} tokenB={USDCIcon} title="SBL-USDC" tokenIcon="tokenIcon"></FarmsItem>
            <FarmsItem tokenA={MBAToken} tokenB={BNBToken} title="MBA-BNB" tokenIcon="tokenIcon"></FarmsItem>
        </div>
    </div>
  )
}
