
import React, { Component } from 'react'
import '../assets/style/componentsStyle/LandSwiperCopy.scss'
import landSwiper1 from '../assets/image/landSwiper1.png'
import landSwiper2 from '../assets/image/landSwiper2.png'
<Swiper slidesPerView={3}
    spaceBetween={30}
    centeredSlides={true}
    loop={true}
    loopFillGroupWithBlank={true}
    className="mySwiper"
    id="swiper-nft-pc"
    slideToClickedSlide
    onSlideChangeTransitionEnd={(s) => {
        if (nftIdo[s.realIndex]?.type && nftIdo[s.realIndex]?.url) {
            setNftType(nftIdo[s.realIndex]?.type)
            setInfoImg(nftIdo[s.realIndex]?.url)
        }
    }}
>
    {
        nftIdo.map((item, idx) => <SlideItem >
            idx
        </SlideItem>)
    }
</Swiper>