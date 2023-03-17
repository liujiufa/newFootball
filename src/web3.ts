import { useCallback, useMemo } from 'react'
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract';
import { provider } from 'web3-core';
import Web3 from 'web3'
import { abiObj, contractAddress, obj } from './config'
import BigNumber from 'big.js'
declare let window: any;
interface contractType {
    [propName: string]: Contract;
}
export const ChainId = {
    BSC: 97,
    // BSC: 56,
}
//切换链
const SCAN_ADDRESS = {
    [ChainId.BSC]: 'https://bscscan.com'
}
//配置连接链的信息
const networkConf = {
    [ChainId.BSC]: {
        chainId: '0x61',
        // chainId: '0x38',
        chainName: 'BSC',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        // rpcUrls: ['https://bsc-dataseed2.binance.org'],
        // rpcUrls: ['https://bsc-dataseed.binance.org/'],
        rpcUrls: ['https://data-seed-prebsc-2-s1.binance.org:8545'],
        blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
    }
}
//切换链
export const changeNetwork = (chainId: number) => {
    return new Promise<void>(reslove => {
        const { ethereum } = window
        if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
            ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        ...networkConf[chainId]
                    }
                ],
            }).then(() => {
                setTimeout(reslove, 500)
            })
        } else {
            reslove()
        }
    })
}
// react-web3允许连接的链
export const injected = new InjectedConnector({
    supportedChainIds: [ChainId.BSC],
})

export const useConnectWallet = () => {
    const { activate, deactivate, active } = useWeb3React()
    const connectWallet = useCallback((connector: InjectedConnector, chainId: number) => {
        //切换到指定链
        return activate(connector, undefined, true).then((e) => {
        }).catch(errr => {
            changeNetwork(chainId).then(() => {

            })
        })
    }, [])
    useMemo(() => {
        // 首次尝试连接
        !active && connectWallet(injected, ChainId.BSC)
        window.ethereum && window.ethereum.on('chainChanged', () => {
            // 切换网络后，尝试连接
            // !active && connectWallet(injected, ChainId.BSC)
        })
    }, [])
    return connectWallet
}

export class Contracts {
    //单例
    static example: Contracts
    web3: Web3
    contract: contractType = {}
    constructor(library: provider) {
        this.web3 = new Web3(library)
        //保存实例到静态属性
        Contracts.example = this
    }
    //判断合约是否实例化
    verification(contractName: string) {
        if (!this.contract[contractName]) {
            this.contract[contractName] = new this.web3.eth.Contract(abiObj[contractName], contractAddress[contractName])
        }
    }
    //合约的方法
    //查询余额
    balanceOf(addr: string) {
        this.verification('Token')
        return this.contract.Token?.methods.balanceOf(addr).call({ from: addr })
    }
    //查询授权
    Tokenapprove(addr: string, toaddr: string) {
        this.verification('Token')
        console.log(addr, toaddr, this.contract.Token);
        return this.contract.Token?.methods.allowance(addr, toaddr).call({ from: addr })
    }
    //授权1
    approve(addr: string, toaddr: string) {
        this.verification('Token')
        var amount = Web3.utils.toBN("99999999999999999999999999999999")
        return this.contract.Token?.methods.approve(toaddr, amount).send({ from: addr })
    }
    //授权2
    approve1(addr: string, toaddr: string, amount: string) {
        this.verification('Token')
        // var amounted = Web3.utils.toWei(`${parseFloat(amount) * 100}`, "ether")
        var amounted = Web3.utils.toBN("99999999999999999999999999999999")
        console.log(addr, toaddr);
        return this.contract.Token?.methods.approve(toaddr, amounted).send({ from: addr })
    }
    //购买盲盒
    buyBox(addr: string, data: string, payableAmount: number,) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(payableAmount).times(10 ** 18).toString()
        this.verification('BlindBox')
        return this.contract.BlindBox?.methods.buyBox(data).send({ from: addr })
    }
    //购买盲盒
    openBox(addr: string, data: string) {
        this.verification('BlindBox')
        return this.contract.BlindBox?.methods.openBox(data).send({ from: addr })
    }
    //查询721归属
    ownerOf(addr: string, tokenId: string) {
        this.verification('NFT')
        return this.contract.NFT?.methods.ownerOf(tokenId).call({ from: addr })
    }
    //查询土地归属
    ownerLandOf(addr: string, tokenId: string) {
        console.log(tokenId,'222');
        this.verification('LandNFT')
        return this.contract.LandNFT?.methods.ownerOf(tokenId).call({ from: addr })
    }
    //创建订单
    createOrder(addr: string, tokenId: string, price: number | string, payToken: string, nftAddr: string) {
        this.verification('EXChangeNFT')
        BigNumber.NE = -40
        BigNumber.PE = 40
        let priceStr = new BigNumber(price).times(10 ** 18).toString()
        console.log(tokenId, priceStr, payToken, nftAddr, '111');
        // 1 1000000000000000000 0x0000000000000000000000000000000000000000 0xF8B48f9F7fC7DcC960402083D0B9A4D26DF14c0d
        return this.contract.EXChangeNFT?.methods.createOrder(tokenId, priceStr, payToken, nftAddr).send({ from: addr })
    }
    //取消订单
    cancelOrder(addr: string, orderId: string) {
        this.verification('EXChangeNFT')
        return this.contract.EXChangeNFT?.methods.cancelOrder('0x' + orderId).send({ from: addr })
    }
    //创建订单
    takeOrder(addr: string, orderId: string, price: number) {
        this.verification('EXChangeNFT')
        BigNumber.NE = -40
        BigNumber.PE = 40
        let priceStr = new BigNumber(price).times(10 ** 18).toString()
        console.log(orderId, price, addr)
        return this.contract.EXChangeNFT?.methods.takeOrder('0x' + orderId).send({ from: addr })
    }

    //授权所有NFT
    setApprovalForAll(addr: string, toAddr: string, isApprova: boolean) {
        this.verification('NFT')
        return this.contract.NFT?.methods.setApprovalForAll(toAddr, isApprova).send({ from: addr })
    }
    //授权所有土地NFT
    setLandApprovalForAll(addr: string, toAddr: string, isApprova: boolean) {
        this.verification('LandNFT')
        return this.contract.LandNFT?.methods.setApprovalForAll(toAddr, isApprova).send({ from: addr })
    }

    //判断NFT授权
    isApprovedForAll(addr: string, toAddr: string) {
        this.verification('NFT')
        return this.contract.NFT?.methods.isApprovedForAll(addr, toAddr).call({ from: addr })
    }

    //合成
    toSynthesis(addr: string, data: string) {
        this.verification('NFT')
        console.log(data, '合成');
        return this.contract.NFT?.methods.compound(data).send({ from: addr })
    }
    //购买节点
    buyNode(addr: string, data: string, payableAmount: number) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(payableAmount).times(10 ** 18).toString()
        this.verification('Node')
        return this.contract.Node?.methods.buyNode(data).send({ from: addr, value: num })
    }

    //节点退还
    quitNode(addr: string, data: string) {
        this.verification('Node')
        return this.contract.Node?.methods.quitNode(data).send({ from: addr })
    }
    //查询当前区块高度
    QueryBlock() {
        return this.web3.eth.getBlockNumber()
    }
    //查询BNB余额
    getBalance(addr: string) {
        return this.web3.eth.getBalance(addr)
    }

    // 2.0
    // 添加流动性
    addLiquidity(addr: string, type: number, type1: number) {
        console.log(addr, type, type1, '添加流动性');
        this.verification('Liquidity')
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(obj[type]).times(10 ** 18).toString()
        console.log(this.contract.Liquidity, 'Liquidity', num);
        return this.contract.Liquidity?.methods.addLiquidity(type1).send({ from: addr, value: num })
    }
    // 添加流动性
    // addLiquidity1(addr: string, type: number, type1: number) {
    //     console.log(addr, type, type1);
    //     this.verification('Liquidity')
    //     BigNumber.NE = -40
    //     BigNumber.PE = 40
    //     let num = new BigNumber(type).times(10 ** 18).toString()
    //     console.log(this.contract.Liquidity, 'Liquidity', num);
    //     return this.contract.Liquidity?.methods.addLiquidity(type1).call({ from: addr, value: num })
    // }
    // 移除流动性
    removeLiquidity(addr: string, typeNum: number, times: number) {
        this.verification('Liquidity')
        // BigNumber.NE = -40
        // BigNumber.PE = 40
        // let typeNumed = new BigNumber(typeNum).times(10 ** 18).toString()
        // let timesed = new BigNumber(times).times(10 ** 18).toString()
        return this.contract.Liquidity?.methods.removeLiquidity(typeNum, times).send({ from: addr })
    }
    // // 转SBL
    // toSBL(addr: string, amount: number,) {
    //     BigNumber.NE = -40
    //     BigNumber.PE = 40
    //     let num = new BigNumber(amount).times(10 ** 18).toString()
    //     this.verification('Liquidity')
    //     console.log(num);
    //     return this.contract.Liquidity?.methods.queryAmountOut(num).call({ from: addr })
    // }
    // 转BNB(非流动性)
    toBNB(addr: string, amount: number,) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('BurnFund')
        return this.contract.BurnFund?.methods.queryAmountOut(num).call({ from: addr })
    }
    // 转BNB(流动性)
    toLiquidityBNB(addr: string, amount: number,) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('Liquidity')
        return this.contract.Liquidity?.methods.queryAmountOut(num).call({ from: addr })
    }
    // 销毁奖励
    burnToEarn(addr: string, amount: number,) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('BurnFund')
        return this.contract.BurnFund?.methods.burnToEarn(num).send({ from: addr })
    }
    // 销毁基金
    burnLimit(addr: string) {
        // BigNumber.NE = -40
        // BigNumber.PE = 40
        // let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('BurnFund')
        return this.contract.BurnFund?.methods.burnLimit().call({ from: addr })
    }
    // 销毁基金
    minToBurn(addr: string) {
        // BigNumber.NE = -40
        // BigNumber.PE = 40
        // let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('BurnFund')
        return this.contract.BurnFund?.methods.minToBurn().call({ from: addr })
    }
    // 领取销毁奖励
    withdrawReward(addr: string) {
        this.verification('BurnFund')
        return this.contract.BurnFund?.methods.withdrawReward().send({ from: addr })
    }
    // 质押
    stake(addr: string, NFTAddress: string, tokenId: string) {
        console.log(tokenId);

        this.verification('Pledge')
        return this.contract.Pledge?.methods.stake(NFTAddress, tokenId).send({ from: addr })
    }
    // 取消质押
    unstake(addr: string, NFTAddress: string, tokenId: string) {
        this.verification('Pledge')
        return this.contract.Pledge?.methods.unstake(NFTAddress, tokenId).send({ from: addr })
    }
    // 兑换MBA
    improveHashRate(addr: string, amount: number) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('Pledge')
        return this.contract.Pledge?.methods.improveHashRate(num).send({ from: addr })
    }
    //查询质押授权
    approvePledge(addr: string, toaddr: string) {
        this.verification('NFT')
        return this.contract.NFT?.methods.allowance(addr, toaddr).call({ from: addr })
    }
    //质押授权
    ApprovePledgeFun(addr: string, toaddr: string) {
        this.verification('NFT')
        var amount = Web3.utils.toBN("99999999999999999999999999999999")
        return this.contract.NFT?.methods.approve(toaddr, amount).send({ from: addr })
    }
    //土地申领
    ApplyLand(addr: string, data: string) {
        this.verification('LandNFT')
        return this.contract.LandNFT?.methods.mint(data).send({ from: addr })
    }
    //领取收益
    getPledgeAward(addr: string, data: string) {
        this.verification('Pledge')
        return this.contract.Pledge?.methods.withdrawReward(data).send({ from: addr })
    }
    //领取节点收益
    getNodeFundAward(addr: string, data: string) {
        this.verification('NodeDistribute')
        return this.contract.NodeDistribute?.methods.withdrawReward(data).send({ from: addr })
    }
    //领取土地收益
    getLandAward(addr: string, data: string) {
        this.verification('LandReward')
        return this.contract.LandReward?.methods.withdrawReward(data).send({ from: addr })
    }
    //领取销毁收益
    getBurnFundAward(addr: string, data: string) {
        this.verification('BurnFund')
        return this.contract.BurnFund?.methods.withdrawReward(data).send({ from: addr })
    }
    //转SBL(非流动性)
    toSBL(addr: string, amount: number,) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('BurnFund')
        console.log(num);
        return this.contract.BurnFund?.methods.querySBLAmountOut(num).call({ from: addr })
    }
    //盲盒价格转MBAS(非流动性)
    toMBAS(addr: string, amount: number,) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('BlindBox')
        console.log(num);
        return this.contract.BlindBox?.methods.queryMBASAmountOut(num).call({ from: addr })
    }
    //转SBL(流动性)
    toLiquiditySBL(addr: string, amount: number,) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(amount).times(10 ** 18).toString()
        this.verification('Liquidity')
        console.log(num);
        return this.contract.Liquidity?.methods.querySBLAmountOut(num).call({ from: addr })
    }
    //领取节点收益
    getNodeAward(addr: string, data: string, type: number) {
        this.verification('Node')
        return this.contract.Node?.methods.getAward(data, type).send({ from: addr })
    }
    //领取邀请收益
    getInviteReward(addr: string, data: string) {
        this.verification('InviteReward')
        return this.contract.InviteReward?.methods.withdrawReward(data).send({ from: addr })
    }
    //SBL总供应量
    totalSupply(addr: string) {
        this.verification('Token')
        return this.contract.Token?.methods.totalSupply().call({ from: addr })
    }
    //按钮状态
    nodes(addr: string) {
        this.verification('FundNode')
        return this.contract.FundNode?.methods.nodes(addr).call({ from: addr })
    }
    //领取代币
    claimMBAS(addr: string) {
        this.verification('FundNode')
        return this.contract.FundNode?.methods.claimMBAS().send({ from: addr })
    }
    //查询是否领取
    claimedNode(addr: string) {
        this.verification('FundNode')
        return this.contract.FundNode?.methods.claimedNode(addr).call({ from: addr })
    }
    //查询创世节点是否认购
    nodeReward(addr: string) {
        this.verification('FundNode')
        return this.contract.FundNode?.methods.nodeReward(addr).call({ from: addr })
    }
    //确定领取数据
    queryClaimMBAS(addr: string) {
        this.verification('FundNode')
        return this.contract.FundNode?.methods.queryClaimMBAS(addr).call({ from: addr })
    }
    //创世节点确定领取数据
    queryClaimExtraMBAS(value: string, addr: string) {
        this.verification('FundNode')
        return this.contract.FundNode?.methods.queryClaimExtraMBAS(value).call({ from: addr })
    }
    //前150节点领取代币
    claimExtraMBAS(data: string, addr: string, value: string) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(value).times(10 ** 18).toString()
        this.verification('FundNode')
        return this.contract.FundNode?.methods.claimExtraMBAS(data).send({ from: addr, value: num })
    }
    //参与节点
    buyJoinNode(addr: string, referAddress: string) {
        BigNumber.NE = -40
        BigNumber.PE = 40
        let num = new BigNumber(0.2).times(10 ** 18).toString()
        this.verification('FundNode')
        return this.contract.FundNode?.methods.buyNode(referAddress).send({ from: addr, value: num })
    }
}