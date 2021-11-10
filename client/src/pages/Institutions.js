import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { authListener } from '../authListener';
import InstitutionList from '../components/InstitutionList';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);

  const getInstitutions = async () => {
    const token = authListener();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.get('http://localhost:5000/api/institution', config)
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

    async function loadInstitutions() {
      const data = await getInstitutions();
      console.log(data);
      setInstitutions(current => data.institutions);
    }
    loadInstitutions()
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Layout>
        <div>
          <InstitutionList institutions={institutions} />
        </div>
      </Layout>
    </div>
  )
}

export default Institutions;