import Windows from "@/components/UI/Windows.tsx";
import "./Experience.css";
import {useState} from 'react';

import TabProjects from "@/components/Layout/Experience/TabProjects.tsx";
import TabExperience from "@/components/Layout/Experience/TabExperience.tsx";
import TabFeatures from "@/components/Layout/Experience/TabFeatures.tsx";
interface ProjProps {
  sendCloseB?: (isClose?:boolean) => void;  
  sendMaxB?: (isMax?:boolean) => void;
  sendMinz?: (isMinz?:boolean) => void;
  isMax?:boolean;
  isMinz?:boolean;
}

const Experience: React.FC<ProjProps> = ({sendCloseB,sendMaxB,sendMinz,isMax,isMinz}) => {
  //Margin height base on title
  const height = "45px";
  const [menu,setMenu] = useState<String>('Projects');
  const handleOnclose =(data?: boolean)=>{
    sendCloseB?.(data);
  }
  const handleOnMax = (data?:boolean) => {
    sendMaxB?.(data);
  }
  const handleMenuClick =  (key=1) => {
   if       (key == 1) setMenu('Overview');
   else if  (key == 2) setMenu('Experience');
   else setMenu('Projects'); 
  }
  const handelOnMinz = (data?:boolean) => {
    sendMinz?.(data);
  }


  return (
    <div className="exp exp-container">
          <Windows  title='Experience' hideResizeBtn={false} isMax={isMax} isMinz={isMinz} onMinz={handelOnMinz} onClose={handleOnclose} onMax={handleOnMax} height={height} menuBar= { <>
            <div className={`menu-btn-exp over-btn flex-center ${menu === 'Overview' ? "active" : ""}`} onClick={()=>handleMenuClick(1)}> Overview</div>
            <div className={`menu-btn-exp exp-btn flex-center  ${menu === 'Experience' ? "active" : ""}`} onClick={()=>handleMenuClick(2)}> Experience</div>
            <div className={`menu-btn-exp proj-btn flex-center ${menu === 'Projects' ? "active" : ""}`} onClick={()=>handleMenuClick(3)}> Projects</div>
            </> } />
          <div className="exp-content-container content" style={{marginTop:0}}>
            { menu === "Projects" && ( <TabProjects />)}
            { menu === "Experience" && ( <TabExperience />)}
            { menu === "Overview" && (<TabFeatures />)}
          </div>
     </div>
  );
}

export default Experience;

