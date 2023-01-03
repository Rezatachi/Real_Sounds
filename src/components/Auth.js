import React from "react";
// make a landing page for the user to login to spotify
// use chalkra ui for the landing page
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Auth = () => {
  return (
    <>
      <Flex
        as={motion.div}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"gray.800"}
      >
        <Flex
          direction={"column"}
          color={"white"}
          bg={"blue.800"}
          rounded={"md"}
          p={12}
          justify={"center"}
          textAlign={"center"}
        >
          <Heading mb={6}>RealSounds</Heading>
          <Text mb={6}>
            This is a simple app that allows you to search for artists on
            Spotify.
          </Text>
          <motion.div
            style={{ width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              width={"100%"}
              colorScheme="green"
              onClick={() => {
                window.location.href = `${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=${process.env.REACT_APP_SCOPES_LIST}`;
              }}
            >
              Login to Spotify
            </Button>
          </motion.div>
        </Flex>
        {/* footer for logo */}
        {/* center a flex on the bottom part of the screen  */}
        <Flex
          position={"absolute"}
          bottom={0}
          w={"100%"}
          h={"10vh"}
          align={"center"}
          justify={"center"}
        >
          {/* make is centered and horizontla */}
      </Flex>
      </Flex>
    </>
  );
};

export default Auth;
