import React, { Component } from 'react';
import '../assets/style/componentsStyle/LandSwiper.scss'

import banner1 from '../assets/image/landSwiper1.png'
import banner2 from '../assets/image/landSwiper1.png'
import banner3 from '../assets/image/landSwiper1.png'
import banner4 from '../assets/image/landSwiper1.png'


import Swiper from 'swiper';

class Banner extends Component {

    constructor(props) {

        super(props)

        this.state = {

            bannerImg: [banner1, banner2, banner3]

        }

    }

    componentDidMount() {

        this.swiper = new Swiper('.banner', {

            watchSlidesProgress: true,

            loopedSlides: 7,

            autoplay: {

                delay: 1000

            },

            loop: true,

            pagination: {

                el: '.page',

                clickable: true

            },

            navigation: {

                nextEl: '.swiper-button-next',

                prevEl: '.swiper-button-prev',

            },

            on: {

                progress: function (progress) {

                    for (let i = 0; i < this.slides.length; i++) {

                        console.log(this.slides)

                        console.log(this.slides.length)

                        var slide = this.slides.eq(i);

                        var slideProgress = this.slides[i].progress;

                        if (Math.abs(slideProgress) > 1) {

                            var modify = (Math.abs(slideProgress) - 1) * 0.4 + 1;

                        }

                        let translate = slideProgress * modify * 950 + 'px';

                        let scale = 1 - Math.abs(slideProgress) / 5;

                        let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));

                        slide.transform('translateX(' + translate + ') scale(' + scale + ')');

                        slide.css('zIndex', zIndex);

                        slide.css('opacity', 1);

                        if (Math.abs(slideProgress) > 3) {

                            slide.css('opacity', 0);

                        }

                    }

                },

                setTransition: function (transition) {

                    for (var i = 0; i < this.slides.length; i++) {

                        var slide = this.slides.eq(i)

                        slide.transition(transition);

                    }



                }

            }

        })

    }

    render() {

        let { bannerImg } = this.state;

        let $bannerimg = bannerImg && bannerImg.map((v, i) => {

            return <div key={i} className='swiper-slide'>

                <img src={v} alt="" />

            </div>

        })

        return (

            <div className='banner swiper-container'>

                <div className='swiper-wrapper wrap'>

                    {$bannerimg}

                </div>

                <div className='page swiper-pagination'></div>

                <div className='btn'>

                    <div className='swiper-button-prev'></div>

                    <div className='swiper-button-next'></div>

                </div>

            </div>

        )

    }

}
export default Banner;
