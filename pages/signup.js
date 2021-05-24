import { Box } from "@chakra-ui/react";
import SignupForm from "../components/SignupForm";
import { getProviders, getSession } from "next-auth/client";

export default function loginPage({ providers, csrfToken }) {
  return (
    <Box w="50%" mx="auto">
      <SignupForm providers={providers} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  const providers = await getProviders(context);

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
}
