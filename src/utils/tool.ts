import dayjs from 'dayjs'
import store from "../store";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { createAddMessageAction, createSetLodingAction } from '../store/actions'
import relativeTime from 'dayjs/plugin/relativeTime'
import BigNumber from 'big.js'
export function toThousands(num: string) {
    let numArr = num.split('.')
    if (numArr.length > 1) {
        return parseFloat(numArr[0]).toLocaleString() + '.' + numArr[1]
    } else {
        return parseFloat(numArr[0]).toLocaleString()
    }
}
//用户地址处理方法
export function AddrHandle(addr: string, start = 4, end = 4, replace = "..."): string | undefined {
    if (!addr) { return }
    let r = new RegExp('(.{' + start + '}).*(.{' + end + '})');
    let addrArr: RegExpMatchArray | null = addr.match(r)
    return addrArr![1] + replace + addrArr![2]
}
export function HowLongAgo(time: number) {
    dayjs.extend(relativeTime)
    var a = dayjs()
    return a.to(new Date(time))
}

export function GetQueryString(name: string) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // console.log(window.location)
    var r = window.location.search.slice(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

export function JudgmentNumber(number: string) {
    let numArr = number.split(".")
    if (numArr.length > 1) {
        return numArr[1].length > 18
    }
    return false
}
// 不四舍五入
export function NumSplic(val: string, len: number) {
    var f = parseFloat(val);
    if (isNaN(f)) {
        return false;
    }
    var s = val.toString();
    if (s.indexOf(".") > 0) {
        let f = s.split(".")[1].substring(0, len)
        s = s.split(".")[0] + "." + f
    }
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + len) {
        s += '0';
    }
    return s;
}
// 截断小数（不四舍五入）
export function getBit(value: number, bit = 5) {
    let str = value.toString();
    let strIndex = str.indexOf('.');
    if (strIndex === -1) return str;
    str = str.substring(0, strIndex + bit);
    // console.log(str, bit);
    // console.log(typeof str,'getBit值')    
    return str;
}

export function numberDivision() {

}
export function showLoding(isShow: boolean) {
    store.dispatch(createSetLodingAction(isShow))
}
export function addMessage(msg: string) {
    store.dispatch(createAddMessageAction({
        message: msg,
        index: store.getState().message.length
    }))
}
export function isApprove(price: number | string, Approve: string) {
    return new BigNumber(Approve).gte(price)
}
export function dateFormat(fmt: string, date: Date) {
    let ret;
    const opt: { [key: string]: string } = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}
export function getFullNum(num: number) {
    //处理非数字
    if (isNaN(num)) { return num };

    //处理不需要转换的数字
    var str = '' + num;
    if (!/e/i.test(str)) { return num; };

    return (num).toFixed(18).replace(/\.?0+$/, "");
}

//订阅数据send模式
export function initWebSocket(url: string, subscribe: string, sendUrl: string, data: any, callback: any,) {
    console.log(data, 'data');
    let stompClient: any;
    let sendTimer
    let socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        stompClient.subscribe(subscribe, (data: any) => {
            var resdata = JSON.parse(data.body)
            callback(resdata)
        })
        sendTimer = setInterval(() => {
            console.log(data);
            stompClient.send(sendUrl,
                { 'Content-Type': 'application/json;charset=UTF-8' },
                JSON.stringify({ ...data }),
            )
        }, 2000)
    }, function () {
    });
    stompClient.ws.onclose = function () {
    };
    return { stompClient, sendTimer }
}
export function getWebsocketData(url: string, subscribe: string, callback: any) {
    console.log(url, subscribe);
    var stompClient: any;
    var socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
        stompClient.subscribe(subscribe, function (data: any) {
            console.log(data.body);
            callback(JSON.parse(data.body))
        })

    }, function () {
    });
    stompClient.ws.onclose = function () {
    };
    return stompClient
}

// export function debounce(tarFun: Function, delay: number, immed: boolean) {
//     let timer: number | null = null
//     let immeBool = immed
//     return function () {
//         let Arguments = arguments
//         const _that = this
//         if (timer) {
//             clearTimeout(timer)
//         }
//         if (immeBool) {
//             immeBool = false
//             tarFun.apply(_that, arguments)
//         } else {
//             timer = window.setTimeout(() => {
//                 timer = null
//                 tarFun.apply(_that, Arguments)
//             }, delay)
//         }
//     }
// }