import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSplitArray, setInterval2, getNextIndex } from "../utils/CommonUtils";
import { MILLISEC, DIRECTION, DEFAULT_SPEED, DEFAULT_STEP } from "../utils/GlobalVir";

export default function Horizontal(props) {

    const { debug, direction, data, perWidth, displayCount, delayTime, scroll, height, space } = props;

    const { speed = DEFAULT_SPEED, step = DEFAULT_STEP } = scroll;

    const [index, setIndex] = useState(0);

    const domRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        start();
    }, [perWidth, data, delayTime, scroll.speed, scroll.step, direction])

    const updateIndex = () => {
        setIndex(idx => getNextIndex(data, idx, step, direction, debug));
    }

    const move = () => {
        const runCount = Math.round(speed / MILLISEC);
        const perMove = Math.round(perWidth * step / runCount);
        const dom = domRef.current;
        switch (direction) {
            case DIRECTION.LEFT:
                dom.style.left = "";
                break;
            case DIRECTION.RIGHT:
                dom.style.right = "";
                break;
            default: break;
        }
        setInterval2(() => {
            switch (direction) {
                case DIRECTION.LEFT:
                    dom.style.right = parseInt(dom.style.right) + perMove + "px";
                    break;
                case DIRECTION.RIGHT:
                    dom.style.left = parseInt(dom.style.left) + perMove + "px";
                    break;
                default: break;
            }

        }, MILLISEC, runCount, () => {
            updateIndex();
            switch (direction) {
                case DIRECTION.LEFT:
                    dom.style.right = - (step * perWidth) + "px";
                    break;
                case DIRECTION.RIGHT:
                    dom.style.left = - (step * perWidth) + "px";
                    break;
                default: break;
            }

        });
    }

    const stop = () => {
        if (timerRef && timerRef.current) {
            clearTimeout(timerRef.current.target);
        }
    }

    const start = () => {
        stop();
        timerRef.current = setInterval2(() => {
            move();
        }, delayTime);
    }

    const render = useMemo(() => {
        const showArray = getSplitArray(data, index, step, direction, displayCount, debug);
        return (
            showArray.map((item, idx) => {
                return (
                    <div
                        key={idx}
                        style={{ width: perWidth, height: height }}
                        className="item-container"
                    >
                        <div
                            className="item-content"
                            style={{ marginRight: space + "px" }}
                        >
                            {item}
                        </div>
                    </div>
                )
            })
        )
    }, [data, index, step, displayCount, perWidth, height, space, direction])



    return (
        <div
            className={`content ${direction}`}
            ref={domRef}
            onMouseEnter={stop}
            onMouseLeave={start}
            style={{
                left: direction === DIRECTION.RIGHT ? - (step * perWidth) + "px" : "",
                right: direction === DIRECTION.LEFT ? - (step * perWidth) + "px" : "",
            }}
        >
            {render}
        </div>
    )
}