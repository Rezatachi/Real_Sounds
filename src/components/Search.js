import React, {useState} from 'react';
import axios from 'axios';

const Search = ({token}) => {
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);
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
        if (data.artists.items.length > 0){
            setArtists(data.artists.items);
        }else{
            setArtists([]);
        }
      }
    return (
        <div>
            <form onSubmit={searchArtists}>
      <input type="text" onChange={e => setSearchKey(e.target.value)}/>
      <button type={"submit"}>Search</button>
      {artists.length > 0 ? artists.map((artists, index) => {
          return (
              <div key={index}>
                  {artists.images.length ? <img width={"100%"} src={artists.images[0].url} alt=""/> : <div>No Image</div>}
                  {artists.name}
              </div>
          )})
      : <p></p>}
      </form>
        </div>
    )
}

export default Search;
