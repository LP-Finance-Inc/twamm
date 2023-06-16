import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import * as Styled from "./settings-modal.styled";
import ClusterSelector from "./cluster-selector";
import ExplorerSelector from "./explorer-selector";
import i18n from "../i18n";
import PerformanceFeeSelector from "./performance-fee-selector";
import Tooltip, { TooltipRef } from "../atoms/tooltip";
import SlippageSelector from "./slippage-selector";
import useTxRunner from "../contexts/transaction-runner-context";
import useTheme from "../contexts/theme-context";

export default ({
  id,
  onToggle,
}: {
  id: string;
  onToggle: (arg0: boolean) => void;
}) => {
  const tooltipRef = useRef<TooltipRef>();
  const { performanceFee } = useTxRunner();
  const { theme } = useTheme();

  const onClose = () => onToggle(false);

  return (
    <Styled.Container p={2}>
      <Typography id={id} variant="h5" pb={1}>
        {i18n.Settings}
      </Typography>
      <Styled.Setting direction="row" py={1}>
        <Styled.SettingLabel variant="body2">
          {i18n.SettingsSettingExplorer}
        </Styled.SettingLabel>
        <ExplorerSelector
          label={i18n.SettingsSettingExplorer}
          onClose={onClose}
          theme={theme}
        />
      </Styled.Setting>
      <Styled.Setting direction="row" py={1}>
        <Box>
          <Styled.SettingLabel variant="body2">
            {i18n.SettingsSettingPerformaceFee}
          </Styled.SettingLabel>
          {performanceFee > 0 && (
            <Typography color="text.secondary" variant="body2">
              {i18n.SettingsSettingPerformanceFeeValuePre} {performanceFee}
              {i18n.SettingsSettingPerformanceFeeValuePost}
            </Typography>
          )}
        </Box>
        <PerformanceFeeSelector theme={theme} />
      </Styled.Setting>
      <Styled.Setting direction="row" py={1}>
        <Box>
          <Styled.SettingLabel variant="body2">
            {i18n.SettingsSettingSlippage}
          </Styled.SettingLabel>
          <Typography color="text.secondary" variant="body2">
            {i18n.SettingsSettingsSlippageInfo}
          </Typography>
        </Box>
        <SlippageSelector
          label={i18n.SettingsSettingSlippage}
          onClose={onClose}
          theme={theme}
        />
      </Styled.Setting>
      <Box py={2}>
        <Styled.Line />
      </Box>
      <Styled.ClusterSetting>
        <Typography variant="body2" pb={1}>
          {i18n.SettingsSettingClusterSelector}
        </Typography>
        <ClusterSelector onClose={onClose} theme={theme} />
      </Styled.ClusterSetting>
      <Tooltip ref={tooltipRef} text={i18n.SettingsSettingVersionedTxInfo} />
    </Styled.Container>
  );
};
