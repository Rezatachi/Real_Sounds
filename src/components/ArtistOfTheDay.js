import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Text, Box, Image, Link} from "@chakra-ui/react";

const ArtistOfTheDay = ({ token }) => {
  const [artist, setArtist] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const [randomSong, setRandomSong] = useState([]);
  const rotate = 86400000;
  const genre = "jazz";
  useEffect(() => {
    const getArtist = async () => {
        await axios
      .get(`https://api.spotify.com/v1/search`, {
        params: {
          q: `genre:${genre}`,
          type: "artist",
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const artists = response.data.artists.items;
        const randomArtist =
          artists[Math.floor(Math.random() * artists.length)];
        setArtist(randomArtist);
      });
    };
    const getArtistSongs = async () => {
        await axios
        .get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
            params: {
                country: "US",
            },
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const songs = response.data.tracks;
            setArtistSongs(songs);
        });
    };
    const getRandomSong = async () => {
        const randomSong = artistSongs[Math.floor(Math.random() * artistSongs.length)];
        setRandomSong(randomSong);
    };

    const interval = setInterval(() => {
        getArtist();
        getArtistSongs();
        getRandomSong();
    }, rotate);

    return () => {
        clearInterval(interval);
    };
    
  }, [token, genre, rotate, artistSongs, artist]);

  return (
    // make full screen container with padding towards the center
    <Flex
      bg={"gray.800"}
      minH={"80vh"}
      maxWidth={"100vw"}
      color="white"
      justifyContent={"space-around"}
    >
      <Flex
        bg={"gray.900"}
        width={"100%"}
        height="100vh"
        margin="1rem"
        borderRadius={"2xl"}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
          margin={"1rem"}
         
        >
            
          <Text fontSize={"5xl"} fontWeight={"bold"}>
            Artist of the Day
          </Text>
          <Link href={artist.external_urls.spotify} isExternal>
            <Text fontSize={"4xl"} fontWeight={"bold"}>
                {artist.name}
            </Text>
            </Link>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {genre}
          </Text>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Followers: {artist.followers.total}
          </Text>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Rank: {artist.popularity}
          </Text>
        </Flex>
        {/* sample songs from the artist */}
        <Flex
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
          margin={"1rem"}
          p={4}
        >
        {randomSong.album.images ? (
          <Image src={randomSong.album.images[0].url} width="500px" height={"500px"} />
        ) : (
            <Image src={artist.images[0].url} />
        )}
        <Text fontSize={"2xl"} fontWeight={"bold"}>
           Song:  {randomSong.name}
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
           Album: {randomSong.album.name}
          </Text>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {randomSong.album.release_date}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ArtistOfTheDay;
