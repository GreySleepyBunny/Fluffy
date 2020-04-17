import React, {useState, useEffect} from 'react';
import {apiUrl, sheetName} from '../common/dataDefs';
import $ from 'jquery';
import moment from 'moment';
import SettingPage from './setting';
import { PreLoader } from "../component/preloader";

const IsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const page = {
    main:'main',
    add:'add'
}

const Panel = (props)=>{
    const [stateDatas, updateDatas] = useState({
        page:page.main,
        processing:false
    });
    let dataUrl = `https://docs.google.com/spreadsheets/d/${props.d}/edit#gid=0`;
    useEffect(()=>{
        let param = {
            startRow:1,
            startColumn:1,
            url: dataUrl,
            sheetName: sheetName.Food,
            getAll:true
        }

        $.get(apiUrl.get, param, (data)=>{
            updateDatas({
                ...stateDatas,
                ...JSON.parse(data)
            });
        });
    },[]);

    const ClickDel = (idx)=>{
        alert('呵呵...還沒做');
    }

    const ClickEdit = (idx)=>{
        alert('那個...這個還沒做...');
    }

    const HandlePage = (page)=>{
        if(!stateDatas.processing){
            updateDatas({...stateDatas, page:page});
        }
    }

    const OnAdd = (newDatas)=>{
        updateDatas({
            ...stateDatas,
            processing:true
        });

        let numColumns = 0;
        let newD = {};
        let datas = Object.keys(newDatas).map((k, idx)=>{
            let v = '';
            switch (typeof(newDatas[k])){
                case 'string':
                    v = newDatas[k]
                    break;
                case 'boolean':
                    v = newDatas[k] === true ? "是" : "否";
                    break;
                default:
                    v = `${newDatas[k]}`;
            }

            newD[`v-${idx}`] = v;
            numColumns++; 
            return v;
        });
        let param = {
            typeName:'add',
            row:5,
            column:1,
            numColumns:numColumns,
            url: dataUrl,
            sheetName: sheetName.Food,
            ...newD
        }

        $.get(apiUrl.set, param, (data)=>{
            updateDatas({
                ...stateDatas,
                datas:[
                    ...stateDatas.datas,
                    [...datas]
                ],
                page:page.main,
                processing:false
            })
        });
    }

    if(stateDatas.page === page.main){
        let header = [];
        let body = [];
        if(stateDatas && stateDatas.datas){
            stateDatas.datas.forEach((row, idx) => {
                let tmpBody = [];
                row.forEach((r, rIdx)=>{
                    let key = `r-${idx}-${rIdx}`;
                    if(idx===0){
                        header.push(
                            <th scope="col" key={key}>{r}</th>
                        );
                    }else{
                        let displayValue = rIdx === 0 ? moment(r).format('l') : r;
                        tmpBody.push(
                            <td key={key}>{displayValue}</td>
                        );
                    }
                });
                
                if(tmpBody.length !== 0){
                    let actionBtnStyle = IsMobile ? {marginBottom:'5px'} : {marginRight:'6px'};
                    body.push(
                        <tr key={`r-${idx}`}>
                            {tmpBody}
                            <td>
                                <button style={{width:'40px', ...actionBtnStyle }} className="btn btn-outline-primary" onClick={ClickEdit}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button style={{width:'40px'}} className="btn btn-outline-primary" onClick={ClickDel}>
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    );
                }
            });
        }
    
        return stateDatas && stateDatas.datas ? (
            <div style={{margin:'10px'}}>
                <div style={{marginBottom:'20px'}}>
                <button type="button" className="btn btn-primary" onClick={HandlePage.bind(null, page.add)}>新增</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            {header}
                            <th>更動</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
            
        ) : <PreLoader IsMobile={IsMobile}/>
    }else{
        return <SettingPage ClickBack={HandlePage.bind(null, page.main)} ClickSubmit={OnAdd} processing={stateDatas.processing}/>
    }
}

export default Panel;