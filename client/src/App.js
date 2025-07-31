// // import logo from './logo.svg';
// import './App.css';

// import { Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// // import AppPage from './pages/yyy'; // We'll build this next

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       {/* <Route path="/app" element={<HomePage />} /> */}
//     </Routes>
//   );
// }




// // export default App;

// // src/App.js
// import React from 'react';

// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import { ToastContainer } from 'react-toastify';
// import LandingPage from './pages/LandingPage';
// import AppPage from './pages/AppPage';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//        <Route path="/" element={<LandingPage />} />
//        <Route path="/app" element={<AppPage />} />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </Router>
//   );
// }

// export default App;


// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

// import LandingPage from './pages/LandingPage';
// import AppPage from './pages/AppPage';

// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/app" element={<AppPage />} />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </Router>
//   );
// }

// export default App;



// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ no BrowserRouter here
import { ToastContainer } from 'react-toastify';

import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;


