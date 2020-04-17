import React from "react";

export const PreLoader = (props)=>{
    const IsMobile = props.IsMobile;
    return <div className="text-center" style={{marginTop:IsMobile ? '30%' : '10%'}}>
        <img src="./img/wait.jpg" style={{width:IsMobile ? '80%' : '30%'}} />
        <div style={{marginTop:'10px'}}>
            <span>兔兔已去抓資料，請靜候兔兔佳音 </span>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p>(兔腿狂奔) </p>
        </div>
    </div>
}