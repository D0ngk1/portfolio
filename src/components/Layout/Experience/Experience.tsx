import Windows from "@/components/UI/Windows.tsx";
import "./Experience.css";
import {useState} from 'react';


const Experience = () => {
  const height = "45px";
  const [menu,setMenu] = useState<String>('Projects');
  const [activeProj,setActiveProj] = useState<String>('Portfolio');

  const handleMenuClick =  (key=1) => {
   if       (key == 1) setMenu('Overview');
   else if  (key == 2) setMenu('Experience');
   else setMenu('Projects');
   console.log(menu);
  }
  
  const selectProject = (key=1) => {
    if(key ==1) setActiveProj('Portfolio');
    else if(key ==2) setActiveProj('Image Scraper');
    else if(key ==3) setActiveProj('Todo App');
    else setActiveProj('Dictionary');
  }


  return (
    <div className="exp exp-container">
          <Windows  title='Experience' hideResizeBtn={false} height={height} menuBar= { <>
            <div className={`menu-btn-exp over-btn flex-center ${menu === 'Overview' ? "active" : ""}`} onClick={()=>handleMenuClick(1)}> Overview</div>
            <div className={`menu-btn-exp exp-btn flex-center  ${menu === 'Experience' ? "active" : ""}`} onClick={()=>handleMenuClick(2)}> Experience</div>
            <div className={`menu-btn-exp proj-btn flex-center ${menu === 'Projects' ? "active" : ""}`} onClick={()=>handleMenuClick(3)}> Projects</div>
            </> } />
          <div className="exp-content-container content" style={{marginTop:0}}>

          { menu === "Projects" && ( <>
            <div className="active-items">
             <h1>{activeProj}</h1>
            </div>
            <div className="selector">
             <ul className="select-items-proj">
              <li className="items" onClick={() => selectProject(1)}>Portfolio</li>
              <li className="items" onClick={() => selectProject(2)}>Image Scraper</li>
              <li className="items" onClick={() => selectProject(3)}>Todo App</li>
              <li className="items" onClick={() => selectProject(4)}>Dictionary</li>
             </ul>
            </div>
            </>
            )}

          </div>

     </div>
  );
}

export default Experience;
