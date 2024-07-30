
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PersonalInformation from './components/PersonalInformation';
import AdditionalInformation from './components/AdditionalInformation';
import Education from './components/Education';
import JobPreferences from './components/JobPreferences';
import WorkExperience from './components/WorkExperience';
import './App.css';

const steps = [
  { name: 'Personal Information', path: '/' },
  { name: 'Education', path: '/education' },
  { name: 'Job Preferences', path: '/preferences' },
  { name: 'Work Experience', path: '/work' },
  { name: 'Additional Information', path: '/additional' },
];

const StepComponent = ({ Component }) => {
  const navigate = useNavigate();
  const currentIndex = steps.findIndex(step => step.path === window.location.pathname);

  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1].path);
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1].path);
    }
  };

  return (
    <>
      <Component />
      <div className="navigation-buttons">
        {currentIndex > 0 && (
          <button onClick={prevStep} className="prev-button">
            Previous
          </button>
        )}
        {currentIndex < steps.length - 1 && (
          <button onClick={nextStep} className="next-button">
            Next
          </button>
        )}
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar steps={steps} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<StepComponent Component={PersonalInformation} />} />
            <Route path="/additional" element={<StepComponent Component={AdditionalInformation} />} />
            <Route path="/education" element={<StepComponent Component={Education} />} />
            <Route path="/preferences" element={<StepComponent Component={JobPreferences} />} />
            <Route path="/work" element={<StepComponent Component={WorkExperience} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import PersonalInformation from './components/PersonalInformation';
// import AdditionalInformation from './components/AdditionalInformation';
// import Education from './components/Education';
// import JobPreferences from './components/JobPreferences';
// import WorkExperience from './components/WorkExperience';
// import './App.css';

// const steps = [
//   { name: 'Personal Information', path: '/' },
//   { name: 'Education', path: '/education' },
//   { name: 'Job Preferences', path: '/preferences' },
//   { name: 'Work Experience', path: '/work' },
//   { name: 'Additional Information', path: '/additional' },
// ];

// const StepComponent = ({ Component }) => {
//   const navigate = useNavigate();
//   const currentIndex = steps.findIndex(step => step.path === window.location.pathname);

//   const nextStep = () => {
//     if (currentIndex < steps.length - 1) {
//       navigate(steps[currentIndex + 1].path);
//     }
//   };

//   const prevStep = () => {
//     if (currentIndex > 0) {
//       navigate(steps[currentIndex - 1].path);
//     }
//   };

//   return (
//     <>
//       <Component />
//       <div className="navigation-buttons">
//         {currentIndex > 0 && (
//           <button onClick={prevStep} className="prev-button">
//             Previous
//           </button>
//         )}
//         {currentIndex < steps.length - 1 && (
//           <button onClick={nextStep} className="next-button">
//             Next
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Sidebar steps={steps} />
//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<StepComponent Component={PersonalInformation} />} />
//             <Route path="/additional" element={<StepComponent Component={AdditionalInformation} />} />
//             <Route path="/education" element={<StepComponent Component={Education} />} />
//             <Route path="/preferences" element={<StepComponent Component={JobPreferences} />} />
//             <Route path="/work" element={<StepComponent Component={WorkExperience} />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;