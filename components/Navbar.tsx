import React, { ReactNode } from "react";
import { Link, Button, Avatar, HStack, Input, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/client";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Logo from "./Logo";

interface MenuItemProps {
  children: ReactNode;
  to: string;
}

const MenuItem = ({ children, to = "/" }: MenuItemProps) => {
  return (
    <NextLink href={to} passHref>
      <Link
        _hover={{ textDecoration: "none" }}
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="medium"
        display="block"
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default function Navbar() {
  const [session, loading] = useSession();

  return (
    <Box as="nav" p={4} boxShadow="md" position="sticky">
      <HStack
        justifyContent="space-between"
        align="center"
        spacing={{ base: 12, md: 16 }}
        maxW="container.xl"
        mx="auto"
      >
        <Logo />

        <Input
          size="sm"
          bg="white"
          _placeholder={{ color: "gray.500" }}
          color="gray.800"
          placeholder="Search on anibinge"
        />

        <HStack align="center">
          <ColorModeSwitcher />
          {loading && <></>}
          {!session && (
            <HStack spacing={4} align="center">
              <MenuItem to="/login">
                <Button colorScheme="blue" variant="ghost">
                  Login
                </Button>
              </MenuItem>

              <MenuItem to="/signup">
                <Button colorScheme="blue">Sign up</Button>
              </MenuItem>
            </HStack>
          )}
          {session && (
            <HStack spacing={4} align="center">
              <Avatar
                size="sm"
                name={session.user.name ?? session.user.email}
                color="white"
                fontWeight="bold"
                src={session.user.image}
                mr={2}
              />
              <Button onClick={() => signOut()}>Sign Out</Button>
            </HStack>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}
