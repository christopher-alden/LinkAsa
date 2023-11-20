import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import { styled } from '@mui/material'

const Root = styled('div')(({ theme }) => {
  return {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  }
})

export default function HomePage() {
  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)
  const handleClick = () => setOpen(true)

  return (
    <React.Fragment>
      <Head>
        <title>LinkAsa</title>
      </Head>
      <Root>
        <h1> </h1>
      </Root>
    </React.Fragment>
  )
}
