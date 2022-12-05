import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next'
import dropDownIcon from '../assets/image/dropDownIcon.png'
import '../assets/style/componentsStyle/DropDown.scss'
interface DropDownPropsType {
  Map: {
    key: string,
    value: number,
  }[],
  staetIndex?: number
  change: Function
}
function DropDown(props: any) {
  let { t } = useTranslation()
  // let [Index, setIndex] = useState(props.staetIndex || 0)
  let [Index, setIndex] = useState(props.staetIndex || 0)
  const { Map } = props
  function change(value: number, index: number) {
    setIndex(index)
    props.change(value)
  }
  const menu = (
    <Menu>
      {
        Map.map((item: any, index: any) => <Menu.Item key={index} onClick={() => { change(item.value, index) }}>
          {t(item.key)}
        </Menu.Item>)
      }
    </Menu>
  );
  function getparent(triggerNode: any) {
    return triggerNode.parentNode
  }
  return (
    <Dropdown overlay={menu} overlayClassName="DropDown" getPopupContainer={getparent} trigger={['click']}>
      <div className="dropDown" >
        {t(Map[Index].key)}
        <img src={dropDownIcon} alt="" />
      </div>
    </Dropdown>
  )
}
export default React.memo(DropDown)