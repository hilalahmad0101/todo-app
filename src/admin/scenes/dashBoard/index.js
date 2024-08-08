import React from 'react';
import Header from "../../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme/theme";
import StatBox from "../../components/StatBox";
import ReplayIcon from "@mui/icons-material/Replay";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ProductionQuantityLimitsRoundedIcon from "@mui/icons-material/ProductionQuantityLimitsRounded";
import GeographyChart from "../../components/GeographyChart";

function DashBoard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      {/* GRID & CHARTS */}
      {/* <Box
        display="flex"
        sx={{ overflow: "auto", height: "90vh", flexDirection: "column" }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn={{ xs: "span 12", sm: "span 3" }}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={20}
              subtitle="Total Review"
              progress="1.0"
              icon={
                <ProductionQuantityLimitsRoundedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>

          <Box
            gridColumn={{ xs: "span 12", sm: "span 3" }}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={50}
              subtitle="Response Review"
              progress={""}
              increase={`${(20 * 100).toFixed(2)}%`}
              icon={
                <LocalOfferIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn={{ xs: "span 12", sm: "span 3" }}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={50}
              subtitle="Pending Review"
              progress={""}
              increase={`${(10 * 100).toFixed(2)}%`}
              icon={
                <LocalOfferIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn={{ xs: "span 12", sm: "span 3" }}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={60}
              subtitle="Resolve Case"
              progress={""}
              increase={`${(100).toFixed(2)}%`}
              icon={
                <ReplayIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn={{ xs: "span 12", sm: "span 12" }}
            gridRow="span 4"
            backgroundColor={colors.primary[400]}
            padding="15px"
            sx={{ mt: 2 }}
          >
            <Typography
              variant="h4"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box m="20px" height="50vh" p="2px">
              <GeographyChart />
            </Box>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
}

export default DashBoard;
