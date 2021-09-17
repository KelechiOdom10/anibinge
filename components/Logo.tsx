import { Heading, Link, Box } from "@chakra-ui/react";
import React from "react";

export default function Logo() {
  return (
    <Heading
      as={Link}
      href="/"
      _hover={{ textDecoration: "none" }}
      fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
    >
      ani
      <Box
        as="span"
        background="linear-gradient(#5E94F1, #ED64A6)"
        sx={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        binge
      </Box>
    </Heading>
  );
}
