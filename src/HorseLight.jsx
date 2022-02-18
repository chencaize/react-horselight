import React, { useMemo, useRef } from "react";
import { Normal, Horizontal } from "./components";
import { useSize } from "ahooks";
import {
    DIRECTION,
    DEFAULT_CLASSNAME,
    DEFAULT_DATA,
    DEFAULT_SPACE,
    DEFAULT_DIRECTION,
    DEFAULT_DELAYTIME,
    DEFAULT_HEIGHT,
    DEFAULT_WIDTH,
    DEFAULT_DISPLAYCOUNT,
    DEFAULT_SPEED,
    DEFAULT_STEP,
} from "./utils/GlobalVir";
import propTypes from "prop-types";
import cx from "classnames";
import "./index.less";

function HorseLight(props) {

    const { debug, className, data, space, direction, height, width, displayCount, delayTime, scroll } = props;

    if (debug === true) console.debug("[HorseLight]", props);

    const mainRef = useRef(null);
    const size = useSize(mainRef);

    const render = useMemo(() => {
        const { width: actualWidth } = size || {};
        if (actualWidth === undefined || actualWidth === null) {
            return <div></div>
        }
        const perWidth = parseInt(actualWidth / displayCount);//every display item's width

        if (data.length <= displayCount) {
            if (debug === true) console.debug("[HorseLight] render:normal,perWidth-",perWidth);
            return <Normal data={data} perWidth={perWidth} height={height} space={space} debug={debug}></Normal>
        } else {
            if (debug === true) console.debug("[HorseLight] render:",direction,"perWidth-",perWidth);
            if (direction === DIRECTION.LEFT || direction === DIRECTION.RIGHT) {
                return <Horizontal direction={direction} data={data} perWidth={perWidth} scroll={scroll} displayCount={displayCount} delayTime={delayTime} height={height} space={space} debug={debug}></Horizontal>
            }
        }
    }, [direction, space, size, displayCount, delayTime, data, scroll.speed, scroll.step, height])

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
    debug: propTypes.bool,
    className: propTypes.string,
    data: propTypes.array,
    space: propTypes.number,
    direction: propTypes.string,
    delayTime: propTypes.number,
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),
    width: propTypes.oneOfType([propTypes.number, propTypes.string]),
    displayCount: propTypes.number,
    scroll: propTypes.shape({
        speed: propTypes.number,
        step: propTypes.number,
    })
}

HorseLight.defaultProps = {
    debug: false,
    className: DEFAULT_CLASSNAME,
    data: DEFAULT_DATA,
    space: DEFAULT_SPACE,
    direction: DEFAULT_DIRECTION,
    delayTime: DEFAULT_DELAYTIME,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    displayCount: DEFAULT_DISPLAYCOUNT,
    scroll: {
        speed: DEFAULT_SPEED,
        step: DEFAULT_STEP,
    }
}

export default HorseLight;