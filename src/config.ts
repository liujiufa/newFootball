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
// export let baseUrl: string = 'http://192.168.2.111:10000';
// export let baseUrl: string = 'http://47.107.116.172:10000';
// export let socketUrl: string = 'http://spaceballgames.com:8912/endpointWisely';
// export let socketUrl: string = 'http://192.168.2.133:8912/endpointWisely';
export let socketUrl: string = 'http://47.107.116.172:8912/endpointWisely';
// export let baseUrl: string = 'http://spaceballgames.com:10000';
export let baseUrl: string = 'http://47.107.116.172:10000';
// export let baseUrl: string = 'http://192.168.2.121:10000';
export let BlockUrl: string = 'https://testnet.bscscan.com/tx/';
export let obj = { 0.2: 0.1, 0.5: 0.2, 1: 0.3, 2.5: 0.4, 8: 0.5 }
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
    "Token": "0x030870f2e1fE2738fa67418652bc02Ac5962E3b6",
    "BlindBox": "0xfD495162faBAF48B848fD5523184f5E9A67fC85d",
    "EXChangeNFT": "0x5342Ff2Ef64BEef28Ec22f94f7CD79E45d08DC49",
    "NFT": "0x280017329c764A5b4eF26cc447FE424674628498",
    "Merge": "0x075bd4Db4AFbf3DC4A6e4CBBda07b1087926F276",
    "Node": "0xdCe3C0FC23013D9531c0615EfF42eCcAdFe32C4d",
    "Liquidity": "0xC60E1e58Cd4052Ed5AFe3499F0365b89a81792d1",
    "BurnFund": "0x8B4578c4501f2D77a3E62159Fa147B45310edb36",
    "Pledge": "0x674a5FBb9F12eDeF7Cfb2619DE47Ef8CAAecA02a",
    "LandNFT": "0x75DCc4d1414c3505aC0874deE9d1dA2003f2503e",
    "LandReward": "0xb249Ad46Eb8B9c95Dc94E476d9da4de328a5b975",
    "InviteReward": "0x7dc040E5E1dC8a44a014bFA6768413f5F14d3822",
    "FundNode": "0x14ea3d1FfdD3e4dA676828329FC2d0f45977801e",
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
    // vmain
    // "Token": "0x6D867F8b8C9AedE716a31466817Bc4870802Ecac",
    // "BlindBox": "0xafc67D79dA728976cbF9BEAa1182eA92bD949E86",
    // "EXChangeNFT": "0xb4d18B77915df171EFd95d3D6E8e3b5641bBebeC",
    // "NFT": "0xFc32BCB0e13607b7F30875767a7E5ce97d619D6b",
    // "Merge": "0x2A05De62F8F1464Ecb8EbB87281997A68C70fd77",
    // "Node": "0xf1767A240c334b5fdbBfDb399602Ddb1a0f4Cb72",
    // "Liquidity": "0xA1eBFD3bad71C5aD4E35752c22E6214f7253422d",
    // "BurnFund": "0x65296af788aE05C29694e0A019d3dd5B55548F49",
    // "Pledge": "0x4951699049f7a7de700E4Ce4a804Db1B0bc2609a",
    // "LandNFT": "0x35E47C402cc1636113A92eAf58De4e57aE815dc7",
    // "LandReward": "0x126DE7AFd2ec25b2862D92ff2808d5C3A8A525c0",
    // "InviteReward": "0x48A8Da71dDC32c1E4CDBf8614365660AfA87C8ae",
    // main-v2
    // "Token": "0xA013e36C78BA39Ff6bE4781f0f2FBF935f6BA05A",
    // "BlindBox": "0x2Aae476e9FD0D2d754CAe57feFD0fD715beC240E",
    // "EXChangeNFT": "0x04186601465763266a467Cb1dad093AFA15d1633",
    // "NFT": "0x86C94d3F18D0cb355916705EeDB0bB4329C23b41",
    // "Merge": "0x0f41B63F4C0a8407e3c7C15911e4250448D082Ea",
    // "Node": "0xBf6785844b21dd08ce60c9942f25f07F8147e48A",
    // "Liquidity": "0x0928af9cba5ba210e50D6C39798292933eD4354d",
    // "BurnFund": "0x117915D1aAE6362ab05481359a424fD87EcBA242",
    // "Pledge": "0xCF79A74B2B7bfD559607cdcd570fA7A3fd53Bf46",
    // "LandNFT": "0xA73E03be16BD52981C7BAc941F17173Dd0F1A295",
    // "LandReward": "0x77304E26879387903C639661F92DF10E037dEC00",
    // "InviteReward": "0x689f6Eae90f3367A18aCa5F72390E4d20B50594A",
    // "DestructBalance": "0x000000000000000000000000000000000000dEaD"
}