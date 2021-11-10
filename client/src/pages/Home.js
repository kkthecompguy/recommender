import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { authListener } from '../authListener';
import UploadResume from '../components/Upload';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = authListener()
    console.log({token})
    let route = '/login'
    if (token === null) {
      navigate(route);
    }
  }, [navigate]);
  
  return (
    <div>
      <Navbar />
      <Layout>
        <div>
          <UploadResume />
        </div>
      </Layout>
    </div>
  )
}

export default Home;