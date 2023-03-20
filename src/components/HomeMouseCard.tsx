import { useRef } from "react"
import styled from "styled-components"

const Container = styled.div`
`

const Content = styled.div<{ shifting?: number }>`
    position: absolute;
    width: 300px;
    top: ${({ shifting }) => shifting ? -shifting + "px" : "0"};
    left: 50%;
    z-index: 99;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Card = styled.div`
    width: 100%;
    padding: 24px 16px;
    border-radius: 0px 0px 24px 0px;
    background-color: #0EC965;
`

const TitleGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    font-family: 'Impact';
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    letter-spacing: 0.055em;
    color: #006B32;
    white-space: nowrap;
    font-weight: 700;
    padding: 0 4px;
`

const ViceTitle = styled(Title)`
    font-family: 'Impact';
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    letter-spacing: 0.055em;
    color: #006B32;
`

const Text = styled.div`
    font-family: 'DIN';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    color: #006B32;
    margin-top: 20px;
`

const Sensing = styled.div`
    background-color: #0EC965;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    rotate: 45deg;
    width: 24px;
    height: 24px;
`

interface HomeMouseCardType {
    title: string,
    content: string[],
    viceTitle?: string,
    cardClassName?: string
    className?: string
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
}

export default function HomeMouseCard({
    title,
    viceTitle,
    content,
    cardClassName,
    className,
    onMouseEnter
}: HomeMouseCardType) {
    const ref = useRef<HTMLDivElement | null>(null)

    return (
        <Container onMouseEnter={onMouseEnter} className={`habits-process-first-base ${className || ""}`}>
            <Content className="habits-process-second-mouse-card" shifting={ref?.current?.clientHeight} >

                <Card ref={ref} className={cardClassName || ""} >

                    <Sensing />
                    <TitleGroup>
                        <Title>{title}</Title>
                        <ViceTitle>{viceTitle}</ViceTitle>
                    </TitleGroup>
                    {
                        content.map((item) => <Text>{item}</Text>)
                    }
                </Card>
            </Content>


        </Container>
    )
}
