import Token from './ABI/ERC20Token.json';
import BlindBox from './ABI/BlindBox.json';
import EXChangeNFT from './ABI/EXChangeNFT.json';
import Merge from './ABI/Merge.json';
import NFT from './ABI/NFT.json';
import Node from './ABI/Node.json';
import Liquidity from './ABI/Liquidity.json';
import BurnFund from './ABI/BurnFund.json';
import Pledge from './ABI/Stake.json';
import LandNFT from './ABI/LandNFT.json';
import LandReward from './ABI/LandDistribute.json';
import InviteReward from './ABI/InviteReward.json';
// export let baseUrl: string = 'http://192.168.2.111:10000';
export let baseUrl: string = 'http://47.107.116.172:10000';
// export let baseUrl: string = 'http://spaceballgames.com:10000';
interface abiObjType {
    [propName: string]: any;
}
interface contractAddressType {
    [propName: string]: string;
}

export const abiObj: abiObjType = {
    "Token": Token,
    "BlindBox": BlindBox,
    "NFT": NFT,
    "Merge": Merge,
    "EXChangeNFT": EXChangeNFT,
    "Node": Node,
    "Liquidity": Liquidity,
    "BurnFund": BurnFund,
    "Pledge": Pledge,
    "LandNFT": LandNFT,
    "LandReward": LandReward,
    "InviteReward": InviteReward,

}
export const contractAddress: contractAddressType = {
    //正式
    // "Token": "0x55d398326f99059fF775485246999027B3197955",
    // "BlindBox": "0xb6B4b59d8105C132e3892d1B4cB1FE573BBaE995",
    // "EXChangeNFT": "0x321b5981a0bB2c919DD8581cAD8a61ABAD924727",
    // "NFT": "0x86C94d3F18D0cb355916705EeDB0bB4329C23b41",
    // "Merge": "0xAe450cb7A03E1C181B7379712F0C81b5609384cE",
    // "Node": "0x8961a1a9e21B03219C8fC72b3fD20fA2f9e71d8E"
    //测试
    // v2
    // "Token": "0x9B576AF82FacBDDb09f39e74E4a8E9363532cdc6",
    // "BlindBox": "0xa028B731609143f48680a31f1f666AC4dF7bE733",
    // "EXChangeNFT": "0xAACE2CcFfA68A37fEA00D5ce6BD7F875Eb53883c",
    // "NFT": "0xcF7993C9052Ee8a4a3294387B5d2c1B3cAB42235",
    // "Merge": "0xe90eC450e9Fb437c827Db92de17aEa0Bc825b9DC",
    // "Node": "0x314F8107f7131EeC0a55e34c80103eD8d2f0fC71",
    // "Liquidity": "0xEbBa10bf85C9AE3a74EEd77DD67209b7Aee9177c",
    // "BurnFund": "0xf085891FA5d4E25B5b23C68eDC042e4Adb4a9808",
    // "Pledge": "0x1A499f0Db563DD725Bc898B9f72b144B156fAD0C",
    // "LandNFT": "0xCb799cBa3D590d8552f9B287eCc1440efdf77345",
    // "LandReward": "0x729b20B99Dd45E93dE095F55280D175dE8105162"
    // v3
    // "Token": "0xa6B8C7E3C18E44811deC5b8E6784234f2e65ad36",
    // "BlindBox": "0x9B3924686D73be19b3E0939c5fA3698a396C8B52",
    // "EXChangeNFT": "0x857884699Ced9C89574B21d4cb39cc4759DBF8Ac",
    // "NFT": "0xdd233a8ecC074dBFb7d450ed028fD75D0d3c6140",
    // "Merge": "0x075bd4Db4AFbf3DC4A6e4CBBda07b1087926F276",
    // "Node": "0x0D4ba732215319523D49715E461C313aCD625156",
    // "Liquidity": "0x7D0461525E396270FDC90C25A96fA512d57438e0",
    // "BurnFund": "0x1D092a322267F2497c6b45b778B070a19b975269",
    // "Pledge": "0x17E3ed7b8B10007866b71906Cb595C7E8359D1CA",
    // "LandNFT": "0x935b3507Cd65b9cbd303fD6cf4fba7dB66A47A54",
    // "LandReward": "0x6025B7CABcb771125b594F0B4886Cc4f3fA1B54E",
    // "InviteReward": "0xC0829F536B3F2657C1ABa9564C9d4682f9B559f7",
    // vmain
    "Token": "0x6D867F8b8C9AedE716a31466817Bc4870802Ecac",
    "BlindBox": "0xafc67D79dA728976cbF9BEAa1182eA92bD949E86",
    "EXChangeNFT": "0xb4d18B77915df171EFd95d3D6E8e3b5641bBebeC",
    "NFT": "0xFc32BCB0e13607b7F30875767a7E5ce97d619D6b",
    "Merge": "0x2A05De62F8F1464Ecb8EbB87281997A68C70fd77",
    "Node": "0xf1767A240c334b5fdbBfDb399602Ddb1a0f4Cb72",
    "Liquidity": "0xA1eBFD3bad71C5aD4E35752c22E6214f7253422d",
    "BurnFund": "0x65296af788aE05C29694e0A019d3dd5B55548F49",
    "Pledge": "0x4951699049f7a7de700E4Ce4a804Db1B0bc2609a",
    "LandNFT": "0x35E47C402cc1636113A92eAf58De4e57aE815dc7",
    "LandReward": "0x126DE7AFd2ec25b2862D92ff2808d5C3A8A525c0",
    "InviteReward": "0x48A8Da71dDC32c1E4CDBf8614365660AfA87C8ae",
    // 销毁账号
    "DestructBalance": "0x000000000000000000000000000000000000dEaD"
}