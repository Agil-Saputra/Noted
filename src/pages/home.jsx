import React from "react";
import Card from "../components/card";
import { Grid } from "@mui/material";

export default function home() {
  return (
   <Grid container  columns={{ xs: 4, md: 12 }} spacing={3}>
<Grid item xs={4}>
<Card/>
</Grid>
<Grid item xs={4}>
<Card/>
</Grid>
<Grid item xs={4}>
<Card/>
</Grid>
   </Grid>
  )
}
