import Image from "next/image";
import * as Styled from "./screen-loader.styled";

export default () => (
  <Styled.Container>
    <Styled.ImageWrapper>
      <Image src="/images/lp-logo.png" alt="logo" height={75} width={130} />
    </Styled.ImageWrapper>
  </Styled.Container>
);
