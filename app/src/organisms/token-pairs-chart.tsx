import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useMemo } from "react";
import i18n from "../i18n";
import useBreakpoints from "../hooks/use-breakpoints";
import { DataFormatter, getDate } from "../helpers";
import Loading from "../atoms/loading";

export default ({
  data,
  isLoading,
  theme,
}: {
  data?: any;
  isLoading: boolean;
  theme: string;
}) => {
  const { isMobile } = useBreakpoints();

  const filterList = useMemo(() => {
    const List = [
      {
        id: 0,
        name: "volume",
        dataKey: "volume",
        fill: `url(#volume)`,
        stroke: theme === "dark" ? "#0c0" : "#7620E0",
        checked: true,
      },
    ];
    return List;
  }, [theme]);

  return (
    <Box mt={4}>
      <Typography pb={2} variant="h4" align={isMobile ? "center" : "left"}>
        {i18n.StatsChartPairs}
      </Typography>
      {isLoading ? (
        <Loading />
      ) : (
        data.length > 0 && (
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} mt={3}>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={data}>
                    <defs>
                      {filterList.map((list) => (
                        <linearGradient
                          id={list.dataKey}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                          key={list.id}
                        >
                          <stop
                            offset="0%"
                            stopColor={list.stroke}
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor={list.stroke}
                            stopOpacity={1}
                          />
                        </linearGradient>
                      ))}
                    </defs>
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={getDate}
                      tick={{
                        fill: theme === "dark" ? "#0c0" : "#7620E0",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      }}
                      tickLine={{
                        stroke: theme === "dark" ? "#0c0" : "#7620E0",
                      }}
                    />
                    <YAxis
                      tick={{
                        fill: theme === "dark" ? "#0c0" : "#7620E0",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      }}
                      tickLine={{
                        stroke: theme === "dark" ? "#0c0" : "#7620E0",
                      }}
                      tickFormatter={(val: any) => DataFormatter(val)}
                    />
                    <Tooltip
                      formatter={(val: any) => DataFormatter(val)}
                      labelFormatter={(label: any) => getDate(label)}
                      itemSorter={(p: any) => -p.value}
                      labelStyle={{ color: "black", fontWeight: "500" }}
                      contentStyle={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        borderColor: "white",
                        color: "black",
                        fontSize: "0.95rem",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    />
                    {filterList.map((list) => (
                      <Area
                        type="monotone"
                        key={list.dataKey}
                        dataKey={list.dataKey}
                        stroke={list.stroke}
                        fill={list.fill}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          </Container>
        )
      )}
      {data && data.length < 0 && <Alert severity="info">Data not found</Alert>}
    </Box>
  );
};
