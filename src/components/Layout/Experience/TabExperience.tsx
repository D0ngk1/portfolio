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
        <div className="right-box">
        <span className="vertical-line-center"></span>
            <div className="item item-right-first">
                <div className="indicator-icon indicator-icon-left">
                  <span className="horizontal-line-left horizontal-line"></span>
                  <span className="circle-left circle"></span>
                </div>
                <div className="item-left-content item-content">
                     <h2 className="company">Relatives & Friends</h2>
                     <h4 className="job-title">Personal IT Specialist</h4>
                     <h4 className="year">Current - 2014</h4>
                 </div>
            </div>
          { workExperience.map(({companyName,year,role}) => (
            <div className="item item-right" key={`${companyName}${year}`}>
                  <div className="indicator-icon">
                    <span className="horizontal-line-right horizontal-line"></span>
                    <span className="circle-right circle"></span>
                  </div>
                  <div className="item-right-content item-content">
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
