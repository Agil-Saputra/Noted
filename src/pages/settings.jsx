import React from 'react'
import { Stack, Switch, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Layout from "../layout/layout"

export default function settings() {
  return (
    <Layout>
 <Stack spacing={4}>
       <Box display='flex' justifyContent="space-between" gap='1rem' alignItems='center'>
<Stack>
<Typography variant='subtitle2'>Dark Mode</Typography>
    <Typography variant='caption'>Change a theme color to dark mode</Typography>
</Stack>
        <Switch />
    </Box>
    <Box display='flex' justifyContent="space-between" gap='1rem' alignItems='center'>
<Stack>
<Typography variant='subtitle2'>Auto Redirect</Typography>
    <Typography variant='caption'>The Page will be Auto redirected to Note page after creating a note</Typography>
</Stack>
        <Switch defaultChecked/>
    </Box>
 </Stack>
 </Layout>
  )
}
