import Layout from "../components/PublicLayout/publicLayout";
import { useRouter } from "next/router";
import { WaveButton, ErrorWrapper } from "../components/Theme/StyledComponents";
import Lottie from "lottie-react";
import { Typography } from "@material-ui/core";
import Icon404Data from "../components/Theme/404Icon.json";

export default function Custom404() {
  const router = useRouter();

  return (
    <Layout>
      <ErrorWrapper>
        <Lottie
          animationData={Icon404Data}
          loop={true}
          autoplay={true}
          style={{ width: "90%", maxWidth: "400px" }}
        />
        <Typography
          fontWeight="fontWeightLight"
          color="textSecondary"
          variant="subtitle1"
          component="h1"
        >
          404 - Page Not Found
        </Typography>
        <Typography
          fontWeight="fontWeightRegular"
          variant="h5"
          component="h2"
          display="block"
          gutterBottom
        >
          {`
          You're lost in the cosmos!
          `}
        </Typography>
        <WaveButton
          onClick={() => {
            router.push("/");
          }}
        >
          To Safety
        </WaveButton>
      </ErrorWrapper>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    revalidate: 10,
    props: {},
  };
}
