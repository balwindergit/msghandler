import {useState,useEffect} from 'react'
import firebase from '../firebase'



const ChannelMsg=(props)=>{

useEffect(()=>{
    let server_id=props.location.pathname
   
    const channels=firebase.database().ref('channels/'+server_id);

        channels.on("value",snapshot=>{
            const channelsData=[];
            let channels=snapshot.val();
            console.log(channels)
            
            let first=0;
            for(let i in channels)
            {
                if(first===0)
                {
                    setChannelId(channels[i].id)
                }
                channelsData.push(channels[i]);
                
            }
            setChannels(channelsData);
            
        })


     
   
    const msgs=firebase.database().ref('msg/'+server_id);

        msgs.on("value",snapshot=>{
            const msgData=[];
            let messages=snapshot.val();
            console.log("msgs")
            console.log(messages)
            
            for(let i in messages)
            {
                
                msgData.push(messages[i]);
               
            }

           
            setMsgs(msgData);
            
        })


},[])

const getMgs=()=>{

    let msgData=msgs;
    let channelMsgs=[];

    for(let i in  msgData)
    {
        if(channelId===msgData[i].channel_id)
        {
            channelMsgs.push(msgData[i]);
        }

    }

    return channelMsgs.map((item,key)=>{
        return(
                     
              <div key={key}>
               <p>{item.author_name}:{item.text}<br/>Url:{item.url}</p>
               <hr/>
               </div>
          )
    })
}  

const [channels,setChannels]=useState([])
const [msgs,setMsgs]=useState([])
const [channelId,setChannelId]=useState([])

    return(
        <div className="d-flex" id="wrapper">
    
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Channels </div>
      <div className="list-group list-group-flush">
      {
          channels.map((item,key)=>(
              <a  className={"list-group-item list-group-item-action bg-lightt " + (item.id===channelId?'activeLink':'') } key={key}  onClick={()=>{setChannelId(item.id) }}>
              {item.name}</a>
          ))
      }
      </div>
    </div>
    
    <div>

      

      <div className="container-fluid">

       {
         getMgs()
      }
       
      </div>
    </div>


  </div>

    )
}

export default ChannelMsg;



