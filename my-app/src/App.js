import './App.css';
import {Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import Home from './components/Homepage/Home';
import OnboardingForm from './components/Onboarding/Onboarding_form';
import HR_Onboarding from './components/HR-Onoarding/HR_Onboarding';

function App() {
  return (
      <div className="App">
        <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/" element={<LoginForm/>}/>
              <Route path='/Onboarding_form' element={<OnboardingForm/>} />
              <Route path='/HR_Onboarding' element={<HR_Onboarding/>}/>
        </Routes>
      </div>
  );
}

export default App;
