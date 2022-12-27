import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
  const [token, setToken] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const hash = window.location.hash
    // local storage is basically cache
    let token = window.localStorage.getItem('token');
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);
  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
  }

  const searchArtists = async (e) => {
    e.preventDefault();
    const {data} = await axios.get(`https://api.spotify.com/v1/search?q=${searchKey}&type=artist`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    });
    setArtists(data.artists.items);
  }

  useEffect(() => {
    if (token) {
      axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setCurrentUser(response.data.display_name);
      })
    }
  }, [token]);

  return (
    <div>
      {!token ? 
        <a href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`}>Login to Spotify</a>
      : <><form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
        <button type={"submit"}>Search</button>
        <p>Hello, {currentUser}</p>
      </form>
      <button onClick={logout}>Logout</button></>
        
      }
       
    </div>
  );
}

export default App;
