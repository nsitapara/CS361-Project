"use client";
import React from "react";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

export default function page() {
  const handleOnClick = () => {
    console.log("Button clicked");
  };
  return (
    <>
      <NavBar />
      <Flex height="90vh" alignItems="center" justifyContent="center">
        <Flex direction="column" p={12} boxShadow="lg" width={400}>
          <Heading mb={6}>Login Page</Heading>
          <Input
            type="email"
            placeholder="Username"
            variant="filled"
            size="lg"
            mb={30}
          />
          <Input
            type="password"
            placeholder="Password"
            variant="filled"
            size="lg"
            mb={6}
          />
          <Button colorScheme="teal" size="lg" onClick={handleOnClick}>
            Log in
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
