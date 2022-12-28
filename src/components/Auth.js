import React from "react";
// make a landing page for the user to login to spotify
// use chalkra ui for the landing page
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const Auth = () => {
    return (
        <>
        <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"gray.50"}
        >
            <Flex
            direction={"column"}
            bg={"white"}
            rounded={"md"}
            p={12}
            justify={"center"}
            textAlign={"center"}
            >
                <Heading mb={6}>Real Sounds</Heading>
                <Text mb={6}>
                    This is a simple app that allows you to search for artists on Spotify.
                </Text>
                <Button
                colorScheme={"blue"}
                onClick={() => {
                    window.location.href =`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`;
                }}
                >
                    Login to Spotify
                </Button>

            </Flex>
        </Flex>
        </>
    );
    }

export default Auth;