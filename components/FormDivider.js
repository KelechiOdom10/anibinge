import { Flex, Divider } from "@chakra-ui/react";
import React from "react";

export default function FormDivider({ text }) {
  return (
    <Flex align="center" my={2}>
      <Divider mr={2} />
      {text}
      <Divider ml={2} />
    </Flex>
  );
}
