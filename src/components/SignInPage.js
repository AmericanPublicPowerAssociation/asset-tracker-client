import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import {
  getAuthUrl,
} from 'appa-auth-consumer'
import {
  IsLayoutMobileContext,
} from '../contexts'

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
  dialogTitle: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  list: {
    '& li': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  }, 
}))

const companies = [
  { name:'American Public Power Association', url: 'https://publicpower.org' },
  { name:'CrossCompute', url: 'https://crosscompute.com' },
  { name:'DevLabs Mexico', url: 'https://www.devlabs.com.mx' },
]

const individuals = [
  { name: 'Rodrigo Guarachi', url: 'https://www.linkedin.com/in/rodrigo-guarachi-95060711b' },
  { name: 'Polina Chernomaz', url: 'https://www.linkedin.com/in/polinac' },
  { name: 'Miguel Ángel Gordián', url: 'https://www.linkedin.com/in/miguelgordian' },
  { name: 'Marta Moreno', url: 'https://www.linkedin.com/in/marta-moreno-07364b82' },
  { name: 'Salah Ahmed', url: 'https://www.linkedin.com/in/salahspage' },
  { name: 'Roy Hyunjin Han', url: 'https://www.linkedin.com/in/invisibleroads' },
  { name: 'Olga Creutzburg', url: 'https://www.linkedin.com/in/olga-creutzburg-52a689b2' },
  { name: 'Noé Domínguez Porras', url: 'https://www.linkedin.com/in/noedominguez' },
  { name: 'Hugo Aguirre Martínez', url: 'https://www.linkedin.com/in/hugoaguirre' },
  { name: 'Luis Antonio Gomez Prieto', url: 'https://www.linkedin.com/in/jimmylagp' },
  { name: 'Mayra Esther Rodríguez Solano', url: 'http://linkedin.com/in/mayra-esther-rodr%C3%ADguez-solano-62b34ab2' },
  { name: 'Trevor David Rhone', url: 'https://www.linkedin.com/in/trevor-david-rhone-965ba9b' },
  { name: 'Elaine Chan', url: 'https://www.linkedin.com/in/chanelaine' },
  { name: 'Ethan Epstein', url: 'https://www.linkedin.com/in/ethan-epstein-80772093' },
  { name: 'Chris Ching', url: 'https://www.linkedin.com/in/chingchristopher' },
  { name: 'Tyler Doyle', url: 'https://www.linkedin.com/in/tyler-doyle-987642111' },
  { name: 'Nathan Mitchell', url: 'https://www.linkedin.com/in/nathan-mitchell-p-e-58872a4/' },
  { name: 'Alex Hofmann', url: 'https://www.linkedin.com/in/alex-hofmann-4a006519' },
]

export default function LoginPage() {
  const classes = useStyles()
  const AppaLogo = <img
    className={classes.appaLogo}
    src={`${process.env.PUBLIC_URL}/appa.svg`}
    alt='logo'
  />
  const authUrl = useSelector(getAuthUrl) 
  const isLayoutMobile = useContext(IsLayoutMobileContext)
  const [isAcknowledgementOpen, setIsAcknowledgementOpen] = useState(false)

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
            Sign In with APPA
          </Button>
        </div>
      </div>
      { !isLayoutMobile &&
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
            {'Thank you to '}
            {
              individuals.map((individual, index) => (
                <React.Fragment key={individual.name}>
                  <span>{index ? ', ' : ''}</span>
                  <Link href={individual.url} target='_blank' rel='noopener' rel='noreferrer'>
                    { individual.name }
                  </Link>
                </React.Fragment>))
            }
          </Typography>
          </div>
        </div>
      }
      {
        isLayoutMobile && (
          <>
            <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
              <div style={{ width: '70%', margin: '0 auto' }}>
                <Button fullWidth onClick={() => setIsAcknowledgementOpen(true)}>Acknowledgements</Button>
              </div>
            </div>
            <Dialog
              fullScreen
              maxWidth='sm'
              open={isAcknowledgementOpen}
              onClose={() => setIsAcknowledgementOpen(false)}
              aria-labelledby='max-width-dialog-title'
            >
              <DialogTitle id='max-width-dialog-title' className={classes.dialogTitle}>Acknowledgements</DialogTitle>
              <DialogContent>
                <List className={classes.list}>
                  {companies.map(company => (
                    <ListItem key={company.name}>
                      <Link href={company.url} target='_blank' rel='noopener' rel='noreferrer'>
                      {company.name}
                      </Link>
                    </ListItem>
                  ))}
                  {individuals.map(individual => (
                    <ListItem key={individual.name}>
                      <Link href={individual.url} target='_blank' rel='noopener' rel='noreferrer'>
                        {individual.name}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsAcknowledgementOpen(false)} color='primary'>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      }
    </div>
  )
}
