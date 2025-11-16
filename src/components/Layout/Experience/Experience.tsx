import Windows from "@/components/UI/Windows.tsx";
import "./Experience.css";
import {useState} from 'react';

//Import images
import TodoApp from "@/assets/projects/todo-list.jpg";
import Dictionary from "@/assets/projects/dictionary.jpg";
import Portfolio from "@/assets/wallhaven-y892kg.jpg";

interface Proj {
   name:string;
   image:string;
}

interface ProjProps {
  sendCloseB?: (isClose?:boolean) => void;  
  sendMaxB?: (isMax?:boolean) => void;
}


const proj = [
  { name:'Portfolio', image:Portfolio},
  { name:'Image Scraper', image:Portfolio},
  { name:'Todo App',image:TodoApp },
  { name:'Dictionary', image:Dictionary},
];

const workExperience = [
  //{ companyName:'', year:'',role:''},
  { companyName:'Amdocs', year:'September 2023 - March 2022',role:'Software Engineer'},
  { companyName:'MR. GEEK', year:'July 2021- May 2021',role:'Web Devoloper Intern'},
  { companyName:'Capstone Projects', year:'',role:'Team leader / Lead Designer / Lead Developer'},
];

const Experience: React.FC<ProjProps> = ({sendCloseB,sendMaxB}) => {
  const height = "45px";
  const [menu,setMenu] = useState<String>('Projects');
  const [activeProj,setActiveProj] = useState<Proj | null>(proj[0]);
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
  
  const selectProject = (key=1) => {
    if       (key ==1) setActiveProj(proj[0]);
    else if  (key ==2) setActiveProj(proj[1]);
    else if  (key ==3) setActiveProj(proj[2]);
    else setActiveProj(proj[3]);
  }



  return (
    <div className="exp exp-container">
          <Windows  title='Experience' hideResizeBtn={false} onClose={handleOnclose} onMax={handleOnMax} height={height} menuBar= { <>
            <div className={`menu-btn-exp over-btn flex-center ${menu === 'Overview' ? "active" : ""}`} onClick={()=>handleMenuClick(1)}> Overview</div>
            <div className={`menu-btn-exp exp-btn flex-center  ${menu === 'Experience' ? "active" : ""}`} onClick={()=>handleMenuClick(2)}> Experience</div>
            <div className={`menu-btn-exp proj-btn flex-center ${menu === 'Projects' ? "active" : ""}`} onClick={()=>handleMenuClick(3)}> Projects</div>
            </> } />
          <div className="exp-content-container content" style={{marginTop:0}}>

          { menu === "Projects" && ( <>
            <div className="active-items" style={{ backgroundImage:`url(${activeProj?.image})` }}>
             <h1>{activeProj?.name}</h1>
            </div>
            <div className="selector">
             <ul className="select-items-proj">
              <li className={`items portfolio-item  ${activeProj?.name === 'Portfolio' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${Portfolio})` }} onClick={() => selectProject(1)}><h3>Portfolio</h3></li>
              <li className={`items image-scraper-item ${activeProj?.name === 'Image Scraper' ? "active-item" : "not-active-item"}`} onClick={() => selectProject(2)}><h3>Image Scraper</h3></li>
              <li className={`items todo-app-item ${activeProj?.name  === 'Todo App' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${TodoApp})` }}  onClick={() => selectProject(3)}><h3>Todo App</h3></li>
              <li className={`items dictionary-item ${activeProj?.name  === 'Dictionary' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${Dictionary})` }}  onClick={() => selectProject(4)}><h3>Dictionary</h3></li>
             </ul>
            </div>
            </>
            )}

            { menu == "Experience" && 
              (<>
                <div className="exp-con-menu">
                
                  <div className="vertical-line left-box ">
                    <div className="item item-left">
                    <div className="move-to-right">
                     <span className="horizontal-line-left"></span> 
                      <span className="circle-left"></span>
                     <div className="item-left-content">
                       <h2 className="company">Relatives & Friends</h2>
                       <h4 className="job-title">Personal IT Specialist</h4>
                       <h4 className="year">Current - 2014</h4>
                     </div>
                    </div>
                    </div>
                  </div>
                  <div className="vertical-line right-box">
                    { workExperience.map(({companyName,year,role}) => (
                        <div className="item item-right" key={`${companyName}${year}`}>
                        { companyName!='' && (<span className="horizontal-line"></span> )}
                         <span className="circle"></span>
                         <div className="item-right-content">
                          <h2 className="company">{companyName}</h2>
                          <h4 className="job-title">{role}</h4>
                          <h5 className="year">{year}</h5>
                         </div>
                        </div>
                      ))}
                  </div>                              
                </div>
              </>)
            }
          </div>
     </div>
  );
}

export default Experience;
