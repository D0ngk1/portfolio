import "./Header.css";
import {useEffect,useState} from "react";
export default function Header() {
  const [pstTime,setPstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options : Intl.DateTimeFormatOptions = {
        timeZone: 'Pacific/Honolulu',
        hour:'2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
      }
      const spaces = "   ";
      const formattedPST = now.toLocaleString('en-US', options);
      const newDateFormat = formattedPST.replace(" at ",spaces);
      setPstTime(newDateFormat+"  ( HST )");
    }
    updateTime();
    const intervalID = setInterval(updateTime,60000);

    return () => clearInterval(intervalID);
  },[]);
  
 return (
   <div className="main-header">   
    <div className="header-left">
      <div className="name">DG</div>
      <div className="location full">Honolulu, HI. | Open to relocate</div>
      <div className="location short">Hon, HI.</div>

    </div>
      <div className="header-center "><div className="time-display">{pstTime}</div></div>
      <div className="header-right"></div>
   </div>
 ); 
}
