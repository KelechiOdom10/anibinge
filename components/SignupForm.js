import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  Stack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import FormDivider from "./FormDivider";

const icons = {
  github: <AiFillGithub />,
  google: <FcGoogle />,
  twitter: <AiOutlineTwitter />,
};

export default function SignupForm({ providers, token }) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = values;
  const [show, setShow] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const signup = async payload => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    const { status, message } = await res.json();

    if (status === "error") {
      toast({
        title: "Error",
        variant: "left-accent",
        position: "top-right",
        description: message,
        status: "error",
        isClosable: true,
        duration: 4000,
      });
      return;
    }

    if (status === "success") {
      toast({
        title: "Account created.",
        variant: "left-accent",
        position: "top-right",
        description: "We've created your account for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      router.push("/login");
    }
  };
  const toggle = e => {
    setShow(!show);
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    signup({ username, email, password });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Text
          as="h2"
          fontSize="lg"
          textAlign="center"
          marginTop={2}
          fontWeight="medium"
        >
          Get Started
        </Text>

        <Stack spacing={6}>
          <FormControl id="username" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Email address
            </FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={handleChange}
                fontSize={{ base: "sm", md: "md" }}
              />
              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  onClick={toggle}
                  colorScheme="gray"
                  icon={show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" w="full">
            Sign Up
          </Button>
        </Stack>
        <Box>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Already have an account?{" "}
            <Link color="blue.500" fontWeight="bold" href="/login">
              Sign In
            </Link>
          </Text>
        </Box>
      </form>
      <FormDivider text="or" />
      {Object.values(providers).map(provider => {
        if (provider.name === "Credentials") {
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
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: `${process.env.NEXTAUTH_URL}`,
              })
            }
          >
            Sign Up with {provider.name}
          </Button>
        );
      })}
    </Box>
  );
}
