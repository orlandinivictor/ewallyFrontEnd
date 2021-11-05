import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@material-ui/core';

import { useAuth } from '../../contexts/auth';

import LogoImage from '../../assets/logo.svg';

import { styles } from './styles';
import { useHistory } from 'react-router-dom';

export function Login() {
  const classes = styles();
  const history = useHistory();

  const { signIn, token } = useAuth();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    if (!!token) {
      history.push('/');
    }
  }, [token]);

  const handleSignIn = async () => {
    await signIn(user, pass);
  };

  return (
    <Box className={classes.loginScreen}>
      <Paper elevation={3} className={classes.loginContainer}>
        <Box className={classes.companyInfo}>
          <img src={LogoImage} alt="Logotipo Ewally" className={classes.logo} />
        </Box>

        <Box className={classes.loginInfos}>
          <Box className={classes.inputs}>
            <TextField
              id="user"
              margin="dense"
              label="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
              name="user"
              InputProps={{
                classes: { notchedOutline: classes.notchedOutline },
              }}
              variant="outlined"
            />
            <TextField
              variant="outlined"
              id="password"
              margin="dense"
              label="Senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              name="pass"
              InputProps={{
                classes: { notchedOutline: classes.notchedOutline },
              }}
            />
          </Box>

          <Box className={classes.buttons}>
            <Button variant="contained" color="primary" onClick={handleSignIn}>
              Logar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
