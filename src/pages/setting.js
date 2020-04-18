import React, {useState} from 'react';
import {columnDefs} from '../common/dataDefs';
import {btn} from '../style/css';

const Panel = (props)=>{
    const [stateData, updateData] = useState(()=>{
        let r = {};
        Object.keys(columnDefs).forEach((k)=>{
            r[k] = columnDefs[k].defaultValue !== undefined ? columnDefs[k].defaultValue : '';
        });
        return r;
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
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.date.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.date.col)}}/>
                </div>
                <div className="form-group">
                    <label>食用量(e.g. 50g則輸入50)</label>
                    <input className="form-control" type={"number"} defaultValue={stateData[columnDefs.g.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.g.col)}}/>
                </div>
                <div className="form-group">
                    <label>熱量</label>
                    <input className="form-control" type={"number"} defaultValue={stateData[columnDefs.calories.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.calories.col)}}/>
                </div>
                <div className="form-group">
                    <label>品牌</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.brand.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.brand.col)}}/>
                </div>
                <div className="form-group">
                    <label>型態(泥/肉絲/肉塊...etc)</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.foodType.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.foodType.col)}}/>
                </div>
                <div className="form-group">
                    <label>口味</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.flavor.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.flavor.col)}}/>
                </div>
                <div className="form-group">
                    <label>膠類</label>
                    <input className="form-control" type="text" defaultValue={stateData[columnDefs.gel.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.gel.col)}}/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-gel" checked={stateData[columnDefs.cereals.col]} onChange={()=>{EditField(!stateData[columnDefs.cereals.col], columnDefs.cereals.col)}}/>
                    <label className="form-check-label" htmlFor="col-gel">穀物？</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-like" checked={stateData[columnDefs.like.col]} onChange={()=>{EditField(!stateData[columnDefs.like.col], columnDefs.like.col)}}/>
                    <label className="form-check-label" htmlFor="col-like">喜歡？</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-diarrhea" checked={stateData[columnDefs.diarrhea.col]} onChange={()=>{EditField(!stateData[columnDefs.diarrhea.col], columnDefs.diarrhea.col)}}/>
                    <label className="form-check-label" htmlFor="col-diarrhea">拉肚肚？</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="col-throwUp" checked={stateData[columnDefs.throwUp.col]} onChange={()=>{EditField(!stateData[columnDefs.throwUp.col], columnDefs.throwUp.col)}}/>
                    <label className="form-check-label" htmlFor="col-throwUp">吐粗乃？</label>
                </div>
                <div className="form-group">
                    <label>其他</label>
                    <textarea className="form-control" rows="3" defaultValue={stateData[columnDefs.others.col]} onBlur={(e)=>{EditField(e.target.value, columnDefs.others.col)}}></textarea>
                </div>
                {
                    props.processing ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> ) : <button type="button" className="btn" style={btn.primary} onClick={ClickSubmit}>送出</button>
                }
            </form>
        </div>
    );
}

export default Panel;