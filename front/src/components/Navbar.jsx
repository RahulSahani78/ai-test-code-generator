import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Get user info from localStorage (set after login)
  const user = JSON.parse(localStorage.getItem('githubUser'));

  const handleLogout = () => {
    localStorage.removeItem('githubToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Test Case Generator</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/repolist">Repository</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link text-white" to="/create-pr">Pull Request</Link>
                </li> */}
                {user?.avatar_url && (
                  <li className="nav-item d-flex align-items-center mx-2">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="rounded-circle"
                      style={{
                        width: 36,
                        height: 36,
                        border: '2px solid #e3e8ef',
                        boxShadow: '0 0 0 2px #f3f6fa',
                        objectFit: 'cover',
                        marginRight: 8,
                      }}
                      title={user.login}
                    />
                    <span className="text-white fw-semibold">{user.login}</span>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-danger nav-link text-white" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}