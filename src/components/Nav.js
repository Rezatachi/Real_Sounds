import React from "react";
import {Link} from "react-router-dom";
import {Button, Flex, Text, Spinner} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";

const Nav = ({logout, currentUser}) => {
    return (
        <Flex justifyContent="space-between" alignItems="center" p={5} bg={"gray.800"}>
            <Flex alignItems="center" ml={4}>
                <Link to="/">
                    <Button colorScheme="gray" mr={4}><FaHome /></Button>
                </Link>
                <Link to="/search">
                    <Button colorScheme="gray">Search</Button>
                </Link>
                <Link to="/top-tracks">
                    <Button colorScheme="gray" ml={4}>Top Tracks</Button>
                </Link>
                <Link to="/artist-of-the-day">
                    <Button colorScheme="blackAlpha" variant={"outline"} color="gray.200" ml={4} _hover={{borderColor: "cyan"}} transition="all 0.3s">Artist of the Day</Button>
                </Link>
            </Flex>
            <Flex justifyContent="space-around" alignItems="center" minW={"300px"}>
            <Text color="white" ml={3} fontSize="large" fontWeight="semibold">Welcome, {!currentUser ? <Spinner/> : currentUser}</Text>
            <Button colorScheme="red" onClick={logout}>Logout</Button>
            </Flex>
        </Flex>
    )
}

export default Nav;