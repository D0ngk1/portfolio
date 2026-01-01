import "./AppDrawer.css";
import Boy from "@/assets/app-icon/boy.png";
import Files from "@/assets/app-icon/file-explorer.png";
import Skills from "@/assets/app-icon/production.png";
import Resume from "@/assets/app-icon/curriculum-vitae.png";
import Calendar from "@/assets/app-icon/calendar.png";
//import {useState} from "react";
import {useRef } from 'react';

interface AppDrawerProps {
  keyApp?: (key?:string) => void;
  appStates: Record<string, {isClose: boolean}>;
}
const AppDrawer: React.FC<AppDrawerProps> = ({keyApp,appStates}) => {

  const appRefc = useRef<HTMLDivElement>(null);
  const handleApp = (key:string) => {
     keyApp?.(key);
  }
  //const delayRef = useRef(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseOver = () => {
    const appRef = appRefc.current;
    if (!appRef) return;
    //appRef.style.width = appDrawerWidth+""; 
    //appRef.style.width = '380';
    // clear previous timer so it doesn't stack
    clearTimeout(delayRef.current || undefined);
    delayRef.current = setTimeout(() => {
      //appRef.style.width = "380px";
      const appDrawerWidth = appRef.getBoundingClientRect().width;
      //console.log(appDrawerWidth);
      appRef.style.width = appDrawerWidth+"px";
    },300); // 0.5s
  }
  const handleMouseOut = ()  => {
    const appRef = appRefc.current;
    if (!appRef) return
    clearTimeout(delayRef.current || undefined);
    appRef.style.width = 'max-content';
  }

  return (
    <div className="app-drawer-container">
     <div className="app-drawer-content" ref={appRefc} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
      <div className="app-icon about " onClick={()=>handleApp('about')}>
        <div className={`app-img-container ${appStates['about']?.isClose ? `close-app`:`open-app`}`}><img src={Boy} alt="boy icon" /></div><p className="about-me-label">About Me</p></div>
      <div className="app-icon" onClick={()=>handleApp('cert')}><div className={`app-img-container ${appStates['cert']?.isClose ? `close-app`:`open-app`}`}><img src={Files} alt="boy icon" /></div><p className="files-label">Files</p></div>
      <div className="app-icon" onClick={()=>handleApp('experience')}><div className={`app-img-container ${appStates['experience']?.isClose ? `close-app`:`open-app`}`}><img src={Skills} alt="boy icon" /></div><p className="skills-label">Skills</p></div>
      <div className="app-icon" onClick={()=>handleApp('resume')}><div className={`app-img-container ${appStates['resume']?.isClose ? `close-app`:`open-app`}`}><img src={Resume} alt="boy icon" /></div><p className="resume-label">Resume</p></div>
      <div className="app-icon calendar" onClick={()=>handleApp('calendar')}><div className={`app-img-container ${appStates['calendar']?.isClose ? `close-app`:`open-app`}`}><img src={Calendar} alt="boy icon" /></div><p className="calendar-label">Calendar</p></div>
     </div>
    </div>
  );

}

export default AppDrawer;
