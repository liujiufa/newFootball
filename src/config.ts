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
import FundNode from './ABI/FundNode.json';
import NodeDistribute from './ABI/NodeDistribute.json';
export let baseUrl: string = 'http://47.107.116.172:10000';
// export let socketUrl: string = 'http://spaceballgames.com:8912/endpointWisely';
export let socketUrl: string = 'http://47.107.116.172:8912/endpointWisely';
// export let socketUrl: string = 'http://192.168.2.124:8912/endpointWisely';
// export let baseUrl: string = 'http://spaceballgames.com:10000';
// export let baseUrl: string = 'http://192.168.2.124:10000';
// export let baseUrl: string = 'http://192.168.2.121:10000';
// export let baseUrl: string = 'http://192.168.2.107:10000';
export let BlockUrl: string = 'https://testnet.bscscan.com/tx/';
export let obj = { 0.2: 0.1, 0.5: 0.2, 1: 0.3, 2.5: 0.4, 8: 0.5 }
export let nftLevel = { 1: "精灵仙子", 2: "水精灵", 3: "木精灵", 4: "火精灵", 5: "土精灵", 6: "金精灵" }
export let nftType = { 1: "绯红", 2: "橙黄", 3: "湛蓝", 4: "翠色", 5: "浅紫" }
export let landLevel = { 1: "地球领土", 2: "行星领土", 3: "银河领土", 4: "星际领土", 5: "宇宙领土" }
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
    "FundNode": FundNode,
    "NodeDistribute": NodeDistribute,

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
    "Token": "0x495411D684d06Ab95453C4376c2c34538bBCb651",
    "BlindBox": "0x5427A4764161A578cAe1400B41Bd6297cb7817C7",
    "EXChangeNFT": "0x0d156E69426cBE8527D6b370E148ba0F6F911b18",
    "NFT": "0x23c402C48C50906a2F7760E805385CA187C55762",
    "Merge": "0x075bd4Db4AFbf3DC4A6e4CBBda07b1087926F276",
    "Node": "0xF66D5bDbe33681F90C4ce070f4AE5128DA341B03",
    "Liquidity": "0x67eA4B18ee62975aEa0b21eC793145268754c03B",
    "BurnFund": "0x1395Eb8CF44105d4F42F80e075Fd14747333C2EB",
    "Pledge": "0x375ff2948D3e0E75D1a5f3288C8DEf2a69a3A298",
    "LandNFT": "0x5E29Eb812ee60281887FD48a0F7ac0e18b274542",
    "LandReward": "0x1f030EC1a30CBB3e5e351a7a0D71c9843B8c38aD",
    "InviteReward": "0x6DC795AA13334aB2Da19f4b11A420BdBb0127f52",
    "FundNode": "0xE593344a4dEeA65d85D79fB0E22ebCE11a4ab932",
    "NodeDistribute": "0xCFF8F1f9231a80876151A9B7621eB35fb7Bc75f2",
    // v3
    // "Token": "0x77382cea8f8509b48A4dd7Ecb3F8F8ce7f7c446b",
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
    // "FundNode": "0xDdE4Ae4D97c1e8C894eDa0e372880E2342e07b9f",
}