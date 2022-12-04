import React, { useEffect } from 'react'
import PubSub from 'pubsub-js';

import { createWebSocket, closeWebSocket, websocket } from '../utils/webSocket';

function Ws() {

    useEffect(() => {
        let url = "ws://123.207.136.134:9010/ajaxchattest";//服务端连接的url
        createWebSocket(url)
        let messageSocket: any = null;
        messageSocket = PubSub.subscribe('message', getMsg)
        //在组件卸载的时候，关闭连接
        return () => {
            PubSub.unsubscribe(messageSocket);
            closeWebSocket();
        }
    }, []);

    const sendMsg = () => {
        let msg = '发送消息'
        websocket && websocket.send(msg)
        console.log('ws发送')
    }

    const getMsg = (topic: any, message: any) => {
        console.log('ws获取：', message)
    }
    return (
        <div>
            <button onClick={sendMsg}>发送消息</button>
            <button onClick={closeWebSocket}>关闭连接</button>
        </div>
    )
}

// // create a function to subscribe to topics
// var mySubscriber = function (msg, data) {
//     console.log(msg, data);
// };

// // add the function to the list of subscribers for a particular topic
// // we're keeping the returned token, in order to be able to unsubscribe
// // from the topic later on
// var token = PubSub.subscribe('MY TOPIC', mySubscriber);

// // publish a topic asynchronously
// PubSub.publish('MY TOPIC', 'hello world!');

// // publish a topic synchronously, which is faster in some environments,
// // but will get confusing when one topic triggers new topics in the
// // same execution chain
// // USE WITH CAUTION, HERE BE DRAGONS!!!
// PubSub.publishSync('MY TOPIC', 'hello world!');



export default Ws