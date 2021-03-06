import { useState, useEffect } from "react";
import Link from "next/link";
import {
  StyledImage,
  StyledImageWrapper,
  FeatureImageWrapper,
  TagsWrapper,
  StyledChip,
} from "./postCardStyled";
import { Skeleton } from "@material-ui/lab";

function FeatureImage({ featureImgUrl, tags, skeleton, moreHeight, noMargin }) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  useEffect(() => {}, [loading]);

  const wrapperLoadingStyle = {
    position: "absolute",
    top: "0",
  };

  return (
    <FeatureImageWrapper noMargin={noMargin ? "1" : undefined}>
      {!skeleton && loading && (
        <>
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height={moreHeight ? "400px" : "300px"}
          />
        </>
      )}
      <TagsWrapper>
        {!skeleton &&
          tags &&
          tags.map((tag, i) => {
            let attr = {};
            attr["href"] = "category/" + tag;
            return (
              <Link
                key={i}
                href="/category/[category]"
                as={`/category/${tag}`}
                passHref
              >
                <StyledChip size="small" clickable label={tag} />
              </Link>
            );
          })}
      </TagsWrapper>
      <StyledImageWrapper
        moreHeight={moreHeight ? "1" : undefined}
        style={loading ? wrapperLoadingStyle : {}}
      >
        {skeleton ? (
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height={moreHeight ? "600px" : "300px"}
          />
        ) : (
          <StyledImage
            src={process.env.NEXT_PUBLIC_API_URL + featureImgUrl}
            alt="Feature Image"
            onLoad={() => handleLoad()}
            width={700}
            height={300}
            layout="responsive"
            style={{ paddingBottom: "0" }}
          />
        )}
      </StyledImageWrapper>
    </FeatureImageWrapper>
  );
}

export default FeatureImage;
