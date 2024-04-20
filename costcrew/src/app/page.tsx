// app/page.tsx
"use client";
import { Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
export default function Page() {
  return (
    <>
      <NavBar />
      <Heading>Welcome to CostCrew,</Heading>
      <Heading size="md">
        With CostCrew, easily create expense groups for any situation - trips,
        households, social circles and more. Simply log expenses as you go, and
        our app automatically calculates fair shares based on your custom
        splitting rules. No more forgetting who paid for what or dealing with
        crumpled receipts.
      </Heading>
    </>
  );
}
