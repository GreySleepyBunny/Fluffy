import React, {useState} from 'react';
import moment from 'moment';

const columnDefs = {
    date:0,
    g:1,
    brand:2,
    foodType:3,
    flavor:4,
    gel:5,
    like:6,
    diarrhea:7,
    throwUp:8,
    others:9
}

const Panel = (props)=>{
    const [stateData, updateData] = useState({
        0:moment(new Date()).format('l'),
        1:0,
        2:'',
        3:'',
        4:'',
        5:false,
        6:false,
        7:false,
        8:false,
        9:''
    });

    const EditField=(v, dataColumn)=>{
        updateData({
            ...stateData,
            [dataColumn]:v
        });
    }

    const ClickSubmit=()=>{
        props.ClickSubmit(stateData);
    }

    return(
        <div style={{margin:'10px', height:'100%', marginBottom:'10%'}}>
            <button type="submit" className="btn btn-secondary"  style={{marginBottom:'10px'}} onClick={props.ClickBack}>Back</button>
            <form>
                <div className="form-group">
                    <label>日期</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.date]} onBlur={(e)=>{EditField(e.target.value, columnDefs.date)}}/>
                </div>
                <div className="form-group">
                    <label>食用量(e.g. 50g則輸入50)</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.g]} onBlur={(e)=>{EditField(e.target.value, columnDefs.g)}}/>
                </div>
                <div className="form-group">
                    <label>品牌</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.brand]} onBlur={(e)=>{EditField(e.target.value, columnDefs.brand)}}/>
                </div>
                <div className="form-group">
                    <label>型態(泥/肉絲/肉塊...etc)</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.foodType]} onBlur={(e)=>{EditField(e.target.value, columnDefs.foodType)}}/>
                </div>
                <div className="form-group">
                    <label>口味</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.flavor]} onBlur={(e)=>{EditField(e.target.value, columnDefs.flavor)}}/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-gel" checked={stateData[columnDefs.gel]} onChange={()=>{EditField(!stateData[columnDefs.gel], columnDefs.gel)}}/>
                    <label className="form-check-label" htmlFor="col-gel">含有膠類？</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-like" checked={stateData[columnDefs.like]} onChange={()=>{EditField(!stateData[columnDefs.like], columnDefs.like)}}/>
                    <label className="form-check-label" htmlFor="col-like">喜歡？</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-diarrhea" checked={stateData[columnDefs.diarrhea]} onChange={()=>{EditField(!stateData[columnDefs.diarrhea], columnDefs.diarrhea)}}/>
                    <label className="form-check-label" htmlFor="col-diarrhea">拉肚肚？</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-throwUp" checked={stateData[columnDefs.throwUp]} onChange={()=>{EditField(!stateData[columnDefs.throwUp], columnDefs.throwUp)}}/>
                    <label className="form-check-label" htmlFor="col-throwUp">吐粗乃？</label>
                </div>
                <div className="form-group">
                    <label>其他</label>
                    <textarea className="form-control" rows="3" defaultValue={stateData[columnDefs.others]} onBlur={(e)=>{EditField(e.target.value, columnDefs.others)}}></textarea>
                </div>
                {
                    props.processing ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> ) : <button type="button" className="btn btn-primary" onClick={ClickSubmit}>送出</button>
                }
            </form>
        </div>
    );
}

export default Panel;