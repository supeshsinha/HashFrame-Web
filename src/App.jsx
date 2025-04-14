import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css'
import InputFileUpload from './components/InputFileUpload'
import HomeButton from './components/HomeButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import logo from './assets/logo_512.png';

function App() {

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("unchecked");

  const handleHash = async (hash)=>{
    console.log("hey there", hash, import.meta.env.VITE_SERVER_ENDPOINT);

    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/check/${hash}`);
    const res = await response.json();
    setLoading(false);
    console.log(res);

    if(res.exists) setStatus("exists");
    else setStatus("notExists");
  }

  const handleHome = ()=>{
    setStatus("unchecked");
  }

  return (
    <div className='container'>
      <h1 className='main_title'>HashFrame</h1>
      {status == "unchecked" ? 
      <>
          <div className="flex"><img src={logo} className="logo"/> <p className='big_text'><br/>In this era of AI and hyper-realistic fake images, Ensuring image integrity is more important than ever. <br/>
          HashFrame is a Blockchain based image integrity verification system to re-establish trust in images.<br/>
          It can verify whether a particular image has been clicked from HashFrame Camera App.</p></div>
          <br/><p>Upload your image to verify its authenticity.</p><br/>
          {loading? 
            <CircularProgress />
          :
            <InputFileUpload handlehash={handleHash}></InputFileUpload>
          }
      </>
          : (status == "exists") ?
      <>
        <CheckCircleIcon style={{ fontSize: '100px', color: 'green', padding: '25px' }} />
          
        <div className="flex" style={{justifyContent: 'center'}}>
        <p className='big_text' style={{textAlign: 'center'}}>Image is authentic</p>
        </div>
        <br/>
        <HomeButton handler = {handleHome}/>
      </>
      :
      <>
        <DangerousIcon style={{ fontSize: '100px', color: 'red', padding: '25px' }} />
        <div className="flex" style={{justifyContent: 'center'}}>
        <p className='big_text' style={{textAlign: 'center'}}>Image authenticity cannot be determined</p>
        </div>
        <br/>
        <HomeButton handler = {handleHome}/>
      </>
      }
      
    </div>
  )
}

export default App
