const workExperience = [
  //{ companyName:'', year:'',role:''},
  { companyName:'Amdocs', year:'September 2023 - March 2022',role:'Software Engineer'},
  { companyName:'MR. GEEK', year:'July 2021- May 2021',role:'Web Devoloper Intern'},
  { companyName:'Capstone Projects', year:'',role:'Team leader / Lead Designer / Lead Developer'},
];
const TabProjects = () => {
  return (
    <>
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
    </>
  )
}

export default TabProjects;
