import React from "react";

const ProgressBar = props => {
    return (
        <div className="progress" style={{ margin: "0.8em 0", height: "2em" }}>
            <div
                className="progress-bar"
                role="progressbar"
                style={{
                    width: props.percent + "%",
                    backgroundColor: "#339966",
                }}
                aria-valuenow={props.percent}
                aria-valuemin="0"
                aria-valuemax="100">
                <span>{props.percent}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
