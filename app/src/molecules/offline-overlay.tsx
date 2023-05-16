import Image from "next/image";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import i18n from "../i18n";
import DesktopLogo from "../../public/images/lp-logo.png";

const OfflineOverlay = ({ open }: { open: boolean }) =>
  !open ? null : (
    <Backdrop
      sx={{
        background: "ragb(0, 0, 0, 0.5)",
        backdropFilter: "blur(20px)",
        color: "#0c0",
        flexDirection: "column",
        zIndex: (theme) => theme.zIndex.tooltip + 1,
      }}
      open={open}
    >
      <Image
        src={DesktopLogo}
        alt="logo"
        width={120}
        height={70}
        object-fit="cover"
        priority
      />
      <Box sx={{ my: 3, textAlign: "center" }}>{i18n.Offline}</Box>
      <Box role="dialog" aria-label={i18n.AriaLabelOffline}>
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );

export default OfflineOverlay;
