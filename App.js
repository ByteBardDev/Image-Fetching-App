import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  // States for login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // States for fetching and displaying images
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false); // New state to track when images are loaded

  // Fetch images after login
  useEffect(() => {
    if (loggedIn) {
      // Fetch 50 images from Unsplash
      axios.get('https://api.unsplash.com/photos/?client_id=Q0FcZ5rFX27-I9rU4LBvI_gAcO9vf5RqQH15bpbO90U&per_page=50')
        .then((response) => {
          setImages(response.data);
          setLoaded(true); // Set loaded to true when images are fetched
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  }, [loggedIn]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to check username and password are filled
    if (username && password) {
      console.log("Username:", username);
      console.log("Password:", password);
      setLoggedIn(true);  // Set login state to true after successful validation
    } else {
      setError('Please fill in both username and password fields');
    }
  };

  return (
    <div className="app-container">
      {!loggedIn ? (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      ) : (
        <div className="image-gallery">
          <h2>Fetched Images</h2>
          <div className="images">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className={`image-card ${loaded ? 'visible' : ''}`}>
                  <img src={image.urls.small} alt={image.alt_description} />
                </div>
              ))
            ) : (
              <p>Loading images...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
