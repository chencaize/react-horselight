import React from "react";

export default function Normal(props) {

    const { data, perWidth, height, space } = props;

    return (
        <div className="content normal">
            {
                data.map((item, idx) => {
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
            }
        </div>
    )
}