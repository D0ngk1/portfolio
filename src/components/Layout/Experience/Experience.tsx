import Windows from "@/components/UI/Windows.tsx";
import "./Experience.css";
import {useState} from 'react';

//Import images
import TodoApp from "@/assets/projects/todo-list.jpg";
import Dictionary from "@/assets/projects/dictionary.jpg";

interface Proj {
   name:string;
   image:string;
} 
const todoApp = [
  {
    name:'Todo App',
    image:TodoApp
  }
];

const dictionary = [
  {
    name:'Dictionary',
    image:Dictionary
  }
];


const Experience = () => {
  const height = "45px";
  const [menu,setMenu] = useState<String>('Projects');
  const [activeProj,setActiveProj] = useState<Proj | null>(todoApp[0]);
  const handleMenuClick =  (key=1) => {
   if       (key == 1) setMenu('Overview');
   else if  (key == 2) setMenu('Experience');
   else setMenu('Projects');
   console.log(menu);
  }
  
  const selectProject = (key=1) => {
    if(key ==1) setActiveProj(null);
    else if(key ==2) setActiveProj(null);
    else if(key ==3) setActiveProj(todoApp[0]);
    else setActiveProj(dictionary[0]);
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
            <div className="active-items" style={{ backgroundImage:`url(${activeProj?.image})` }}>
             <h1>{activeProj?.name}</h1>
            </div>
            <div className="selector">
             <ul className="select-items-proj">
              <li className={`items portfolio-item  ${activeProj?.name === 'Portfolio' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${TodoApp})` }} onClick={() => selectProject(1)}><h3>Portfolio</h3></li>
              <li className={`items image-scraper-item ${activeProj?.name === 'Image Scrapper' ? "active-item" : "not-active-item"}`} onClick={() => selectProject(2)}><h3>Image Scraper</h3></li>
              <li className={`items todo-app-item ${activeProj?.name  === 'Todo App' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${TodoApp})` }}  onClick={() => selectProject(3)}><h3>Todo App</h3></li>
              <li className={`items dictionary-item ${activeProj?.name  === 'Dictionary' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${Dictionary})` }}  onClick={() => selectProject(4)}><h3>Dictionary</h3></li>
             </ul>
            </div>
            </>
            )}

            { menu == "Experience" && (
              <>
                <div className="exp-con-menu">
                  <div className="vertical-line left-box ">
                    <div className="item item-left">
                     <span className="horizontal-line-left"></span> 
                     <div className="item-left-content">
                       <h2 className="company">Relatives & Friends</h2>
                       <h4 className="job-title">IT Specialist</h4>
                     </div>
                    </div>
                  </div>
                  <div className="vertical-line right-box ">
                    <div className="item item-right">
                     <span className="horizontal-line"></span>
                     <div className="item-right-content">
                       <h2 className="company">Amdocs</h2>
                       <h4 className="job-title">Software Engineer</h4>
                     </div>
                    </div>
                    <div className="item item-right">
                     <span className="horizontal-line"></span>
                     <div className="item item-right-content">
                       <h2 className="company">SUA</h2>
                       <h4 className="job-title">Intern</h4>
                     </div>
                    </div>
                  </div>
                  
                </div>

              </>)

            }

          </div>

     </div>
  );
}

export default Experience;
