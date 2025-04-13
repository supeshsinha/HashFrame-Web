import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css'
import InputFileUpload from './components/InputFileUpload'
import HomeButton from './components/HomeButton';

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
      {status == "unchecked" ? 
      <>
          <h1 className='main_title'>HashFrame</h1>
          {loading? 
            <CircularProgress />
          :
            <InputFileUpload handlehash={handleHash}></InputFileUpload>
          }
      </>
          : (status == "exists") ?
          <>
        <p>Image is authentic</p>
        <HomeButton handler = {handleHome}/>
      </>
      :
      <>
        <p>Image authenticity cannot be determined</p>
        <HomeButton handler = {handleHome}/>
      </>
      }
      
    </div>
  )
}

export default App
