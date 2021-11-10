import React, {useState} from 'react';
import { useNavigate }  from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    role: 'admin',
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(current => {
      return {...current, [e.target.name]: e.target.value}
    });
  }

  const {name, email, password, password2 } = formData;

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);

    if (password !== password2) {
      setErrors('passwords do not match');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let data = formData;
  
      const res = await axios.post('http://localhost:5000/api/users/register', data, config);
      console.log(res.data)
      let route = '/login';
      navigate(route)
    } catch (error) {
      setErrors('something went wrong. please try again')
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <div className="card card-body mt-5">
            <h2 className="text-center">REGISTER</h2>
            <form onSubmit={e => handleSubmit(e)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                 type="text" 
                 name="name" 
                 id="name" 
                 required 
                 className="form-control" 
                 onChange={e => handleChange(e)}
                 value={name}
                 placeholder="John Doe"/>
              </div>
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                 type="password" 
                 name="password2" 
                 id="password2" 
                 required 
                 value={password2}
                 onChange={e => handleChange(e)}
                 className="form-control"/>
              </div>
              <div className="form-group text-center mt-4">
                <button type="submit" className="btn btn-primary btn-sm">Register</button>
              </div>

              {errors && <div className="pwd-error text-center mt-2 mb-2">
                  {errors}
                </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;