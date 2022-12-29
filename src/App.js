import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from './theme';
import {Route, Routes} from 'react-router-dom';
// imported components
import Auth from './components/Auth';
import Search from './components/Search';
import Nav from './components/Nav';
function App() {

  const [token, setToken] = useState(null);
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
   <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      {!token ? 
        <Auth />
      : <>
      <Nav logout={logout} currentUser={currentUser}/>
      <Routes>
        <Route path="/" element={<Search token={token}/>}/>
      </Routes>
      
      </>
      }
    </ChakraProvider>
  );
}

export default App;
