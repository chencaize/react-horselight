import React, { useEffect, useMemo, useRef, useState } from "react";
import propTypes from "prop-types";
import { Normal, Left, Right } from "./components";
import { DIRECTION } from "./utils";
import cx from "classnames";
import "./index.less";

function HorseLight(props) {

    const { className, data, space, direction, height, width, displayCount, delayTime, scroll } = props;

    const mainRef = useRef(null);

    const [actualWidth, setActualWidth] = useState(null);

    useEffect(() => {
        if (mainRef && mainRef.current && mainRef.current.clientWidth) {
            const actualWidth = parseInt(mainRef.current.clientWidth);
            setActualWidth(actualWidth);
        }
    }, [mainRef.current])

    const render = useMemo(() => {
        if (actualWidth === undefined || actualWidth === null) {
            return <div></div>
        }
        //get the actualWidth , render the element
        const perWidth = parseInt(actualWidth / displayCount);//every display item's width
        if (data.length <= displayCount) {
            return <Normal data={data} perWidth={perWidth} height={height} space={space}></Normal>
        } else {
            if (direction === DIRECTION.LEFT) {
                return <Left data={data} perWidth={perWidth} scroll={scroll} displayCount={displayCount} delayTime={delayTime} height={height} space={space}></Left>
            } else {
                return <Right data={data} perWidth={perWidth} scroll={scroll} displayCount={displayCount} delayTime={delayTime} height={height} space={space}></Right>
            }
        }
    }, [direction, space, actualWidth, displayCount, delayTime, data, scroll.speed, scroll.step, height])

    return (
        <div
            ref={mainRef}
            className={cx("HorseLight", className)}
            style={{ width: width, height: height }}
        >
            {render}
        </div>
    )
}

HorseLight.propTypes = {
    className: propTypes.string,//自定义类名
    data: propTypes.array,//要展示的数据
    space: propTypes.number,//每个元素的间隔
    direction: propTypes.string,//移动方向 left|right
    delayTime: propTypes.number,//延迟时间 ms
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),//容器高度
    width: propTypes.oneOfType([propTypes.number, propTypes.string]),//容器宽度
    displayCount: propTypes.number,//展示区域个数
    scroll: propTypes.shape({
        speed: propTypes.number,//单次移动速度 ms
        step: propTypes.number,//单次移动步长
    })
}

HorseLight.defaultProps = {
    data: [],
    space: 10,
    direction: DIRECTION.LEFT,
    delayTime: 5000,
    height: "100%",
    width: "100%",
    displayCount: 4,
    scroll: {
        speed: 1000,
        step: 1,
    }
}

export default HorseLight;