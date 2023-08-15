import './App.css';
import {Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import Home from './components/Homepage/Home';
import OnboardingForm from './components/Onboarding/Onboarding_form';

function App() {
  return (
      <div className="App">
        <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/" element={<LoginForm/>}/>
              <Route path='/Onboarding_form' element={<OnboardingForm/>} />
        </Routes>
      </div>
  );
}

export default App;
