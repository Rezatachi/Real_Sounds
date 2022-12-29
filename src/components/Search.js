import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Image,
  Text,
  Container,
  Box,
  FormControl,
  Flex,
  Grid,
    GridItem,   
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
const Search = ({ token }) => {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchKey}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      }
    );
    if (data.artists.items.length > 0) {
      setArtists(data.artists.items);
    } else {
      setArtists([]);
    }
  };
  return (
    <Container bg={"gray.800"} minH={"100vh"} maxWidth={"100vw"} color="white">
      <Text p={5} fontSize={"5xl"} fontWeight={"bold"}>
        Search for an artist.
      </Text>
      {/* make search button right next to the search text area */}
      <Flex ml={5} mt={-4}>
          <FormControl w={"500px"} >
            <form onSubmit={searchArtists} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
              <Input
                type="text"
                placeholder="Lookup your favorite artist"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                mr={2}
              />
              <Button colorScheme={"blue"} type="submit">
                <FaSearch />
              </Button>
            </form>
          </FormControl>
        </Flex>
      {/* Make a big grid then make a smaller grid for each mapping */}
      {/* center the grid in the midle */}
      <Flex justify={"center"}>
        <Grid templateColumns="repeat(4, 1fr)" gap={20} p={5}>
        {artists.map((artist, index) => (
            <GridItem key={artist.id}>
                <a href={artist.external_urls.spotify}>
                <Box
                    maxW={"sm"}
                    borderWidth="2px"
                    borderRadius="lg"
                    overflow="hidden"
                    key={index}
                    borderColor="gray.500"
                    _hover={{
                        borderColor: "white",
                    }
                }
                    transition="all 0.2s"

                >
                    {artist.images.length > 0 ? (
                        <Image
                            src={artist.images[0].url}
                            alt={artist.name}
                            width="100%"
                            height="100%"
                            objectFit={"cover"}
                        />
                    ) : (
                        <Image
                            src="https://via.placeholder.com/150"
                            alt={artist.name}
                            width="100%"
                            height="100%"
                        />
                    )}
                    <Box p="6" key={index} >
                        <Box d="flex" alignItems="baseline" key={index}>
                            <Box

                                color="gray.200"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="lg"
                                textTransform="uppercase"
                                ml="2"
                                key={index}
                            >
                                {artist.name}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                </a>
            </GridItem>
        ))}
        </Grid>
        </Flex>
    </Container>
  );
};

export default Search;
