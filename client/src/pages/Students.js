import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { authListener } from '../authListener';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import StudentsList from '../components/StudentsList';

const Students = () => {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const token = authListener();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.get('http://localhost:5000/api/users', config)
      return res.data
    } catch (error) {
      console.log(error.message)
      localStorage.removeItem('token')
      return []
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    const token = authListener();
    let route = '/login';
    if (token === null) {
      navigate(route);
    }

    async function loadStudents() {
      const data = await getStudents();
      console.log(data);
      setStudents(current => data.users);
    }
    loadStudents()
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Layout>
        <div>
          <StudentsList students={students} />
        </div>
      </Layout>
    </div>
  )
}

export default Students;