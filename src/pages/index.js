import React, {useState, useEffect} from 'react';
import {apiUrl, sheetName} from '../common/dataDefs';
import $ from 'jquery';
import moment from 'moment';
import SettingPage from './setting';
import { PreLoader } from "../component/preloader";
import {container, chip, btn} from '../style/css';
import {columnDefs} from '../common/dataDefs';

const IsMobile = ()=>{
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};;

const page = {
    main:'main',
    add:'add'
}

const headers = ()=>{
    let r = {};
    Object.keys(columnDefs).forEach((k, i)=>{
        r[i] = columnDefs[k].col
    });

    return r;
};

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
        let colIdx = {};
        Object.keys(columnDefs).forEach((k, idx)=>{
            colIdx[columnDefs[k].col] = idx;
        });

        let datas = [];
        Object.keys(newDatas).forEach((k, idx)=>{
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
            
            newD[`v-${colIdx[k]}`] = v;
            numColumns++;
            datas.splice(colIdx[k], 0, v);
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

    let contentPanel = null;
    if(stateDatas.page === page.main){
        const _header = headers();
        let body = [];
        if(stateDatas && stateDatas.datas){
            stateDatas.datas.forEach((row, idx) => {
                let tmpBody = {};
                row.forEach((r, rIdx)=>{
                    if(idx!==0){
                        tmpBody[_header[rIdx]] = rIdx === 0 ? moment(r).format('l') : r;
                    }
                });
                
                if(idx!==0){
                    body.push(
                        <Content
                            key={`r-${idx}`}
                            mainKey={`r-${idx}`}
                            {...tmpBody}
                        />
                    );
                }
            });
        }
    
        contentPanel = stateDatas && stateDatas.datas ? (
            <>
                <div style={{marginBottom:'20px'}}>
                    <button type="button" className="btn" style={btn.primary} onClick={HandlePage.bind(null, page.add)}>新增</button>
                </div>
                {body}
            </>
        ) : <PreLoader IsMobile={IsMobile()}/>
    }else{
        contentPanel = <SettingPage IsMobile={IsMobile()} ClickBack={HandlePage.bind(null, page.main)} ClickSubmit={OnAdd} processing={stateDatas.processing}/>
    }

    return (
        <div style={container}>
            {contentPanel}
        </div>
    )
}

const Content = (props)=>{
    return(
        <div className="card bg-light" style={{
            borderBottom:'solid',
            borderBottomColor :'#dcdcdc',
            borderWidth:'1px',
            marginBottom:'2em'
        }}>
            <div className="card-header" style={{
                    paddingTop:'.25rem', height:'45px', paddingBottom:0,
                    background: 'linear-gradient(#EFCECE, #C6B4B3)',
                    borderBottom:'solid',
                    borderBottomColor :'#a9a9a9',
                    borderWidth:'1px'
                }}>
                <div className="row justify-content-between">
                <div style={{padding:'0.375rem', fontWeight:500}}>{props[columnDefs.date.col]}</div>
                    <div>
                        <button type="button" className="btn"><i className="fas fa-ellipsis-h"></i></button>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{background: 'linear-gradient(to bottom right, #dcdcdc, #b0c4de)'}}>
                <div style={{marginBottom:'1.5em'}}>
                    <h5>今日戰績</h5>
                    <div style={{marginLeft:'.5em'}}>
                        <p style={{marginBottom:'.5em', color:'#4F4F4F'}}>
                            <i className={Icons.food} style={{marginRight:'.45em'}}></i>{props[columnDefs.g.col]}g
                        </p>
                        <p style={{marginBottom:'.5em', color:'#4F4F4F'}}>
                            <i className={Icons.hot} style={{marginRight:'.45em'}}></i>{props[columnDefs.calories.col]}
                        </p>
                        {/* <ProgressBar percent={50}/> */}
                    </div>
                </div>
                <div style={{marginBottom:'1.5em'}}>
                    <h5>品牌</h5>
                    <div style={{marginLeft:'.5em'}}>
                    <p style={{marginBottom:'.5em', color:'#4F4F4F'}}>{props[columnDefs.brand.col]}</p>
                    </div>
                    {
                        props[columnDefs.gel.col] ? <Chips color={backColor.blue} displayText={props[columnDefs.gel.col]}/> : <Chips color={backColor.blue} displayText="膠類不明"/>
                    }
                    {
                        props[columnDefs.flavor.col] ? <Chips color={backColor.blue} displayText={props[columnDefs.flavor.col]}/> : <Chips color={backColor.blue} displayText="口味不明"/>
                    }
                    {
                        props[columnDefs.foodType.col] ? <Chips color={backColor.blue} displayText={props[columnDefs.foodType.col]}/> : <Chips color={backColor.blue} displayText="罐罐型態不明"/>
                    }
                    {
                        props[columnDefs.cereals.col]==='是' ? 
                            <Chips color={backColor.blue} displayText={"穀類"}/> 
                            : null
                    }
                </div>
                <div style={{marginBottom:'1.5em'}}>
                    <h5>反應</h5>
                    {
                        props[columnDefs.like.col]==='是' ? 
                            <Chips color={backColor.tomato} icon={Icons.heart} displayText={"喜歡"}/> 
                            : <Chips color={backColor.grey} icon={Icons.dislike} displayText={"厭惡"}/>
                    }
                    {
                        props[columnDefs.diarrhea.col]==='是' ? <Chips color={backColor.grey} icon={Icons.toilet} displayText={"拉肚肚"}/> : null
                    }
                    {
                        props[columnDefs.throwUp.col]==='是' ?<Chips color={backColor.grey} icon={Icons.throwUp} displayText={"嘔吐"}/>:null
                    }
                </div>
                <div style={{marginBottom:'1.5em', borderRadius:'0.25em'}}>
                    <h5>筆記</h5>
                    <div style={{backgroundColor:'#fff', padding:'.5em .8em', color:'#4F4F4F'}}>
                        {
                            props[columnDefs.others.col].split('\n').map((item, i)=>{
                                return <p style={{marginBottom:'0.5em'}} key={`others-${props.mainKey}-${i}`}>{item}</p>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProgressBar = (props)=>{
    return(
        <div className="progress" style={{margin:'0.8em 0', height:'2em'}}>
            <div className="progress-bar" role="progressbar" 
                style={{width: props.percent+'%', backgroundColor:'#339966'}} aria-valuenow={props.percent} aria-valuemin="0" aria-valuemax="100">
                    <span>{props.percent}%</span>
            </div>
        </div>
    )
}

const Icons = {
    heart:'fas fa-heart',
    toilet:'fas fa-poo',
    dislike:'far fa-heart-broken',
    throwUp:'far fa-disease',
    food:'fas fa-utensils',
    hot:'fab fa-hotjar'
}

const backColor = {
    'blue': {
        backgroundColor: '#0099CC',
        color:'#fff'
    },
    'tomato':{
        backgroundColor:'#ff6347',
        color:'#fff'
    },
    'grey':{
        backgroundColor:'rgba(0, 0, 0, 0.25)',
        color:'rgba(0, 0, 0, 0.6)'
    },
    'brown':{
        backgroundColor:'#CC9966',
        color:'#fff'
    }
}

const Chips = (props)=>{
    return(
        <div style={{...chip, ...props.color}}>
            {props.icon ? <i className={props.icon}></i> : null}
            <span style={props.icon ? {paddingLeft:'.6em'} : {}}>{props.displayText}</span>
        </div>
    )
}

export default Panel;