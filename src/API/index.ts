import axois from '../utils/axiosExport'
interface LoginData {
    password: string;
    refereeUserAddress: string;
    userAddress: string;
    userPower: number;
}

export function Login(data: LoginData) {
    return axois.request({
        url: '/user/uUser/loginByPass',
        method: 'post',
        data: {
            ...data,
            Encrypt: true
        }
    })
}
/* 获取盲盒基本配置 */
export function getBoxBase() {
    return axois.request({
        url: '/user/bBoxBase/getBoxBase',
        method: 'get'
    })
}
interface buyBoxPropsType {
    id: number
    userAddress: string,
    buyCount: number
}
interface buyBoxType {
    id: number
    userAddress: string
}
/* 购买盲盒加密 */
export function buyBox(data: buyBoxPropsType) {
    return axois.request({
        url: '/user/bBoxBase/buyBox',
        method: 'post',
        data
    })
}
/* 开启盲盒 */
export function openBox(data: buyBoxType) {
    return axois.request({
        url: '/user/bBoxUser/openBox',
        method: 'post',
        data
    })
}
/* 获取用户盲盒信息 */
export function getBoxUserInfo() {
    return axois.request({
        url: `/user/bBoxUser/getBoxUserInfo`,
        method: 'get'
    })
}
interface getUserCardType {
    currentPage: number,
    level: number,
    pageSize: number,
    type?: number,
    userAddress: string
}
/* 获取用户徽章信息 */
export function getUserCard(data: getUserCardType) {
    return axois.request({
        url: `/user/cCardUser/getCardUserInfo`,
        method: 'post',
        data
    })
}
interface compoundCardType {
    cardId: number,
    choiceCardId: number
}
/* 合成 */
export function compoundCard(data: compoundCardType) {
    console.log(data, '后台合成');

    return axois.request({
        url: `/user/cCardUser/compoundCard`,
        method: 'post',
        data
    })
}
/* 获取可合成徽章 */
export function getCardCompoundList(data: getUserCardType) {
    return axois.request({
        url: `/user/cCardUser/getCardCompoundList`,
        method: 'post',
        data
    })
}
interface getUserOrderType {
    currentPage: number,
    level: number,
    pageSize: number,
    type?: number,
    sortType?: number,
    userAddress?: string,
    cardType?: number
}
/* 获取交易场列表 */
export function getOrderList(data: getUserOrderType) {
    console.log(data);

    return axois.request({
        url: `/user/cCardOrder/getOrderList`,
        method: 'post',
        data
    })
}
/* 获取用户邀请列表 */
export function getUserReferee() {
    return axois.request({
        url: `/user/uUserReferee/inviteData`,
        method: 'get',
    })
}
/* 获取用户订单记录 */
export function getOrderStateList() {
    return axois.request({
        url: `/user/cCardOrder/getOrderStateList`,
        method: 'get',
    })
}
/* 获取节点配置 */
export function getNodeBase() {
    return axois.request({
        url: `/user/dNodeBase/getNodeBase`,
        method: 'get',
    })
}
/* 购买节点加密数据 */
export function buyNodeBase(data: buyBoxType) {
    return axois.request({
        url: `/user/dNodeBase/buyNodeBase`,
        method: 'post',
        data: {
            ...data,
            Encrypt: true
        }
    })
}
/* 获取节点奖励记录 */
export function getNodeUserList() {
    return axois.request({
        url: `/user/dNodeBase/getNodeUserList`,
        method: 'get'
    })
}
/* 获取用户最高等级 */
export function getCardUserMaxLevelInfo() {
    return axois.request({
        url: `/user/cCardUser/getCardUserMaxLevelInfo`,
        method: 'get'
    })
}
/* 获取用户节点申请记录 */
export function getNodeUserBuyRecord() {
    return axois.request({
        url: `/user/dNodeBase/getNodeUserBuyRecord`,
        method: 'get'
    })
}
/* 获取用户 */
export function getUserAccountList() {
    return axois.request({
        url: `/user/uUserAccount/getUserAccountList`,
        method: 'get'
    })
}
/* 获取用户节点收益记录 */
export function getNodeEarnRecord(id: number) {
    return axois.request({
        url: `/user/dNodeBase/getNodeEarnRecord/${id}`,
        method: 'get'
    })
}
/* 获取收益记录 type:1 推荐 2 土地服务奖 4 土地分红 */
export function getUserAccountDetail(type: number) {
    return axois.request({
        url: `/user/uUserAccount/getUserAccountDetail/${type}`,
        method: 'get'
    })
}
interface DrawAwardType {
    type: number,
    id: number,
}
/* 用户领取收益 */
export function userDrawAward(data: DrawAwardType) {
    console.log(data)
    return axois.request({
        url: `/user/uUserAccount/userDrawAward`,
        method: 'post',
        data: {
            ...data,
            Encrypt: true
        }
    })
}
/* 节点退还 */
export function nodeReturned(data: buyBoxType) {
    console.log(data)
    return axois.request({
        url: `/user/dNodeBase/nodeReturned`,
        method: 'post',
        data: {
            ...data,
            Encrypt: true
        }
    })
}
/* 获取等级合成需要的BNB数量 */
export function compoundCardConfig(cardLevel: number) {
    return axois.request({
        url: `/user/cCardUser/compoundCardConfig/${cardLevel}`,
        method: 'get'
    })
}
/* 购买节点取消 */
export function cancelBuyNodeBase(data: buyBoxType) {
    return axois.request({
        url: `/user/dNodeBase/cancelBuyNodeBase`,
        method: 'post',
        data
    })
}
/* 获取家族土地信息 */
export function getHomeLand() {
    return axois.request({
        url: `/user/uUser/getHomeLand`,
        method: 'get'
    })
}
/* 用户取消收获奖励 */
export function userCancelDrawAward(data: DrawAwardType) {
    return axois.request({
        url: `/user/uUserAccount/userCancelDrawAward`,
        method: 'post',
        data: {
            ...data,
            Encrypt: true
        }
    })
}


// 2.0
// 获取销毁记录
export function getBurnRecord() {
    return axois.request({
        url: `/user/dBurnUser/getBurnRecord`,
        method: 'get'
    })
}
// 获取销毁奖励领取记录
export function getDrawBurnRecord() {
    return axois.request({
        url: `/user/dBurnUser/getDrawBurnRecord`,
        method: 'get'
    })
}
// 获取用户销毁奖励
export function getBurnUserInfo() {
    return axois.request({
        url: `/user/dBurnUser/getBurnUserInfo`,
        method: 'get'
    })
}
// 获取用户兑换记录
export function getExchangeRecord() {
    return axois.request({
        url: `/user/mMbaUser/getExchangeRecord`,
        method: 'get'
    })
}
// 获取用户MBA使用记录
export function getMbaUseRecord() {
    return axois.request({
        url: `/user/mMbaUser/getMbaUseRecord`,
        method: 'get'
    })
}
// 获取用户销毁奖励
export function getMbaUserInfo() {
    return axois.request({
        url: `/user/mMbaUser/getMbaUserInfo`,
        method: 'get'
    })
}
// 获取我的权益
export function getLandUserBeneficial() {
    return axois.request({
        url: `/user/lLandUser/getLandUserBeneficial`,
        method: 'get'
    })
}
// 土地申领数据
export function getLandUserList() {
    return axois.request({
        url: `/user/lLandUser/getLandUserList`,
        method: 'get'
    })
}
interface getUserLandCardType {
    currentPage: number,
    level: number,
    pageSize: number,
    type?: number,
    userAddress: string
}
// 获取用户土地卡牌
export function getLandUserCardList(data: getUserLandCardType) {
    console.log(data);

    return axois.request({
        url: `/user/lLandUser/getLandUserCardList`,
        method: 'post',
        data
    })
}
interface getPledgeCardUserInfo {
    currentPage: number,
    level?: number,
    pageSize: number,
    type?: number,
    userAddress: string
}
// 获取用户质押卡牌
export function getPledgeCardUserInfo(data: getPledgeCardUserInfo) {
    return axois.request({
        url: `/user/cCardUser/getPledgeCardUserInfo`,
        method: 'post',
        data
    })
}
// 提升算力
export function promotePower(data: any) {
    console.log(data, '提升算力');
    return axois.request({
        url: `/user/mMbaUser/promotePower`,
        method: 'post',
        data
    })
}
// 申领土地
export function claimLand() {
    return axois.request({
        url: `/user/lLandUser/claimLand`,
        method: 'post',
        data: {
            Encrypt: true
        }
    })
}
// 获取个人信息
export function getUserInfo() {
    return axois.request({
        url: `/user/uUser/getUserInfo`,
        method: 'get'
    })
}
// 获取用户邀请资产
export function getRefereeUserAccount() {
    return axois.request({
        url: `/user/uUserAccount/getRefereeUserAccount`,
        method: 'get'
    })
}
// 获取用户质押上方数据
export function getPledgeCardUserData() {
    return axois.request({
        url: `/user/cCardUser/getPledgeCardUserData`,
        method: 'get'
    })
}
// 获取用户流动性列表
export function getUserLpList() {
    return axois.request({
        url: `/user/uUserLp/getUserLpList`,
        method: 'get'
    })
}
// 获取提升算力所需MBA
export function getPromotePowerNum() {
    return axois.request({
        url: `/user/mMbaUser/getPromotePowerNum`,
        method: 'get'
    })
}
//获取节点招募配置
export function getNodeEquityBase() {
    return axois.request({
        url: `/user/nNodeRecruitRecord/getNodeEquityBase`,
        method: 'get'
    })
}
//获取创世节点排行
export function getRankingRecord(dataId: number) {
    return axois.request({
        url: `/user/nNodeRecruitRecord/getRankingRecord/${dataId}`,
        method: 'get'
    })
}
//获取创世节点配置
export function nodeLand() {
    return axois.request({
        url: `/user/nNodeRecruitRecord/nodeLand`,
        method: 'get'
    })
}
//领取创世节点额度奖励
export function drawNodeAward(data: any) {
    return axois.request({
        url: `/user/nNodeRecruitRecord/drawNodeAward`,
        method: 'post',
        data
    })
}