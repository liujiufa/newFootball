
import React, { Component } from 'react'
import '../assets/style/componentsStyle/LandSwiperCopy.scss'
import landSwiper1 from '../assets/image/landSwiper1.png'
import landSwiper2 from '../assets/image/landSwiper2.png'
export default class CardCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [landSwiper1, landSwiper1, landSwiper1, landSwiper1, landSwiper1, landSwiper1],
            current: 1, // 轮播图当前 index
            itemWidth: 0, //  图片区域 宽度
            out: 3,  // 堆叠式 外部看到的数量 （左右各相同） 不限制 可以设置 0 或 大于轮播图数量
            offset: 425 / 2, // 堆叠式 外部偏移量 (产生堆叠效果)
        }
    }
    componentDidMount() {
        // 获取轮播图片区域宽度
        const width = 1200
        this.setState({
            itemWidth: width
        })
    }
    // 上一张
    onPrev = (index) => {
        const length = this.state.list.length
        if (index - 1 < 0) {
            this.setState({
                current: length - 1
            })
        } else {
            this.setState({
                current: index
            })
        }
    }
    // 下一张
    onNext = (index) => {
        const length = this.state.list.length
        if (index + 1 === length) {
            this.setState({
                current: 0
            })
        } else {
            this.setState({
                current: index + 1
            })
        }
    }
    render() {
        let { list, current, itemWidth, out, offset } = this.state
        // 水平式   计算轮播区整体位移
        let x = current === 0 ? 0 : - current * itemWidth + 'px'
        const translateX = `translateX(${x})`
        return (
            <div className="card-carousels">
                {/* 层叠卡片式 */}
                <h3>层叠式</h3>
                <div className='wrapper'>
                    <div className='inner'>
                        <div className='swiper2'>
                            {
                                list.map((item, index) => {
                                    // 层叠式 计算各张图片 translateX scale  z-index 产生堆叠效果
                                    let transform = 'none'
                                    let zIndex = 0
                                    if (out ? index < current && current - index <= out : index < current) {
                                        // 左边 堆叠
                                        zIndex = index + 1
                                        transform = `translateX(${(index - current) * offset}px) scale(${1 - (current - index) * 0.1})`
                                    } else if (out ? index > current && index - current <= out : index > current) {
                                        // 右边 堆叠
                                        zIndex = list.length - index
                                        transform = `translateX(${(index - current) * offset}px) scale(${1 - (index - current) * 0.1})`
                                    } else if (index === current) {
                                        // 当前图片
                                        zIndex = list.length
                                    }
                                    return (
                                        <div className='swiper-item' key={index} style={{ transform: transform, zIndex: zIndex }} onClick={() => this.onPrev(index)}>
                                            <div className="landImg">
                                                <img src={item} alt="" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="swiperTitle">
                            <div className="title">優秀品質土地</div>
                            <div className="tip">申領資格：合成良好的徽章 NFT</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}