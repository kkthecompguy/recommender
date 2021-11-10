import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { authListener } from '../authListener';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Resumes from '../components/ResumesList';

const Match = () => {
  const [resumes, setResumes] = useState([]);

  const getResumes = async () => {
    const token = authListener();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.get('http://localhost:5000/api/resumes', config)
      return res.data
    } catch (error) {
      console.log(error.message)
      localStorage.removeItem('token')
      return []
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    const token = authListener()
    console.log({token})
    let route = '/login'
    if (token === null) {
      navigate(route);
    }

    async function loadMentors() {
      const data = await getResumes();
      console.log(data);
      setResumes(current => data.resumes);
    }
    loadMentors()
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <Layout>
        <div>
          <Resumes resumes={resumes} />
        </div>
      </Layout>
    </div>
  )
}

export default Match;