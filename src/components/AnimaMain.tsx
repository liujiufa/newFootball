import lottie, { AnimationItem } from 'lottie-web'
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import CardDJSON from "../anima/data.json"
import { debounce } from '../utils/debounce'
import BoxPng from "../assets/image/home/box.png"

const AnimaMain = styled.div<{ visable: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 0 none;
    display: ${({ visable }) => visable ? "flex" : "none"};
    background: rgba(0, 0, 0, .5);
`

const Anima = styled.div<{ visable: boolean }>`
    border: 0 none;
    width: 100%;
    height: 100%;
    display: ${({ visable }) => visable ? "flex" : "none"};
`

interface AnimaType {
    visable?: boolean,
}

export default function AnimaBox({ visable }: AnimaType) {
    const [stateLottie, setStateLottie] = useState<AnimationItem | null>(null)
    const [response, setResponse] = useState<any>(CardDJSON)
    const lottieRef = useRef<HTMLDivElement>(null)
    // const urlList = ["Common", "Package", "Medal/Medal"]

    useEffect(() => {
        if (!visable) {
            setStateLottie(null)
            setResponse(null)
        } else {
            setResponse(CardDJSON)
        }
    }, [visable])

    const animaCallback = useCallback(() => {
        if (visable) {
            if (!stateLottie && lottieRef && response) {
                setStateLottie(
                    lottie.loadAnimation({
                        container: lottieRef.current as HTMLElement,
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        animationData: response
                    })
                )
            }
        }
    }, [stateLottie, lottieRef, visable, response])

    useLayoutEffect(() => {
        if (visable && !!response) {
            debounce(animaCallback, 200)
        }
    }, [visable, response])

    const openBoxCallback = useCallback(
        () => {
            debounce(() => setResponse(CardDJSON), 200)
        },
        []
    )

    useEffect(() => {
        debounce(openBoxCallback, 100)
    }, [])
    return <Fragment>
        {/* <AnimaMain visable={!!visable} /> */}
        {!!visable && <Anima ref={lottieRef} visable={!!visable} > </Anima>}
    </Fragment>
}
