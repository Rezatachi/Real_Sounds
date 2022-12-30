import React, {useState, useEffect} from "react";
import axios from "axios";
import {Container, Grid, GridItem, Box, Image, Badge, Text, Link} from "@chakra-ui/react";

const TopTracks = ({token}) => {
    
        const [topTracks, setTopTracks] = useState([]);
        useEffect(() => {
            if (token) {
                axios.get("https://api.spotify.com/v1/me/top/tracks", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    setTopTracks(response.data.items)
                }
                )
            }
        }, [token]);
        return (
            <Container bg={"gray.800"} minH={"100vh"} maxWidth={"100vw"} color="white">
                <Text p={5} fontSize={"5xl"} fontWeight={"bold"}>
                    Top Tracks
                </Text>
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    {topTracks.map((track, index) => (
                        <Link href={track.external_urls.spotify} isExternal>
                        <GridItem key={index}>
                            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <Image src={track.album.images[0].url} alt={track.name} />
                                <Box p="6">
                                    <Box d="flex" alignItems="baseline">
                                        <Badge borderRadius="full" px="2" colorScheme="teal">
                                            {track.album.name}
                                        </Badge>
                                    </Box>
                                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                                        {track.name}
                                    </Box>
                                    <Box>
                                        {track.artists.map((artist, index) => (
                                            <Text key={index} fontSize="sm">
                                                {artist.name}
                                            </Text>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                        </Link>
                    ))}
                </Grid>
            </Container>
        )
    }

    export default TopTracks;