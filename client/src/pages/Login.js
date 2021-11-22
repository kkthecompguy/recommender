import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    role: 'admin',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(current => {
      return {...current, [e.target.name]: e.target.value}
    });
  }

  const { email, password } = formData;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let data = formData;
  
      const res = await axios.post('http://localhost:5000/api/users/login', data, config);
      console.log(res.data)
      localStorage.setItem("token", res.data.token)
      let route = '/';
      navigate(route)
    } catch (error) {
      setErrors('email or password is incorrect')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <div className="card card-body mt-5">
            <h2 className="text-center">LOGIN</h2>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                 type="email" 
                 name="email" 
                 id="email" 
                 required 
                 className="form-control" 
                 onChange={e => handleChange(e)}
                 value={email}
                 placeholder="someone@example.com"/>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email">Role</label>
                <select name="role" onChange={e => handleChange(e)} className="form-select">
                  <option value="admin">Admin</option>
                  <option value="mentor">Mentor</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password</label>
                <input
                 type="password" 
                 name="password" 
                 id="password" 
                 required 
                 value={password}
                 onChange={e => handleChange(e)}
                 className="form-control"/>
              </div>
              <div className="form-group text-center mt-4">
                <button type="submit" className="btn btn-primary btn-sm">Login</button>
              </div>

              {errors && <div className="pwd-error text-center mt-2 mb-2">
                  email or password is incorrect
                </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;