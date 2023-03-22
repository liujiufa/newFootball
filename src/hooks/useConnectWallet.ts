import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ChainId } from '../web3';

export const connector = new InjectedConnector({
    supportedChainIds: [Number(ChainId.BSC)],
})

// 连接 metamask
export const tryConnect = (activate: any) => {
    return activate(
        connector,
        (err: any) => {
            console.log(err);
        },
        true
    );
};

export default function useConnectWallet() {

    const { activate, deactivate, active } = useWeb3React()


    const connectWallet = useCallback(
        () => {
            tryConnect(activate).then(() => {
                console.log("CONNECT WALLET")
            }).catch(() => {
                if (Number((window as any)?.ethereum.networkVersion) !== Number(ChainId.BSC)) {
                    (window as any)?.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{
                            chainId: ChainId.BSC,
                        }]
                    }).then((res: any) => {
                        // window.location.reload()
                        console.log("res")
                    }).catch((error: any) => {
                        if (error.code !== 4001) {
                            (window as any)?.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: "0x61",
                                    chainName: "Ethereum Mainnet",
                                    rpcUrls: ["https://data-seed-prebsc-2-s1.binance.org:8545"],
                                    nativeCurrency: {
                                        symbol: "BNB",
                                        name: 'BNB',
                                        decimals: 18
                                    },
                                    blockExplorerUrls: ["https://etherscan.io/"]
                                }]
                            })
                        }
                    })


                }
            });
        },
        [tryConnect, activate]
    )
    return ({
        connectWallet
    })
}
