import React, { useState, useEffect, Component } from "react";
import SettingPage from "./setting";
import { PreLoader } from "../component/preloader";
import { container, btn } from "../style/css";
import { IsMobile } from "../common/common";
import Content from "./content";
import {
    api_GetData,
    api_InsertData,
    api_UpdateData,
    api_DeleteData,
} from "../api/api";
import moment from "moment";

const page = {
    main: "main",
    edit: "edit",
};

const Panel = () => {
    const [stateDatas, updateDatas] = useState({
        datas: [],
        page: page.edit,
        processing: true,
        isEdit: false,
        idx: null,
    });

    useEffect(() => {
        GetData();
    }, []);

    const GetData = () => {
        api_GetData("Meow").then(res => {
            let result = res.val();
            let datas = [];
            result &&
                Object.keys(result).forEach(k => {
                    return Object.keys(result[k]).forEach(d => {
                        datas.push({
                            ...result[k][d],
                            key: `${k}/${d}`,
                        });
                    });
                });

            datas = datas.sort((a, b) => {
                return a > b ? 1 : -1;
            });

            updateDatas(prevState => ({
                ...prevState,
                datas: datas,
                processing: false,
                page: page.main,
                isEdit: false,
                idx: null,
            }));
        });
    };

    const HandlePage = _page => {
        if (!stateDatas.processing) {
            updateDatas(prevState => ({
                ...prevState,
                page: _page,
                isEdit: false,
                idx: null,
            }));
        }
    };

    const OnSubmit = datas => {
        updateDatas(prevState => ({
            ...prevState,
            processing: true,
        }));

        if (stateDatas.isEdit) {
            let curr_data = stateDatas.datas[stateDatas.idx];
            api_UpdateData("Meow", curr_data.key, {
                ...datas,
                lastEditTime: moment().unix(),
            }).then(() => {
                GetData();
            });
        } else {
            api_InsertData("Meow", datas).then(() => {
                GetData();
            });
        }
    };

    const OnEdit = idx => {
        updateDatas(prevState => ({
            ...prevState,
            page: page.edit,
            isEdit: true,
            idx: idx,
        }));
    };

    const OnDelete = () => {
        if (window.confirm("你確定要刪?")) {
            updateDatas(prevState => ({
                ...prevState,
                processing: true,
            }));

            let curr_data = stateDatas.datas[stateDatas.idx];
            api_DeleteData("Meow", curr_data.key).then(() => {
                GetData();
            });
        }
    };

    let contentPanel = null;
    if (stateDatas.page === page.main) {
        let body =
            stateDatas &&
            stateDatas.datas.map((d, idx) => {
                return (
                    <Content
                        key={`r-${d.key}`}
                        mainKey={`r-${d.key}`}
                        {...d}
                        OnEdit={OnEdit.bind(this, idx)}
                    />
                );
            });

        contentPanel =
            stateDatas && stateDatas.datas ? (
                <>
                    <div style={{ marginBottom: "20px" }}>
                        <button
                            type="button"
                            className="btn"
                            style={btn.primary}
                            onClick={HandlePage.bind(null, page.edit)}>
                            新增
                        </button>
                    </div>
                    {body}
                </>
            ) : (
                <PreLoader IsMobile={IsMobile()} />
            );
    } else {
        contentPanel = (
            <SettingPage
                IsMobile={IsMobile()}
                ClickBack={HandlePage.bind(null, page.main)}
                ClickSubmit={OnSubmit}
                processing={stateDatas.processing}
                IsEdit={stateDatas.isEdit}
                Datas={
                    stateDatas.isEdit ? stateDatas.datas[stateDatas.idx] : null
                }
                ClickDelete={OnDelete}
            />
        );
    }

    return <div style={container}>{contentPanel}</div>;
};

export default Panel;
