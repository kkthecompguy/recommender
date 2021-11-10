import React from "react";

const Resumes = ({resumes}) => {
  return (
    <div className="row">
          {resumes.map((resume, index) => (
            <div key={index} className="col-md-4">
              <div className="card card-body">
                <img src={window.location.origin + resume.filepath} alt="resume" className="card-img-top" />
                <h6>{resume.filename}</h6>
              </div>
            </div>
          ))}
        </div>
  )
}

export default Resumes;