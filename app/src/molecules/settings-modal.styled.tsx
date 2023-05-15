import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Container = styled(Box)`
  width: 500px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Line = styled(Divider)`
  border-color: ${(p) => p.theme.palette.text.secondary};
`;

export const Setting = styled(Stack)`
  align-items: center;
  justify-content: space-between;
`;

export const ClusterSetting = styled(Stack)`
  align-items: left;
`;

export const SettingLabel = styled(Typography)`
  flex-grow: 1;
`;
