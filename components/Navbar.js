import React from "react";
import { Flex, Heading, Link, Button, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const MenuItem = ({ children, isLast, to = "/" }) => {
  const router = useRouter();
  const isActive = router.pathname === "/";

  return (
    <NextLink href={to} passHref>
      <Link
        mr={{ base: 0, sm: isLast ? 0 : 8 }}
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="medium"
        display="block"
        color={isActive ? "red" : "blue"}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default function Navbar() {
  const [session] = useSession();

  return (
    <Flex
      justifyContent="space-between"
      align="center"
      bg="gray.50"
      py={2}
      px={4}
    >
      <Heading>Anibinge</Heading>

      {!session ? (
        <Flex align="center">
          <MenuItem to="/login">
            <Button colorScheme="blue" variant="ghost">
              Login
            </Button>
          </MenuItem>
          <MenuItem to="/signup" isLast>
            <Button colorScheme="blue">Sign up</Button>
          </MenuItem>
        </Flex>
      ) : (
        <Flex align="center">
          <Avatar
            size="sm"
            name={session.user.name ?? session.user.email}
            color="white"
            fontWeight="bold"
            src={session.user.image}
            mr={2}
          />
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      )}
    </Flex>
  );
}
