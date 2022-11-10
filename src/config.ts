import Token from './ABI/ERC20Token.json';
import BlindBox from './ABI/BlindBox.json';
import EXChangeNFT from './ABI/EXChangeNFT.json';
import Merge from './ABI/Merge.json';
import NFT from './ABI/NFT.json';
import Node from './ABI/Node.json';
// export let baseUrl:string = 'http://192.168.2.36:10000';
// export let baseUrl:string = 'http://47.107.116.172:10000';
export let baseUrl: string = 'http://spaceballgames.com:10000';
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
}
export const contractAddress: contractAddressType = {
    //正式
    "Token": "0x55d398326f99059fF775485246999027B3197955",
    "BlindBox": "0xb6B4b59d8105C132e3892d1B4cB1FE573BBaE995",
    "EXChangeNFT": "0x321b5981a0bB2c919DD8581cAD8a61ABAD924727",
    "NFT": "0x86C94d3F18D0cb355916705EeDB0bB4329C23b41",
    "Merge": "0xAe450cb7A03E1C181B7379712F0C81b5609384cE",
    "Node": "0x8961a1a9e21B03219C8fC72b3fD20fA2f9e71d8E"
    //测试
    // "Token": "0xdB8001f7133F5a317AAf43CAB0dD3EEDa2e275ca",
    // "BlindBox": "0xc25E9B5412501794FC1023F7c9359B750dd4ec06",
    // "EXChangeNFT": "0x3d81D122A568CCde84dF3E65f9a6a4c158bb9e16",
    // "NFT": "0x1B57103eD624bA5aBeA0E8Eeb02f616372C8AAbf",
    // "Merge": "0xCAB778AB656f2d598C05fE6af1e1f3F30D3fE567",
    // "Node": "0x54df87C2ed83Ee12aE8a53cC58EcF6aa55Ef2172"
}