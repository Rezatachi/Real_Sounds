import React from "react";
import {Link} from "react-router-dom";
import {Button, Flex} from "@chakra-ui/react";

const Nav = ({logout}) => {
    return (
        <Flex justifyContent="space-between" alignItems="center" p={5} bg={"gray.800"}>
            <Flex alignItems="center">
                <Link to="/">
                    <Button colorScheme="blue">Search</Button>
                </Link>
            </Flex>
            <Button colorScheme="red" onClick={logout}>Logout</Button>
        </Flex>
    )
}

export default Nav;