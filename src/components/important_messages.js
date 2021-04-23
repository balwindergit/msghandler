import React,{useState,useEffect,useRef} from 'react'
import firebase from '../firebase'
import useSound from 'use-sound';
import boopSfx from './mlg-airhorn.mp3';


const ImportantMsg=(props)=>{
   const [msgs,setMsgs]=useState([])
   const [important_check,setImportCheck]=useState(true)
   const [uniswap_check,setUniswapCheck]=useState(true)
   const [analysis_check,setAnayCheck]=useState(true)
   const [play] = useSound(boopSfx);

   const impRef = useRef();
   impRef.current = important_check;

   const unswmpRef = useRef();
   unswmpRef.current = uniswap_check;

    const anlsRef = useRef();
   anlsRef.current = analysis_check;
    
   
useEffect(()=>{
   console.log("here")

    let mount=0; 
    let limprtCount=0
    let lunisCount=0
    let lanlsisCount=0
    let isMounted = true;
    
   
    const msgs=firebase.database().ref('msg/');


        msgs.on("value",snapshot=>{
        if(isMounted)
        {    
            play();
            const msgData=[];
            let messages=snapshot.val();
            let imprtCount=0;
            let unisCount=0;
            let anlsisCount=0;
            
            for(let i in messages)
            {
                for(let j in messages[i])
                {
                    if(messages[i][j].important===1)
                    {
                        if(messages[i][j].important_channel===1)
                        {
                            imprtCount++;    
                        }
                        else if(messages[i][j].uniswap_channel===1)
                        {
                            unisCount++;    
                        }

                         if(messages[i][j].analysis_channel===1)
                        {
                            anlsisCount++;    
                        }

                        msgData.push(messages[i][j]);
                    }
                    
                }
               
            }

            if(mount===0)
            {
                limprtCount=imprtCount;
                lunisCount=unisCount;
                lanlsisCount=anlsisCount;
                
                mount++
            }
            else
            {
             
                if(imprtCount>limprtCount)
                {
                    console.log("in condition");
                    if(impRef.current)
                    {
                        console.log("in play");
                        play();
                    }

                }
                if(unisCount>lunisCount)
                {
                    if(unswmpRef.current)
                    {
                        console.log("in condition");
                        console.log("in play");
                        play();
                    }
                    
                }
                if(anlsisCount>lanlsisCount)
                {
                    if(anlsRef.current)
                    {
                        play();
                    }
                    
                }
                console.log("current");
                console.log(imprtCount,unisCount,anlsisCount);
                console.log("last");
                console.log(limprtCount,lunisCount,lanlsisCount);
                limprtCount=imprtCount;
                lunisCount=unisCount;
                lanlsisCount=anlsisCount;

                 mount++
              
            }

                        
           
            setMsgs(msgData);
        } 
        })
    
    return () => { 
        console.log("umounting the code")
        isMounted = false };

},[]);



const checkStat=()=>{
    console.log("important check ",important_check)
}



    return(
       <>
     
       <div>
       <p className="checkboxsel">
            <label>Important/Trade Channels</label>&nbsp;&nbsp;<input type="checkbox" checked={important_check} onChange={(e)=>{
                setImportCheck(e.target.checked) }}/>
       </p>
       <p className="checkboxsel">
            <label>Uniswap Channels</label>&nbsp;&nbsp;<input type="checkbox" defaultChecked={uniswap_check} onChange={(e)=>{
                setUniswapCheck(e.target.checked)
            }}/>
       </p>
       <p className="checkboxsel">
            <label>Analysis Channels</label>&nbsp;&nbsp;<input type="checkbox" defaultChecked={analysis_check} onChange={(e)=>{
                setAnayCheck(e.target.checked)
            }}/>
       </p>
       </div>
       {
        (msgs.length>0)?
        
        msgs.map((item,index)=>((
            <div className="msgdiv" key={index}>
                <p style={{color:"crimson"}}>{item.server_name}|{item.channel_name}</p>
                <p>{item.author_name}:<a href={item.url}>{item.server_time_created}</a></p>
                <p>{item.text}</p>
            </div>

        )))
        :<h2 style={{padding:"20px"}}> No Important Message Available right now</h2>
}
    
      </>

    )
}

export default ImportantMsg;



