import './App.css';
import jwtDecode from 'jwt-decode'; // Import jwtDecode
import {Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import Home from './components/Homepage/Home';
import OnboardingForm from './components/Onboarding/Onboarding_form';
import HR_Onboarding from './components/HR-Onoarding/HR_Onboarding';
import Sup_Onboarding from './components/HR-Onoarding/Sup_Onboarding';
import AccessDenied from './components/Access/AccessDenied'; 

function App() {

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        // Token has expired, remove it from local storage
        localStorage.removeItem('token');
      }
    }
  };

  checkTokenExpiration();


  return (
      <div className="App">

        <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/" element={<LoginForm/>}/>
              <Route path='/Onboarding_form' element={<OnboardingForm/>} />
              <Route path='/HR_Onboarding' element={<HR_Onboarding/>}/>
              <Route path='/Sup_Onboarding' element={<Sup_Onboarding/>}/>
              <Route path='/Access_Denied' element={<AccessDenied/>}/>
        </Routes>
      </div>
  );
}

export default App;
