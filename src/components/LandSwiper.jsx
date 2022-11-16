
import React from 'react'
import { Layout } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative } from "swiper";
import landSwiper1 from '../assets/image/landSwiper1.png'
import landSwiper2 from '../assets/image/landSwiper2.png'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../assets/style/componentsStyle/LandSwiper.scss'


const SwiperTestPage = () => {
    const bannerImg = [
        { color: "black" },
        { color: "blue" },
        { color: "red" },
        { color: "green" },
        { color: "yellow" },
        { color: "blue" },
        { color: "black" },
        { color: "#ccc" },
    ]

    return (
        <Layout style={{ backgroundColor: '#ccc' }}>
            <div>

                <Swiper
                    pagination={{
                        dynamicBullets: true,//设置小圆点是否要两头小，中间最大
                        clickable: true,//设置是否可以点击
                    }}
                    loop={true}//设置循环轮播
                    className="mySwiper"
                    spaceBetween={-150}//设置堆叠轮播，item之间叠的距离
                    slidesPerView={5}//设置显示的数量
                    navigation={true}//modules上加了同时要设置为true，才显示
                    modules={[Navigation, Pagination, EffectCreative]}
                    grabCursor={true}
                    effect={"creative"}//modules上加了同时要设置
                    creativeEffect={{
                        prev: {
                            //这里是设置当前item的前一项的具体属性
                            translate: [-150, 0, 0],//偏移量
                            scale: 0.8,//缩放量
                            opacity: 0.8,//透明度
                            shadow: true,//是否加阴影
                        },
                        next: {
                            //这里是设置当前item的后一项的具体属性，同上面
                            translate: [150, 0, 0],
                            scale: 0.8,
                            opacity: 0.8,
                            shadow: true,
                        },
                        limitProgress: 2,//显示五个堆叠的最重要的这个属性，后面依次以前面属性等比配置
                        shadowPerProgress: true,//是否等比配置透明度
                    }}
                >
                    {bannerImg.map((item, index) => (
                        <SwiperSlide key={index} style={{ width: 300 }}>
                            <div
                                style={{ backgroundColor: item.color, width: 300, height: 300 }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


        </Layout>
    )

}
export default SwiperTestPage;