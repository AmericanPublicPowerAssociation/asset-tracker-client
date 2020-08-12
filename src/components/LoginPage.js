import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import {
  getAuthUrl,
} from 'appa-auth-consumer'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'white',
    width: '100vw',
    height: '100vh',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: '0 auto',
  },
  avatarBackground: {
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
    fontSize: '1.35rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  buttonStartIcon: {
    marginRight: theme.spacing(2),
  },
  contributorText: {
    color: 'gray',
    fontSize: '.5rem',
  },
  assetTrackerText: {
    fontWeight: 'bold',
  },
}))

const companies = [
  { name:'American Public Power Association', linkedIn: '' },
  { name:'CrossCompute', linkedIn: '' },
  { name:'DevLabs Mexico', linkedIn: '' },
]

const individuals = [
  { name: 'Rodrigo Guarachi', linkedIn: '' },
  { name: 'Polina Chernomaz', linkedIn: '' },
  { name: 'Miguel Ángel Gordián', linkedIn: '' },
  { name: 'Marta Moreno', linkedIn: '' },
  { name: 'Salah Ahmed', linkedIn: '' },
  { name: 'Roy Hyunjin Han', linkedIn: '' },
  { name: 'Noé Domínguez Porras', linkedIn: '' },
  { name: 'Olga Creutzburg', linkedIn: '' },
  { name: 'Mayra Esther Rodríguez Solano', linkedIn: '' },
  { name: 'Trevor David Rhone', linkedIn: '' },
  { name: 'Ethan Epstein', linkedIn: '' },
  { name: 'Tyler Doyle', linkedIn: '' },
  { name: 'Chris Ching', linkedIn: '' },
  { name: 'Nathan Mitchell', linkedIn: '' },
  { name: 'Alex Hofmann', linkedIn: '' },
]

export default function LoginPage() {
  const classes = useStyles()
  const AppaLogo = (
    <img className={classes.appaLogo} src={`${process.env.PUBLIC_URL}/appa.svg`} />)
  const authUrl = useSelector(getAuthUrl) 

  return (
    <div className={classes.root}>
      <div className={classes.paper}> 
        <div>
          <Avatar
            variant='rounded'
            className={classes.avatar}
            classes={{ root: classes.avatarBackground }}
            src={`${process.env.PUBLIC_URL}/logo192.png`}>
          </Avatar>
          <Typography component='h1' align='center' className={classes.assetTrackerText}>
            Asset Tracker
          </Typography>
          <Button
            href={authUrl}
            size='large'
            variant='contained'
            startIcon={AppaLogo}
            classes={{
              root: classes.button,
              startIcon: classes.buttonStartIcon }}
          >
            Log in with APPA
          </Button>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <div style={{ width: '70%', margin: '0 auto' }}>
        <Typography align='center' className={classes.contributorText}>
          {'This application is brought to you by: '}
        </Typography>
        <Typography align='center' className={classes.contributorText}>
          {
            companies.map((company, index) => (
              <Link key={company.name} href={company.linkedIn} rel='noopener' rel='noreferrer'>
                { (index ? ', ' : '') + company.name }
              </Link>))
          }
        </Typography>
        <Typography align='center' className={classes.contributorText}>
          {
            individuals.map((individual, index) => (
              <Link key={individual.name} href={individual.linkedIn} rel='noopener' rel='noreferrer'>
                { (index ? ', ' : '') + individual.name }
              </Link>))
          }
        </Typography>
        </div>
      </div>
    </div>
  )
}
