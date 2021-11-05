import { useSnackbar } from 'notistack';
import { useContext, createContext, useState } from 'react';

import { api } from '../services/api';

type AuthContextProps = {
  signIn: (user: string, pass: string) => Promise<void>;
  token: string;
  setToken: (token: string) => void;
};

const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState('');

  const signIn = async (user: string, pass: string) => {
    try {
      const res = await api.post('/user/login', {
        username: user,
        password: pass,
      });

      const { token } = res.data;
      setToken(token);

      enqueueSnackbar('Login efetuado com sucesso', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch (err) {
      enqueueSnackbar('Usuário ou senha inválidos', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
