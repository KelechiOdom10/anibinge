import { Box } from "@chakra-ui/react";
import SignupForm from "../components/SignupForm";
import { getProviders, getSession } from "next-auth/client";
import { GetServerSideProps } from "next";

export default function loginPage({ providers }) {
  return (
    <Box w="50%" mx="auto">
      <SignupForm providers={providers} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  const providers = await getProviders();

  if (session && res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return { props: {} };
  }

  return {
    props: { providers },
  };
};
