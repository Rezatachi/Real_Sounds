import React, {useState} from 'react';
import axios from 'axios';
import {Input, Button, Box, Image, Text} from '@chakra-ui/react';
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
        <Box>
            <form onSubmit={searchArtists}>
                <Input type="text" onChange={e => setSearchKey(e.target.value)}/>
                <Button type={"submit"}>Search</Button>
            </form>
            {artists.length > 0 ? artists.map((artists, index) => {
                return (
                    <Box key={index}>
                        {artists.images.length ? <Image width={"100%"} src={artists.images[0].url} alt=""/> : <Text>No Image</Text>}
                        {artists.name}
                    </Box>
                )}
            )
            : <Text></Text>}
        </Box>
    )
}

export default Search;
