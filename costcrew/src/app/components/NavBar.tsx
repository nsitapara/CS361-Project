import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
export default function NavBar() {
  return (
    <Flex minWidth="max-content" pt="10px">
      <Link href="/">
        <Box p="2">
          <Heading size="md">CostCrew</Heading>
        </Box>
      </Link>
      <Spacer />
      <ButtonGroup gap="2">
        <Link href="/register">
          <Button colorScheme="teal">Register</Button>
        </Link>
        <Link href="/login">
          <Button colorScheme="teal">Log in</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}
