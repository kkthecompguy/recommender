import React, { useState } from "react";
import { authListener } from "../authListener";
import axios from 'axios';

const UploadResume = () => {
  const [file, setFile] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')
  console.log({file})

  const handleSubmit = async e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('file', file);
    const token = authListener()
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      const data  = formData;
      await axios.post('http://localhost:5000/api/resume/upload', data, config)
      setFile('')
      setSuccess('file uploaded successfully')
    } catch (error) {
      console.log(error)
      setErrors('something went wrong')
    }
  }


  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-8 mx-auto">
          <div className="card card-body">
            <div className="text-center mt-4 mb-4">
              <h2>Resume File Upload</h2>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group">
                <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} name="file" />
              </div>
              <div className="form-group py-2">
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </div>
              { success && <div className="alert alert-success">{success}</div>}
              { errors && <div className="alert alert-danger">{errors}</div>}
            </form>
            <div className="preview">
              <img src={file} alt="preview" className="card-img-top" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadResume;