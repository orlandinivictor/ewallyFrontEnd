import { makeStyles } from '@material-ui/core';

export const styles = makeStyles({
  loginScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100vw',
    height: '100vh',

    background: 'linear-gradient(to top left, #34bfc7 60%, #fff 200%)',
  },

  loginContainer: {
    paddingInline: 10,
    paddingBlock: 30,

    width: 600,

    background: 'rgba( 0, 0, 0, 0.65 ) !important',
    boxShadow: '0 8px 32px 0 rgba( 32, 171, 179, 0.37 )',
    backdropFilter: 'blur( 4px )',
    '-webkit-backdrop-filter': 'blur( 4px )',
    borderRadius: 10,
    border: '1px solid rgba( 0, 0, 0, 0.18 )',

    '@media screen and (max-width:600px)': {
      marginInline: 20,
    },
  },

  companyInfo: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    objectFit: 'cover',
    marginBottom: 20,
  },

  loginInfos: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  inputs: {
    display: 'flex',
    flexDirection: 'column',

    '& label': {
      color: '#eee',
    },

    '& .Mui-focused': {
      color: '#eee !important',
      borderColor: '#eee !important',
    },
  },

  notchedOutline: {
    borderColor: '#eee !important',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,

    '& button': {
      marginBlock: 5,
      fontSize: 14,
    },
  },
});
