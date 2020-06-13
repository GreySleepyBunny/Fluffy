import React from "react";
import chip from "./chips.style";

const Chips = props => {
    return (
        <div style={{ ...chip, ...props.color }}>
            {props.icon ? <i className={props.icon}></i> : null}
            <span style={props.icon ? { paddingLeft: ".6em" } : {}}>
                {props.displayText}
            </span>
        </div>
    );
};

export default Chips;
