import {useState,useRef} from 'react';
import { Link } from "react-router-dom";




const CategotyBox = (props,children)=>{
    const lblRef = useRef();
    const catBoxStyle={
        border:'1px solid #E9E9E9',
        width:'180px',
        height:'70px',
        borderRadius: '8px',
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
    
    const styleChange = (element)=>{
        let flag= true;
        if(flag){
            console.log(element.target.style.background);
            lblRef.current.style.background = '#183087';
            lblRef.current.style.color = '#fff';
            flag= false;
            console.log('khamosh nashod');
        }
         //else{
        //     lblRef.current.style.background = '#fff';
        //     lblRef.current.style.color = '#183087';
        //     flag= true;
        //     console.log('khamosh shod');
        // }
    }
    return(
            <label ref={lblRef} onClick={styleChange} style={catBoxStyle} className='pr-3 hover:bg-color20% text-darkBlue transition cursor-pointer' >
                {/* <input onChange={styleChange} type="radio" className='hidden' /> */}
                <span className='flex justify-center items-center w-14 h-14 rounded-full ml-3' style={{background:'#F8F8F8'}}>
                    <img className='w-1/2 ' src={props.src}/>
                </span>
                <p className='w-max text-sm'>{props.name}</p>
            </label>
    );
}


export default CategotyBox;