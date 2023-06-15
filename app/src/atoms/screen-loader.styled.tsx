import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.background.default};
`;

export const ImageWrapper = styled(Box)`
  img {
    position: relative;
    animation: animate 4s infinite;
  }

  @keyframes animate {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1.1);
    }
    40% {
      transform: scale(1);
    }
    60% {
      transform: scale(1.1);
    }
    80% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
