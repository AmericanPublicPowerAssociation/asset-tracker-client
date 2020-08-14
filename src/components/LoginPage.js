import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import WarningIcon from '@material-ui/icons/ErrorOutline'
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
    marginBottom: theme.spacing(1),
    color: '#043e74',
    backgroundColor: 'white',
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4.5),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderRadius: '40px',
    fontSize: '1.2rem',
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
  { name:'American Public Power Association', linkedIn: 'https://www.linkedin.com/company/american-public-power-association/' },
  { name:'CrossCompute', linkedIn: 'https://www.linkedin.com/company/crosscompute-inc/' },
  { name:'DevLabs Mexico', linkedIn: '' },
]

const individuals = [
  { name: 'Rodrigo Guarachi', linkedIn: 'https://www.linkedin.com/in/rodrigo-guarachi-95060711b/' },
  { name: 'Polina Chernomaz', linkedIn: 'https://www.linkedin.com/in/polinac/' },
  { name: 'Miguel Ángel Gordián', linkedIn: 'https://www.linkedin.com/in/miguelgordian/' },
  { name: 'Marta Moreno', linkedIn: 'https://www.linkedin.com/in/marta-moreno-07364b82/' },
  { name: 'Salah Ahmed', linkedIn: 'https://www.linkedin.com/in/salahspage/' },
  { name: 'Roy Hyunjin Han', linkedIn: 'https://www.linkedin.com/in/invisibleroads/' },
  { name: 'Noé Domínguez Porras', linkedIn: 'https://www.linkedin.com/in/noedominguez/' },
  { name: 'Olga Creutzburg', linkedIn: 'https://www.linkedin.com/in/olga-creutzburg-52a689b2/' },
  { name: 'Mayra Esther Rodríguez Solano', linkedIn: '' },
  { name: 'Trevor David Rhone', linkedIn: '' },
  { name: 'Ethan Epstein', linkedIn: '' },
  { name: 'Tyler Doyle', linkedIn: '' },
  { name: 'Chris Ching', linkedIn: '' },
  { name: 'Nathan Mitchell', linkedIn: '' },
  { name: 'Alex Hofmann', linkedIn: 'https://www.linkedin.com/in/alex-hofmann-4a006519/' },
]

export default function LoginPage() {
  const classes = useStyles()
  const isLayoutMobile = useMediaQuery('(max-width:599px)')
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
          { isLayoutMobile &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <WarningIcon />
              <Typography style={{ paddingLeft: '4px' }} align='center'>
                Optimized for desktop
              </Typography>
            </div>
          }
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
              <Link key={company.name} href={company.linkedIn} target='_blank' rel='noopener' rel='noreferrer'>
                { (index ? ', ' : '') + company.name }
              </Link>))
          }
        </Typography>
        <Typography align='center' className={classes.contributorText}>
          {
            individuals.map((individual, index) => (
              <Link key={individual.name} href={individual.linkedIn} target='_blank' rel='noopener' rel='noreferrer'>
                { (index ? ', ' : '') + individual.name }
              </Link>))
          }
        </Typography>
        </div>
      </div>
    </div>
  )
}
