import { DIRECTION } from "./GlobalVir";

function getSplitArray(array, index, moveStep, direction, windowCount) {
    let result = [];

    if (!array) return result;

    let arrayLength = array.length;

    if (direction === DIRECTION.LEFT) {
        for (let i = 0; i < windowCount + moveStep; i++) {
            let tempIdx = index + i;
            while (tempIdx > arrayLength - 1) tempIdx -= arrayLength;
            result.push(array[tempIdx]);
        }
    } else if (direction === DIRECTION.RIGHT) {
        //往前获取
        for (let i = moveStep; i > 0; i--) {
            let tempIdx = index - i;
            while (tempIdx < 0) tempIdx += arrayLength;
            result.push(array[tempIdx]);
        }

        //往后获取
        for (let i = 0; i < windowCount; i++) {
            let tempIdx = index + i;
            while (tempIdx > arrayLength - 1) tempIdx -= arrayLength;
            result.push(array[tempIdx]);
        }
    }

    return result;
}

function getNextIndex(array, index, moveStep, direction) {

    if (!array) return index;

    let result = index;
    let arrayLength = array.length;

    if (direction === DIRECTION.LEFT) {
        result += moveStep;
        while (result > arrayLength - 1) result -= arrayLength;
    } else if (direction === DIRECTION.RIGHT) {
        result -= moveStep;
        while (result < 0) result += arrayLength;
    }

    return result;
}

function setInterval2(fn, millisec, maxRunTimes, lastRunTimeFn) {
    let res = {
        target: "",//使用引用类型确保每次id都是最新
    };
    let curCount = 0;
    function interval() {
        if (maxRunTimes) {
            if (curCount < maxRunTimes) {
                res.target = setTimeout(interval, millisec);
                fn();
                if (curCount === maxRunTimes - 1 && typeof lastRunTimeFn === "function") {
                    lastRunTimeFn();
                }
                curCount++;
            }
        } else {
            res.target = setTimeout(interval, millisec);
            fn();
        }
    }
    res.target = setTimeout(interval, millisec);
    return res;
}

export { getSplitArray, getNextIndex, setInterval2 }