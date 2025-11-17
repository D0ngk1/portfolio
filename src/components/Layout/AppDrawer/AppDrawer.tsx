import "./AppDrawer.css";
import Boy from "@/assets/app-icon/boy.png";
import Files from "@/assets/app-icon/folder.png";
import Skills from "@/assets/app-icon/skill.png";
import Resume from "@/assets/app-icon/curriculum-vitae.png";
import Calendar from "@/assets/app-icon/calendar.png";
//import {useState} from "react";
interface AppDrawerProps {
  onClose?: (key?:string) => void;
}
const AppDrawer: React.FC<AppDrawerProps> = ({onClose}) => {
  const handleApp = (key:string) => {
     onClose?.(key);
  }
  return (
    <div className="app-drawer-container">
     <div className="app-drawer-content">
      <div className="app-icon" onClick={()=>handleApp('about')}><img src={Boy} alt="boy icon" /><p className="about-me-label">About Me</p></div>
      <div className="app-icon" onClick={()=>handleApp('cert')}><img src={Files} alt="boy icon" /><p className="files-label">Files</p></div>
      <div className="app-icon" onClick={()=>handleApp('experience')}><img src={Skills} alt="boy icon" /><p className="skills-label">Skills</p></div>
      <div className="app-icon" onClick={()=>handleApp('resume')}><img src={Resume} alt="boy icon" /><p className="resume-label">Resume</p></div>
      <div className="app-icon"><img src={Calendar} alt="boy icon" /><p className="calendar-label">Calendar</p></div>
     </div>
    </div>
  );

}

export default AppDrawer;
