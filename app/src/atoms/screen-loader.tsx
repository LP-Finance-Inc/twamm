import Image from "next/image";

import * as Styled from "./screen-loader.styled";
import useTheme from "../contexts/theme-context";

export default () => {
  const { theme } = useTheme();

  return (
    <Styled.Container>
      <Styled.ImageWrapper>
        <Image
          src={
            theme === "dark" ? "/images/lp-logo.png" : "/images/elp-logo.png"
          }
          alt="logo"
          height={75}
          width={130}
        />
      </Styled.ImageWrapper>
    </Styled.Container>
  );
};
