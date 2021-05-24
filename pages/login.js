import { Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { getProviders, getSession, getCsrfToken } from "next-auth/client";

export default function loginPage({ providers, csrfToken }) {
  return (
    <Box w="50%" mx="auto">
      <LoginForm token={csrfToken} providers={providers} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders(context);

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
}
