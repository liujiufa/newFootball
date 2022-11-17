import Token from './ABI/ERC20Token.json';
import BlindBox from './ABI/BlindBox.json';
import EXChangeNFT from './ABI/EXChangeNFT.json';
import Merge from './ABI/Merge.json';
import NFT from './ABI/NFT.json';
import Node from './ABI/Node.json';
import Liquidity from './ABI/Liquidity.json';
// export let baseUrl: string = 'http://192.168.2.122:10000';
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
    "Token": "0xF316864BCcD05eb35670B4b649dAB7b26d825e54",
    "BlindBox": "0x748Dc7F2eE6844ac8D64bCDda5edB733d7a85821",
    "EXChangeNFT": "0xC34d42245b1bb9fc9cf55878718185E807CcdbA8",
    "NFT": "0xF8B48f9F7fC7DcC960402083D0B9A4D26DF14c0d",
    "Merge": "0xE49a04Db91b9965D850B98119b6cA4332Bd31fA6",
    "Node": "0x6062B25cFAAB9a5e784f78D86E6d2EBcF286fFa0",
    "Liquidity": "0x9F46cBC1FE2347EE29a5B136f0bdE20cB3AA5d15",
}