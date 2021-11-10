import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { authListener } from '../authListener';
import Layout from '../components/Layout';
import MentorsList from '../components/MentorsList';
import Navbar from '../components/Navbar';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);

  const getMentors = async () => {
    const token = authListener();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.get('http://localhost:5000/api/mentors', config)
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
      const data = await getMentors();
      console.log(data);
      setMentors(current => data.mentors);
    }
    loadMentors()
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Layout>
        <div>
          <MentorsList mentors={mentors} />
        </div>
      </Layout>
    </div>
  )
}

export default Mentors;