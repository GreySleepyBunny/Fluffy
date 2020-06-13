import React from "react";
import Chips from "../component/chips";
import { columnDefs } from "../common/dataDefs";

const Content = props => {
    return (
        <div
            className="card bg-light"
            style={{
                borderBottom: "solid",
                borderBottomColor: "#dcdcdc",
                borderWidth: "1px",
                marginBottom: "2em",
            }}>
            <div
                className="card-header"
                style={{
                    paddingTop: ".25rem",
                    height: "45px",
                    paddingBottom: 0,
                    background: "linear-gradient(#EFCECE, #C6B4B3)",
                    borderBottom: "solid",
                    borderBottomColor: "#a9a9a9",
                    borderWidth: "1px",
                }}>
                <div className="row justify-content-between">
                    <div style={{ padding: "0.375rem", fontWeight: 500 }}>
                        {`${props[columnDefs.date.col]} ${
                            props[columnDefs.time.col]
                        }`}
                    </div>
                    <a onClick={props.OnEdit}>
                        <i
                            className={Icons.edit}
                            style={{
                                marginRight: ".45em",
                                marginTop: ".65em",
                            }}></i>
                    </a>
                </div>
            </div>
            <div
                className="card-body"
                style={{
                    background:
                        "linear-gradient(to bottom right, #dcdcdc, #b0c4de)",
                }}>
                <img
                    src={`./img/${props[columnDefs.child.col]}.jpg`}
                    style={{
                        float: "right",
                        marginTop: "-10px",
                        marginRight: "-10px",
                        borderRadius: "10px",
                    }}
                />
                <div style={{ marginBottom: "1.5em" }}>
                    <h5>本次戰績</h5>
                    <div style={{ marginLeft: ".5em" }}>
                        <p style={{ marginBottom: ".5em", color: "#4F4F4F" }}>
                            <i
                                className={Icons.food}
                                style={{ marginRight: ".45em" }}></i>
                            {props[columnDefs.g.col]}g
                        </p>
                        <p style={{ marginBottom: ".5em", color: "#4F4F4F" }}>
                            <i
                                className={Icons.hot}
                                style={{ marginRight: ".45em" }}></i>
                            {props[columnDefs.calories.col]}
                        </p>
                        {/* <ProgressBar percent={50}/> */}
                    </div>
                </div>
                <div style={{ marginBottom: "1.5em" }}>
                    <h5>品牌</h5>
                    <div style={{ marginLeft: ".5em" }}>
                        <p style={{ marginBottom: ".5em", color: "#4F4F4F" }}>
                            {props[columnDefs.brand.col]}
                        </p>
                    </div>
                    {props[columnDefs.gel.col] ? (
                        <Chips
                            color={backColor.blue}
                            displayText={props[columnDefs.gel.col]}
                        />
                    ) : (
                        <Chips color={backColor.blue} displayText="膠類不明" />
                    )}
                    {props[columnDefs.flavor.col] ? (
                        <Chips
                            color={backColor.blue}
                            displayText={props[columnDefs.flavor.col]}
                        />
                    ) : (
                        <Chips color={backColor.blue} displayText="口味不明" />
                    )}
                    {props[columnDefs.foodType.col] ? (
                        <Chips
                            color={backColor.blue}
                            displayText={props[columnDefs.foodType.col]}
                        />
                    ) : (
                        <Chips
                            color={backColor.blue}
                            displayText="罐罐型態不明"
                        />
                    )}
                    {props[columnDefs.cereals.col] ? (
                        <Chips color={backColor.blue} displayText={"穀類"} />
                    ) : null}
                </div>
                <div style={{ marginBottom: "1.5em" }}>
                    <h5>反應</h5>
                    {props[columnDefs.like.col] ? (
                        <Chips
                            color={backColor.tomato}
                            icon={Icons.heart}
                            displayText={"喜歡"}
                        />
                    ) : (
                        <Chips
                            color={backColor.grey}
                            icon={Icons.dislike}
                            displayText={"厭惡"}
                        />
                    )}
                    {props[columnDefs.diarrhea.col] ? (
                        <Chips
                            color={backColor.grey}
                            icon={Icons.toilet}
                            displayText={"拉肚肚"}
                        />
                    ) : null}
                    {props[columnDefs.throwUp.col] ? (
                        <Chips
                            color={backColor.grey}
                            icon={Icons.throwUp}
                            displayText={"嘔吐"}
                        />
                    ) : null}
                </div>
                <div style={{ marginBottom: "1.5em", borderRadius: "0.25em" }}>
                    <h5>筆記</h5>
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: ".5em .8em",
                            color: "#4F4F4F",
                        }}>
                        {props[columnDefs.others.col]
                            ?.split("\n")
                            .map((item, i) => {
                                return (
                                    <p
                                        style={{ marginBottom: "0.5em" }}
                                        key={`others-${props.mainKey}-${i}`}>
                                        {item}
                                    </p>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Icons = {
    heart: "fas fa-heart",
    toilet: "fas fa-poo",
    dislike: "far fa-heart-broken",
    throwUp: "far fa-disease",
    food: "fas fa-utensils",
    hot: "fab fa-hotjar",
    delete: "fa fa-trash",
    edit: "fa fa-pencil",
};

const backColor = {
    blue: {
        backgroundColor: "#0099CC",
        color: "#fff",
    },
    tomato: {
        backgroundColor: "#ff6347",
        color: "#fff",
    },
    grey: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        color: "rgba(0, 0, 0, 0.6)",
    },
    brown: {
        backgroundColor: "#CC9966",
        color: "#fff",
    },
};

export default Content;
