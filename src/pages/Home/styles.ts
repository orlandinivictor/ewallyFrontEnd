import { makeStyles } from '@material-ui/core';

export const styles = makeStyles({
  container: {
    display: 'flex',

    width: '100vw',
    height: '100vh',

    background: 'linear-gradient(to top left, #34bfc7 60%, #fff 200%)',
    position: 'relative',
  },

  drawer: {
    justifyContent: 'center',
    alignItems: 'flex-start',

    height: '100vh',

    paddingTop: 20,
    paddingInline: 10,

    background: 'rgba( 0, 0, 0, 0.65 ) !important',
    boxShadow: '0 8px 32px 0 rgba( 52, 191, 199, 0.37 )',
    backdropFilter: 'blur( 4px )',
    '-webkit-backdrop-filter': 'blur( 4px )',
    border: '1px solid rgba( 0, 0, 0, 0.18 )',
    '@media screen and (max-width:450px)': {
      position: 'absolute',
      zIndex: 1,
    },
    '@media screen and (min-width: 450px)': {
      display: 'flex !important',
    },
  },

  drawerContent: {
    display: 'flex',
    alignItems: 'center',
    '@media screen and (max-width:840px)': {
      flexDirection: 'column',
    },
  },

  title: {
    fontSize: 15,
    fontWeight: 700,
    marginRight: 5,
    marginBottom: -2,
    color: '#eee',
  },

  bound: {
    fontSize: 18,
    fontWeight: 600,
    color: 'lightgreen',
  },

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 50,
    paddingTop: 30,
  },

  topbar: {
    width: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: 'rgba( 0, 0, 0, 0.65 ) !important',
    boxShadow: '0 8px 32px 0 rgba( 52, 191, 199, 0.37 )',
    backdropFilter: 'blur( 4px )',
    '-webkit-backdrop-filter': 'blur( 4px )',
    borderRadius: 5,
    border: '1px solid rgba( 0, 0, 0, 0.18 )',
    '@media screen and (max-width:840px)': {
      flexDirection: 'column',
    },
  },

  dataGridBox: {
    width: '100%',
    flex: 1,
    marginTop: 40,
    background: 'rgba( 0, 0, 0, 0.65 ) !important',
    boxShadow: '0 8px 32px 0 rgba( 52, 191, 199, 0.37 )',
    backdropFilter: 'blur( 4px )',
    '-webkit-backdrop-filter': 'blur( 4px )',
    borderRadius: 5,
    border: '1px solid rgba( 0, 0, 0, 0.18 )',
  },

  dataGrid: {
    color: '#eee',
    borderColor: '#333',
    '& .MuiTypography-colorInherit': {
      color: '#fff',
    },
    '& .MuiSvgIcon-root': {
      fill: '#eee',
    },
  },

  infoButton: {
    minWidth: 0,
    padding: 0,
    margin: 0,
    borderRadius: '50%',
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    padding: 20,
    width: 500,
    height: 400,
    backgroundColor: '#eee',

    display: 'flex',
    flexDirection: 'column',
  },

  details: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  location: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 600,
  },

  drawerButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    minWidth: 0,
    padding: 10,
    margin: 0,
    borderRadius: '50%',

    '@media screen and (min-width:450px)': {
      display: 'none',
    },
  },
});
