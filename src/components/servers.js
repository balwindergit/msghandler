import {Component} from 'react'
import firebase from '../firebase'
import {Link} from 'react-router-dom'

class ServersComponent extends Component{

    state={
        servers:[]
    }

    componentDidMount()
    {
         const servers=firebase.database().ref('servers');
   
        servers.on("value",snapshot=>{
            const serverData=[];
            let servers=snapshot.val();
            
            for(let i in servers)
            {
                
                serverData.push(servers[i]);
                this.setState({
                    servers:serverData
                })
            }
            
        })
    }

    
    

    render(){

        return(
            <>
            <h4 style={{textAlign:"center"}}>Servers</h4>
                {
                    this.state.servers.map((item,key)=>(
                        <div className="card" style={{marginBottom:"10px"}} key={key}>
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                        <Link to={item.id} className="btn btn-primary">Open</Link>
  </div>
</div>

                    ))

                 }      
            </>
            
        )
    }

}

export default ServersComponent;