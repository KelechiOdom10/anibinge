import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const icons = {
  github: <AiFillGithub />,
  google: <FcGoogle />,
  twitter: <AiOutlineTwitter />,
};

export default function LoginForm({ providers, token }) {
  const router = useRouter();
  return (
    <Box>
      <form method="post" action="/api/auth/signin/email">
        <Text
          as="h2"
          fontSize="lg"
          textAlign="center"
          marginTop={2}
          fontWeight="medium"
        >
          Welcome Back!
        </Text>

        <Stack spacing={6}>
          <Input name="csrfToken" type="hidden" defaultValue={token} />
          <FormControl id="email" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Email address
            </FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <Button type="submit">Sign In</Button>
        </Stack>
        <Box>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Don't have an account?{" "}
            <Link color="blue.500" fontWeight="bold" href="/signup">
              Sign Up
            </Link>
          </Text>
        </Box>
      </form>
      {Object.values(providers).map(provider => {
        if (provider.name === "Email") {
          return;
        }

        return (
          <Button
            variant="outline"
            w="full"
            key={provider.name}
            my={2}
            leftIcon={icons[provider.id]}
            colorScheme={provider.id}
            onClick={
              () =>
                signIn(provider.id, {
                  callbackUrl: `${process.env.NEXTAUTH_URL}`,
                }) // router.query.callbackUrl
            }
          >
            Sign in with {provider.name}
          </Button>
        );
      })}
    </Box>
  );
}
