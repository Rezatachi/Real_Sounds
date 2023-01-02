import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, {useRef, useEffect} from "react";


const Landing = () => {
    
  // make a cool landing page
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.800"}
      position={"relative"}
    >
      {/* welcome to Real Sounds */}
      <Flex
        as={motion.div}
        flex={1}
        align={"center"}
        justify={"center"}
        direction={"column"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        zIndex={1}
        maxW={"60vw"}
        textAlign={"center"}
      >
        <Heading
          fontSize={"6xl"}
          color={"white"}
        >
          Welcome to Real Sounds
        </Heading>
        <Text fontSize={"2xl"} color={"white"} margin={2}>
          A place to find the best music.
        </Text>
        <Text fontSize={"lg"} color={"white"} fontWeight="600" margin={2}>
            We made this app to help you find the best music. Using Spotify's API, we developed a way to find the best music each day as well as the best music of all time. We hope you enjoy! Feel free to see our code on Github and contact us with any questions or comments.
        </Text>
      </Flex>
      {/* use the ReactPlayer component to play the video */}
      {/* create a moving gradient background */}
        

     </Flex>
    );
  };
  
  export default Landing;
  
