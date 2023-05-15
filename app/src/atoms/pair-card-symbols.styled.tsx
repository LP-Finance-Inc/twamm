import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const div = styled("div");

const styledAvatar = styled(Avatar);
const styledAvatarGroup = styled(AvatarGroup);

export const Root = div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  flex-direction: row;
`;

export const TokenAvatar = styledAvatar`
  width: 27px;
  height: 27px;
`;

export const TokenAvatarGroup = styledAvatarGroup`
  padding-right: 8px;
`;

export const Symbols = styled(Box)``;
