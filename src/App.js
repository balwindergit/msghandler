import logo from './logo.svg';
import './App.css';
import Servers from './components/servers'
import ChannelMsg from './components/channel_msgs'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyA4Au2C6LLQZNta3PioFxbVVH9bp55d49I",
  authDomain: "msghandler-71896.firebaseapp.com",
  databaseURL: "https://msghandler-71896-default-rtdb.firebaseio.com",
  projectId: "msghandler-71896",
  storageBucket: "msghandler-71896.appspot.com",
  messagingSenderId: "82720376499",
  appId: "1:82720376499:web:689ec2e84318f1b71712c6",
  measurementId: "G-KWRZ4X80JC"
};

function App() {
  return (
    <>
    <div style={{width:"50%",margin:"auto"}}>
      
    <Router>  
       <Switch>
         <Route  path="/" exact component={Servers}/>
         <Route  path="/:id" exact component={ChannelMsg}/>
     
         
         </Switch> 
        </Router>
     </div>   
    </>
  );
}

export default App;
