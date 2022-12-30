import React from "react";
import {Link} from "react-router-dom";
import {Button, Flex, Text} from "@chakra-ui/react";

const Nav = ({logout, currentUser}) => {
    return (
        <Flex justifyContent="space-between" alignItems="center" p={5} bg={"gray.800"}>
            <Flex alignItems="center" ml={4}>
                <Link to="/">
                    <Button colorScheme="messenger">Search</Button>
                </Link>
                <Link to="/top-tracks">
                    <Button colorScheme="messenger" ml={4}>Top Tracks</Button>
                </Link>
            </Flex>
            <Flex justifyContent="space-around" alignItems="center" minW={"300px"}>
            <Text color="white" ml={3} fontSize="large" fontWeight="semibold">Welcome, {currentUser}</Text>
            <Button colorScheme="red" onClick={logout}>Logout</Button>
            </Flex>
        </Flex>
    )
}

export default Nav;