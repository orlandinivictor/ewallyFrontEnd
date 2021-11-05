import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import InfoIcon from '@material-ui/icons/Info';
import { useSnackbar } from 'notistack';
import MenuIcon from '@material-ui/icons/Menu';

import { useAuth } from '../../contexts/auth';
import { api } from '../../services/api';

import { styles } from './styles';

type StatementProps = {
  id: string;
  userLatitude: number;
  userLongitude: number;
  date: string;
  description: string;
  amount: string;
};

type ResStatementProps = {
  accountName: string;
  amount: number;
  balance: number;
  createdAt: string;
  id: number;
  operationType: string;
  otherInfo: {
    otherAccountName: string;
    userLatitude: number;
    userLongitude: number;
  };
  status: string;
};

export function Home() {
  const classes = styles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { token, setToken } = useAuth();

  const [balance, setBalance] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [initialDate, setInitialDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [finalDate, setFinalDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [rows, setRows] = useState([]);
  const [data, setData] = useState({} as StatementProps);
  const [openDrawer, setOpenDrawer] = useState(false);

  const fetchData = async () => {
    const balanceRes = await api.get('/account/balance', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const extractRes = await api.get(
      `/account/statements?initialDate=${initialDate}&finalDate=${finalDate}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (balanceRes.status === 110 || extractRes.status === 110) {
      setToken('');
      history.push('/login');

      enqueueSnackbar('Seu token expirou, faça login novamente', {
        variant: 'error',
        autoHideDuration: 3000,
      });

      return;
    }

    const statements = extractRes.data.statement.map(
      (statement: ResStatementProps) => {
        return {
          id: statement.id,
          userLatitude: statement.otherInfo.userLatitude,
          userLongitude: statement.otherInfo.userLongitude,
          date: format(new Date(statement.createdAt), 'dd/MM/yyyy'),
          description: statement.operationType,
          amount: statement.amount.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }),
        };
      },
    );

    setRows(statements);
    setBalance(balanceRes.data.balance);
  };

  const handleSearchInterval = async () => {
    const extractRes = await api.get(
      `/account/statements?initialDate=${initialDate}&finalDate=${finalDate}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (extractRes.status === 110) {
      setToken('');
      history.push('/login');

      enqueueSnackbar('Seu token expirou, faça login novamente', {
        variant: 'error',
        autoHideDuration: 3000,
      });

      return;
    }

    const statements = extractRes.data.statement.map(
      (statement: ResStatementProps) => {
        return {
          id: statement.id,
          userLatitude: statement.otherInfo.userLatitude,
          userLongitude: statement.otherInfo.userLongitude,
          date: format(new Date(statement.createdAt), 'dd/MM/yyyy'),
          description: statement.operationType,
          amount: statement.amount.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }),
        };
      },
    );
    setRows(statements);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: 'date',
      headerName: 'Data de Transação',
      width: 300,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 250,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Quantia',
      width: 200,
      editable: false,
    },
    {
      field: 'details',
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            onClick={() => {
              setOpenModal(true);
              setData(params.row as StatementProps);
            }}
            className={classes.infoButton}
          >
            <InfoIcon style={{ color: '#eee' }} />
          </Button>
        );
      },
    },
  ];

  return (
    <Box className={classes.container}>
      <Button
        className={classes.drawerButton}
        onClick={() => setOpenDrawer(true)}
      >
        <MenuIcon />
      </Button>

      <Box
        className={classes.drawer}
        style={{
          display: openDrawer ? 'flex' : 'none',
        }}
      >
        <Box className={classes.drawerContent}>
          <Typography className={classes.title}>Saldo:</Typography>
          <Typography
            className={classes.bound}
            style={{ color: balance < 0 ? 'lightred' : 'lightgreen' }}
          >
            {balance.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}

            <Button
              className={classes.drawerButton}
              onClick={() => setOpenDrawer(false)}
              style={{ color: '#eee', right: 5, left: 'auto' }}
            >
              <MenuIcon />
            </Button>
          </Typography>
        </Box>
      </Box>

      <Box className={classes.content}>
        <Box className={classes.topbar}>
          <Typography className={classes.title}>Extrato:</Typography>

          <TextField
            id="date"
            label="De:"
            type="date"
            defaultValue={initialDate}
            onChange={(e) => setInitialDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBlock: 5 }}
          />
          <TextField
            id="date"
            label="A:"
            type="date"
            defaultValue={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBlock: 5 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchInterval}
          >
            Pesquisar
          </Button>
        </Box>

        <Box className={classes.dataGridBox}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[5]}
            className={classes.dataGrid}
            checkboxSelection={false}
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            disableDensitySelector
          />
        </Box>
      </Box>

      <Modal
        open={openModal}
        className={classes.modal}
        onClose={() => setOpenModal(false)}
      >
        <Box className={classes.modalContainer}>
          <Box className={classes.details}>
            <Typography className={classes.title} style={{ color: '#333' }}>
              {data.date} /{' '}
            </Typography>
            <Typography className={classes.title} style={{ color: '#333' }}>
              {data.description} /
            </Typography>
            <Typography
              className={classes.bound}
              style={{ color: balance < 0 ? 'darkred' : 'darkgreen' }}
            >
              {data.amount}
            </Typography>
          </Box>

          <Typography className={classes.location}>
            Lat: {data.userLatitude} <br /> Long: {data.userLongitude}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
