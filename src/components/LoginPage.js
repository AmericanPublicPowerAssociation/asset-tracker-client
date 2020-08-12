import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import {
  getAuthUrl,
} from 'appa-auth-consumer'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  avatarBackground: {
    borderRadius: '1',
    background: 'white',
  },
  appaLogo: {
    width: theme.spacing(10),
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color: '#043e74',
    backgroundColor: 'white',
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    borderRadius: '40px',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  buttonStartIcon: {
    marginRight: theme.spacing(2),
  },
  text: {
    color: 'gray',
  },
}))

const companies = [
  { 'name': 'CrossCompute', 'linkedIn': '' },
]

const individuals = [
  { 'name': 'Roy', 'linkedIn': '' },
  { 'name': 'Polina', 'linkedIn': '' },
  { 'name': 'Miguel', 'linkedIn': '' },
  { 'name': 'Rodrigo', 'linkedIn': '' },
]

export default function LoginPage() {
  const classes = useStyles()
  const AppaLogo = (
    <img className={classes.appaLogo} src={`${process.env.PUBLIC_URL}/appa.svg`} />)
  const authUrl = useSelector(getAuthUrl) 

  return (
    <Container maxWidth='sm' className={classes.background}>
      <CssBaseline />
      <div className={classes.paper}> 
        <Avatar
          variant='rounded'
          className={classes.avatar}
          classes={{ root: classes.avatarBackground }}
          src={`${process.env.PUBLIC_URL}/logo192.png`}>
        </Avatar>
        <Typography component='h1' variant='h4'>
          Asset Tracker
        </Typography>
        <Button
          href={authUrl}
          size='large'
          variant='outlined'
          startIcon={AppaLogo}
          classes={{
            root: classes.button,
            startIcon: classes.buttonStartIcon }}
        >
          Log in with APPA
        </Button>
        <Typography className={classes.text}>
          {'This application is brought to you by: '}
          {
            companies.map((company, index) => (
              <Link key={company.name} href={company.linkedIn} rel='noopener' rel='noreferrer'>
                { (index ? ', ' : '') + company.name }
              </Link>))
          }
        </Typography>
        <Typography className={classes.text}>
          {'Individual Contributors: '}
          {
            individuals.map((individual, index) => (
              <Link key={individual.name} href={individual.linkedIn} rel='noopener' rel='noreferrer'>
                { (index ? ', ' : '') + individual.name }
              </Link>))
          }
        </Typography>
      </div>
    </Container>
  )
}
