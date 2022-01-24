import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSplitArray, setInterval2, getNextIndex, DIRECTION, MILLISEC } from "../utils";

export default function Right(props) {

    const { data, perWidth, displayCount, delayTime, scroll, height, space } = props;

    const { speed, step } = scroll;

    const [index, setIndex] = useState(data.length - displayCount);

    const domRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval2(() => {
            move();
        }, delayTime);

        return () => {
            clearTimeout(timerRef.current.target);
        }
    }, [perWidth, data, delayTime, scroll.speed, scroll.step])

    const move = () => {
        const runCount = Math.round(speed / MILLISEC);
        const perMove = Math.round(perWidth * step / runCount);
        const dom = domRef.current;
        setInterval2(() => {
            let oldLeft = parseInt(dom.style.left);
            dom.style.left = oldLeft + perMove + "px";
        }, MILLISEC, runCount, () => {
            updateIndex();
            dom.style.left = - (step * perWidth) + "px";
        });
    }

    const updateIndex = () => {
        setIndex(idx => getNextIndex(data, idx, step, DIRECTION.RIGHT));
    }

    const onMouseEnter = () => {
        clearTimeout(timerRef.current.target);
    }

    const onMouseLeave = () => {
        timerRef.current = setInterval2(() => {
            move();
        }, delayTime);
    }

    const render = useMemo(() => {
        const showArray = getSplitArray(data, index, step, DIRECTION.RIGHT, displayCount);
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
    }, [data, index, step, displayCount, perWidth, height, space])

    return (
        <div
            className="content right"
            ref={domRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                left: - (step * perWidth) + "px"
            }}
        >
            {render}
        </div>
    )
}