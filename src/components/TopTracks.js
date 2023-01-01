import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  GridItem,
  Box,
  Image,
  Badge,
  Text,
  Link,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

const TopTracks = ({ token }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [timeRange, setTimeRange] = useState("long_term");
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState(null);
  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setTopTracks(response.data.items);
        });
    }
  }, [token, timeRange]);

  const playAudio = (previewUrl) => {
    if (previewUrl === currentPreviewUrl) {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.play();
        setPlaying(true);
      }
    } else {
      const audioElement = new Audio(previewUrl);
      audioElement.play();
      setAudio(audioElement);
      setPlaying(true);
      setCurrentPreviewUrl(previewUrl);
    }
  };
  return (
    <Container bg={"gray.800"} minH={"100vh"} maxWidth={"100vw"} color="white">
      <Flex justifyContent="space-between" alignItems="center" p={3}>
        <Text p={5} fontSize={"5xl"} fontWeight={"bold"}>
          Top Tracks
        </Text>
        <Flex flex={"right"}>
          <Button
            colorScheme="teal"
            variant="outline"
            size="lg"
            m={1}
            fontSize={"2xl"}
            fontWeight={"bold"}
            onClick={() => setTimeRange("long_term")}
          >
            <Text>All Time</Text>
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            size="lg"
            m={1}
            fontSize={"2xl"}
            fontWeight={"bold"}
            onClick={() => setTimeRange("medium_term")}
          >
            <Text>6 Months</Text>
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            size="lg"
            m={1}
            fontSize={"2xl"}
            fontWeight={"bold"}
            onClick={() => setTimeRange("short_term")}
          >
            <Text>4 Weeks</Text>
          </Button>
        </Flex>
      </Flex>
      {/* make a collage grid */}
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={6}
        justifyContent="center"
        alignItems={"center"}
      >
        {topTracks.map((track, index) => {
          return (
            <GridItem key={index}>
              <Box
                maxW={"sm"}
                borderWidth="2px"
                borderRadius="lg"
                overflow="hidden"
                borderColor="gray.500"
                    _hover={{
                        borderColor: "white",
                    }
                }
                    transition="all 0.2s"
              >
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Badge
                      borderRadius="full"
                      px="2"
                      colorScheme="blue"
                      color="black"
                    >
                      {track.album.album_type}
                    </Badge>
                  </Box>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {track.name + " "}
                  </Box>
                  <Box>
                    {track.artists.map((artist, index) => {
                      return (
                        <Link
                          key={index}
                          href={artist.external_urls.spotify}
                          isExternal
                        >
                          {artist.name}
                        </Link>
                      );
                    })}
                  </Box>
                  {!track.preview_url ? (
                    <Box p={1}></Box>
                    ): (<Box p={1}>
                    <Button colorScheme="teal" variant="outline" size="sm" onClick={() => playAudio(track.preview_url)}>
                      {playing && currentPreviewUrl === track.preview_url ? (
                        <FaPause />
                      ) : (
                        <FaPlay />
                      )}
                    
                    </Button>
                  </Box>
                  )
                  }
                  
                  
                </Box>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
};

export default TopTracks;
