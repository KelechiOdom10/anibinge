import { Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { getProviders, getSession, getCsrfToken } from "next-auth/client";
import { GetServerSideProps } from "next";

export default function loginPage({ providers, csrfToken }) {
  return (
    <Box w="50%" mx="auto">
      <LoginForm token={csrfToken} providers={providers} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  if (session && res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return { props: {} };
  }

  return {
    props: { providers, csrfToken },
  };
};
