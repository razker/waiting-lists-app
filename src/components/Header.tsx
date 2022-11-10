import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import freedivingTlv from "../static/freediving-tlv.png";

const Header = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      className="header"
    >
      <img alt="freediving-tlv" style={{ width: 150 }} src={freedivingTlv} />
      <Typography fontWeight={500} textAlign={"center"} variant="h4">
        {t("header")}
      </Typography>
    </Grid>
  );
};

export default Header;
