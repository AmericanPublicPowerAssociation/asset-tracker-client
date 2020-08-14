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
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: '0 auto',
    marginBottom: '8px',
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
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4.5),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderRadius: '40px',
    fontSize: '1.35rem',
    fontWeight: 'bold',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  },
  outline: {
    border: '1px solid rgba(112, 112, 112, 0.4)',
  },
  buttonStartIcon: {
    marginRight: theme.spacing(2),
  },
  contributorText: {
    color: 'gray',
    fontSize: '.9rem',
  },
  assetTrackerText: {
    fontWeight: 'bold',
    fontSize: '2rem',
  },
}))

const companies = [
  { name:'American Public Power Association', url: 'https://publicpower.org' },
  { name:'CrossCompute', url: 'https://crosscompute.com' },
  { name:'DevLabs Mexico', url: 'https://www.devlabs.com.mx' },
]

const individuals = [
  { name: 'Rodrigo Guarachi', url: 'https://www.linkedin.com/in/rodrigo-guarachi-95060711b/' },
  { name: 'Polina Chernomaz', url: 'https://www.linkedin.com/in/polinac/' },
  { name: 'Miguel Ángel Gordián', url: 'https://www.linkedin.com/in/miguelgordian/' },
  { name: 'Marta Moreno', url: 'https://www.linkedin.com/in/marta-moreno-07364b82/' },
  { name: 'Salah Ahmed', url: 'https://www.linkedin.com/in/salahspage/' },
  { name: 'Roy Hyunjin Han', url: 'https://www.linkedin.com/in/invisibleroads/' },
  { name: 'Noé Domínguez Porras', url: 'https://www.linkedin.com/in/noedominguez/' },
  { name: 'Olga Creutzburg', url: 'https://www.linkedin.com/in/olga-creutzburg-52a689b2/' },
  { name: 'Mayra Esther Rodríguez Solano', url: '' },
  { name: 'Trevor David Rhone', url: '' },
  { name: 'Ethan Epstein', url: '' },
  { name: 'Tyler Doyle', url: '' },
  { name: 'Chris Ching', url: '' },
  { name: 'Nathan Mitchell', url: '' },
  { name: 'Alex Hofmann', url: 'https://www.linkedin.com/in/alex-hofmann-4a006519/' },
]

export default function LoginPage() {
  const classes = useStyles()
  const AppaLogo = <img
    className={classes.appaLogo}
    src={`${process.env.PUBLIC_URL}/appa.svg`}
    alt='logo'
  />
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
            variant='outlined'
            startIcon={AppaLogo}
            classes={{
              root: classes.button,
              startIcon: classes.buttonStartIcon,
              outlined: classes.outline,
            }}
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
              <React.Fragment key={company.name}>
                  <span>{index ? ', ' : ''}</span>
                  <Link href={company.url} target='_blank' rel='noopener noreferrer'>
                    { company.name }
                  </Link>
              </React.Fragment>))
          }
        </Typography>
        <Typography align='center' className={classes.contributorText}>
          {
            individuals.map((individual, index) => (
              <React.Fragment key={individual.name}>
                <span>{index ? ', ' : ''}</span>
                <Link href={individual.url} target='_blank' rel='noopener noreferrer'>
                  { individual.name }
                </Link>
              </React.Fragment>))
          }
        </Typography>
        </div>
      </div>
    </div>
  )
}
