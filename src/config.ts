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

// 公司
// export let baseUrl: string = 'http://47.107.116.172:10086';
// export let socketUrl: string = 'http://47.107.116.172:10089/endpointWisely';
// export let socketUrl: string = 'http://spaceballgames.com:8912/endpointWisely';
// 自己
export let baseUrl: string = 'http://47.107.116.172:10000';
export let socketUrl: string = 'http://47.107.116.172:8912/endpointWisely';
// export let baseUrl: string = 'http://spaceballgames.com:10000';
// export let baseUrl: string = 'http://192.168.2.124:10000';
// export let baseUrl: string = 'http://192.168.2.118:10000';
// export let baseUrl: string = 'http://192.168.2.107:10000';
// export let BlockUrl: string = 'https://testnet.bscscan.com/tx/';
export let BlockUrl: string = 'https://bscscan.com/tx/';
export let obj = { 0.2: 0.0001, 0.5: 0.0002, 1: 0.0003, 2.5: 0.0004, 8: 0.0005 }
export let starLevel = { 1: "1 star", 2: "2 star", 3: "3 star", 4: "4 star", 5: "5 star", 6: "6 star" }
export let nftLevel = { 1: "Fairy", 2: "Aqua Genie", 3: "Forest Genie", 4: "Flame Genie", 5: "Terra Genie", 6: "Gold Genie" }
export let nftType = { 1: "Crimson", 2: "Tangerine", 3: "Sapphire", 4: "Emerald", 5: "Lavender" }
export let landLevel = { 1: "Supernova", 2: "Outpost", 3: "Galactic Hub", 4: "Star Empire", 5: "Cosmic Nexus" }
export let rewardType = { 1: "", 2: "", 3: "claim", 4: "Distribution", 5: "" }
export let rewardNodeType = { 1: "claim", 2: "Distribution", 3: "refund" }
export let grade = { 1: "First prize", 2: "Second prize", 3: "Third prize", 4: "General  prize" }

export let BNBValue = 0.0001
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
    // v4
    // "Token": "0x0a845123a35bC8d1Aa67344Ac5eC69939A445550",
    // "BlindBox": "0x717d17b9fBbb8a762fD52a5531D9f8f571EebFa2",
    // "EXChangeNFT": "0x185CA680829Aad2107fA45a7B331D158b6ddD5b0",
    // "NFT": "0x0d33BD565454BF0227a44e81E36C38e9Fa27897e",
    // "Merge": "0x075bd4Db4AFbf3DC4A6e4CBBda07b1087926F276",
    // "Node": "0x53e6c37f5b333f2CFcF905B7EF2497990E591Dc0",
    // "Liquidity": "0x518a738deFb035DF07074b7CCaE18dAe28CDEa76",
    // "BurnFund": "0x757EE4C0C79B02196A46a8C198367a40465c6569",
    // "Pledge": "0x70dBFd4D11b5D1EA022AE56A246ac2b0370946B6",
    // "LandNFT": "0x1E08a1E3b9a7E29A6a8CC827bDf231B96ec89673",
    // "LandReward": "0xe5DDbCB209F6566bF73DFED17a29E8BE65EA9004",
    // "InviteReward": "0x983ca7414E4E2474d8E04e0ac7eD0789E45DbAc0",
    // "FundNode": "0x8dAA1c2E81F35e4De1F1301C4ca8634e879BF615",
    // "NodeDistribute": "0xC0821A15Cb45b9d11A5A316cCDD6E4501A2DA787",
    // v3
    "Token": "0x495411D684d06Ab95453C4376c2c34538bBCb651",
    "BlindBox": "0x759d7F72166503f8Ae22d38F33FFc719A6Efc6E6",
    "EXChangeNFT": "0x0d156E69426cBE8527D6b370E148ba0F6F911b18",
    "NFT": "0x23c402C48C50906a2F7760E805385CA187C55762",
    "Merge": "0x075bd4Db4AFbf3DC4A6e4CBBda07b1087926F276",
    "Node": "0xF66D5bDbe33681F90C4ce070f4AE5128DA341B03",
    "Liquidity": "0x67eA4B18ee62975aEa0b21eC793145268754c03B",
    "BurnFund": "0x1395Eb8CF44105d4F42F80e075Fd14747333C2EB",
    "Pledge": "0xa3666fe7Cf584ea7D0836c4b53cdDb9d3fdb0F89",
    "LandNFT": "0x5E29Eb812ee60281887FD48a0F7ac0e18b274542",
    "LandReward": "0x1f030EC1a30CBB3e5e351a7a0D71c9843B8c38aD",
    "InviteReward": "0x6DC795AA13334aB2Da19f4b11A420BdBb0127f52",
    "FundNode": "0xE593344a4dEeA65d85D79fB0E22ebCE11a4ab932",
    "NodeDistribute": "0xCFF8F1f9231a80876151A9B7621eB35fb7Bc75f2",
    "DestructBalance": "0x0000000000000000000000000000000000000000",
    // main
    // "Token": "0xC4a363834962f0eA3A92354D4e68549B11453ED4",
    // "BlindBox": "0x331Eae838aF092295eD5e6903af7Eb4b37e0D883",
    // "EXChangeNFT": "0x4D75D651D0E0B3e2937eb18A98f86387f037498f",
    // "NFT": "0x5Cff3e5556B04cBf164eFb54426E68199afa5B79",
    // "Merge": "0x075bd4Db4AFbf3DC4A6e4CBBda07b1087926F276",
    // "Node": "0x8D5E7c7a74964737b86B0926319354A50EDbf1D0",
    // "Liquidity": "0xd99Bc470934743f1bE0D5A50AB85f5dAf28F49AC",
    // "BurnFund": "0xf1C645d559907947EF8f93c2C058B035C7219c80",
    // "Pledge": "0x4De1081cB40038a7ceB3EE0fE484Ac59BF2CAf2C",
    // "LandNFT": "0x16F9663E61b45a607E7E699436D23c7e5b2A949c",
    // "LandReward": "0x9552AF28951807c616565b7C5B35264eD0ecf53d",
    // "InviteReward": "0x575480d74f16B2319b003Bc86164F4EA273c6920",
    // "FundNode": "0x0C1Fd02F0aba7A3C2bFB3a86B5B4e07157f802fe",
    // "NodeDistribute": "0x21C72004369288415208211D2680A6398DDA8065",
    // "DestructBalance": "0x0000000000000000000000000000000000000000",
}


