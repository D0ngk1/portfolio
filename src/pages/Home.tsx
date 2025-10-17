import "./Home.css";
//import Header from "../components/Header/Header.tsx";
import Header from "@/components/Layout/Header/Header.tsx"
import AboutMe from "@/components/Layout/About-Me/AboutMe.tsx"
import Cert from "@/components/Layout/Cert/Cert.tsx"
import {useState} from "react";   
export default function Home(){
  const [active, setActive] = useState<string>("about");
  const sections = [
    { key: "about", Component: AboutMe},
    { key: "cert", Component: Cert },
    //{ key: "pro}
  ]
  
  return (
    <>
      <div className="main-background">
        <Header />
        <div className="desktop">
          {
            sections.map(({key,Component}) => (
              <Component 
              key = {key}
              onClick = {()=> setActive(key)}
              style={{zIndex:active == key ? 2 : 1}} />
            ))
          }
        </div>
        
      </div>
      
    </>
  );
}
