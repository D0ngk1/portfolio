//Import images
import TodoApp from "@/assets/projects/todo-list.jpg";
import Dictionary from "@/assets/projects/dictionary.jpg";
import Portfolio from "@/assets/wallhaven-y892kg.jpg";
import ImageScraper from "@/assets/projects/image-scraper.jpeg";
import {useState} from "react";

interface Proj {
   name:string;
   image:string;
   description?:string;
}


export const proj = [
  { 
    name:'Portfolio', 
    image:Portfolio,
    description:'A custom desktop-inspired interface featuring draggable and resizable windows, styled after Linux Ricing. Built to feel like a personalized Linux desktop inside the browser — smooth, dynamic, and fully interactive.'
  },
  { 
    name:'Image Scraper', 
    image:ImageScraper,
    description:'A Python Selenium automation tool that scrolls through Meta Messenger conversations and automatically downloads all images to your local machine.'
  },
  { 
    name:'Todo App',
    image:TodoApp,
    description:'A task management web app inspired by Microsoft To Do, featuring a clean interface for creating, organizing, and tracking daily tasks. Includes features like due dates, priority levels, and list categorization to enhance productivity and task organization.' 
  },
  { 
    name:'Dictionary', 
    image:Dictionary,
    description:'A web application that leverages a third-party dictionary API to provide word definitions and usage examples. Users can search for words and access comprehensive linguistic information quickly and easily.'
  },
];
const TabProjects = () => {
  const [activeProj,setActiveProj] = useState<Proj | null>(proj[0]);

  const selectProject = (key = 1) => {
    setActiveProj(proj[key - 1]);
  };

  return (
    <>
        <div className="active-items" style={{ backgroundImage:`url(${activeProj?.image})` }}>
         <h1>{activeProj?.name}</h1>
         <p className="proj-desc">{activeProj?.description}</p>
        </div>
        <div className="selector">
         <ul className="select-items-proj">
          <li className={`items portfolio-item  ${activeProj?.name === 'Portfolio' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${Portfolio})` }} onClick={() => selectProject(1)}><h3>Portfolio</h3></li>
          <li className={`items image-scraper-item ${activeProj?.name === 'Image Scraper' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${ImageScraper})` }}  onClick={() => selectProject(2)}><h3>Image Scraper</h3></li>
          <li className={`items todo-app-item ${activeProj?.name  === 'Todo App' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${TodoApp})` }}  onClick={() => selectProject(3)}><h3>Todo App</h3></li>
          <li className={`items dictionary-item ${activeProj?.name  === 'Dictionary' ? "active-item" : "not-active-item"}`} style={{ backgroundImage:`url(${Dictionary})` }}  onClick={() => selectProject(4)}><h3>Dictionary</h3></li>
         </ul>
        </div>
    </>


  );
}
export default TabProjects;
