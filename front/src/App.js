
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Home from './pages/Home';
// import SelectFilesPage from './pages/SelectFilesPage';
// import SummaryPage from './pages/SummaryPage';
// import CodeGenerationPage from './pages/CodeGenerationPage';
// import PRPage from './pages/PRPage';
// import Navbar from './components/Navbar';
// import RepoList from './components/RepoList';
// import OAuthSuccess from './pages/OAuthSuccess';
// import Footer from './components/Footer';

// function App() {
//   const [selectedRepo, setSelectedRepo] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('githubToken');
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleRepoSelect = (repo) => {
//     setSelectedRepo(repo);
//     navigate('/select-files');
//   };

//   return (
//     <>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <div className="d-flex flex-column min-vh-100">
//         <div className="container flex-grow-1 mt-4">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/oauth-success"
//               element={<OAuthSuccess setIsLoggedIn={setIsLoggedIn} />}
//             />
//             <Route
//               path="/repolist"
//               element={<RepoList onRepoSelect={handleRepoSelect} />}
//             />
//             <Route
//               path="/select-files"
//               element={<SelectFilesPage selectedRepo={selectedRepo} />}
//             />
//             <Route path="/summaries" element={<SummaryPage />} />
//             <Route path="/generate-code" element={<CodeGenerationPage />} />
//             <Route path="/create-pr" element={<PRPage />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default App;





import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import SelectFilesPage from './pages/SelectFilesPage';
import SummaryPage from './pages/SummaryPage';
import CodeGenerationPage from './pages/CodeGenerationPage';
import PRPage from './pages/PRPage';
import Navbar from './components/Navbar';
import RepoList from './components/RepoList';
import OAuthSuccess from './pages/OAuthSuccess';
import Footer from './components/Footer';

function App() {
  const [selectedRepo, setSelectedRepo] = useState(() => {
    // Load selectedRepo from localStorage on initial render
    const saved = localStorage.getItem('selectedRepo');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('githubToken');
    setIsLoggedIn(!!token);
  }, []);

  // Whenever selectedRepo changes, save it to localStorage
  useEffect(() => {
    if (selectedRepo) {
      localStorage.setItem('selectedRepo', JSON.stringify(selectedRepo));
    } else {
      localStorage.removeItem('selectedRepo');
    }
  }, [selectedRepo]);

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
    navigate('/select-files');
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="d-flex flex-column min-vh-100">
        <div className="container flex-grow-1 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/oauth-success"
              element={<OAuthSuccess setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/repolist"
              element={<RepoList onRepoSelect={handleRepoSelect} />}
            />
            <Route
              path="/select-files"
              element={<SelectFilesPage selectedRepo={selectedRepo} />}
            />
            <Route path="/summaries" element={<SummaryPage />} />
            <Route path="/generate-code" element={<CodeGenerationPage />} />
            <Route path="/create-pr" element={<PRPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

