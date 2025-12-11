//Import images
import TodoApp from "@/assets/projects/todo-list.jpg";
import Dictionary from "@/assets/projects/dictionary.jpg";
import Portfolio from "@/assets/wallhaven-y892kg.jpg";
import ImageScraper from "@/assets/projects/image-scraper.jpeg";
import Homelab from "@/assets/projects/homelab.png";
import githubIcon   from "@/assets/github-light.png";
import {useState} from "react";

interface Proj {
   name:string;
   image:string;
   description?:string;
   shortDesc?:string;
   github?:string;
}


export const proj = [
  { 
    name:'Portfolio', 
    image:Portfolio,
    description:'A custom desktop-inspired interface featuring draggable and resizable windows, styled after Linux Environment. Built to feel like a personalized Linux desktop inside the browser — smooth, dynamic, and fully interactive.',
    shortDesc:'React with TypeScript',
    github:'https://github.com/D0ngk1/portfolio',
  },
  { 
    name:'Homelab', 
    image:Homelab,
    description: 'Built a NAS, self-hosted a personal wiki server, and created a Linux lab environment for hands-on IT administration, networking, and cybersecurity experiments.',
    shortDesc:'Networking,IT & Cybersecurity',
     },
  { 
    name:'Image Scraper', 
    image:ImageScraper,
    description:'A Python Selenium automation tool that scrolls through Meta Messenger conversations and automatically downloads all images to your local machine.',
    shortDesc: 'Selenium library with Python',
    github:'https://github.com/D0ngk1/messenger-scrapper',
  },
  { 
    name:'Todo App',
    image:TodoApp,
    description:'A task management web app inspired by Microsoft To Do, featuring a clean interface for creating, organizing, and tracking daily tasks. Includes features like due dates, priority levels, and list categorization to enhance productivity and task organization.',
    shortDesc: 'Angular with TypeScript,Java Spring Boot, PostgreSQL',
    github:'https://github.com/D0ngk1/todo-app'
  },
  {
    name:'Dictionary', 
    image:Dictionary,
    description:'A web application that leverages a third-party dictionary API to provide word definitions and usage examples. Users can search for words and access comprehensive linguistic information quickly and easily.',
    shortDesc: 'ReactJS',
    github:'https://github.com/D0ngk1/Dictionaryl',
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
          <div className="active-proj-text">  
          <div className="title-link">
            <h1>{activeProj?.name}</h1>
            {activeProj?.github && (
              <a href={activeProj.github} target="_blank"><img src={githubIcon} alt="github icon"/></a>
            )}
          </div>
          <p className="proj-desc">{activeProj?.description}</p>
          </div>
        </div>
        <div className="selector">
         <ul className="select-items-proj">
            {
              proj.map(({name,image},i)=>{
                return (
                <li 
                className={`items ${name.toLowerCase()}-item ${activeProj?.name == name ? "active-item" : "not-active-item"}`}
                key={i}
                onClick={() => selectProject(i+1)}
                style={{backgroundImage:`url(${image})`}}
                ><h3>{name}</h3></li> 
              )})
            }
         </ul>
        </div>
    </>


  );
}
export default TabProjects;
