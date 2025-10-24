import "./AboutMe.css";
import Windows from "@/components/UI/Windows.tsx";
import selfie from "@/assets/profile-picture.png";
//import selfiePaint from "@/assets/profile-picture-oil-painted.png";
import githubIcon   from "@/assets/github-light.png";
import linkedInIcon from "@/assets/linkedin-light.png";
import gmailIcon    from "@/assets/gmail-light.png";

/*interface SectionProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}*/
export default function AboutMe() {
  return (
    <div className="about-me" >
      <Windows  title='About Me'/>
      <div className="content">
        <div className="profile">
            <img className="profile-picture" src={selfie} alt="daryl"/>
            
        </div>
        <div className="about-name">Daryl G. Guzman</div>
        <div className="job-title">Software Engineer | IT Specialist</div>
        <div className="education">BS in Computer Science</div>
        <div className="links-containers">
          <div className="github-icon icon-containers"><a href="https://github.com/D0ngk1" target="_blank"><img src={githubIcon} className="github-img icons" alt="github icon" /></a></div>
          <div className="linkedIn-icon icon-containers"><a href="https://www.linkedin.com/in/daryl-guzman-82556a256/" target="_blank"> <img src={linkedInIcon} className="linkedin-img icons" alt="linked-in icon" /></a></div>
          <div className="gmail-icon icon-containers"><img src={gmailIcon} alt="gmail icon" className="icons" /></div>
          
        </div>
      </div>
    </div>
    
  );
}
