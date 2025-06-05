import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Portfolio } from '../types/portfolio';

interface TransactionLogProps {
  portfolio: Portfolio;
}

const columns: GridColDef[] = [
  { 
    field: 'date', 
    headerName: 'Date', 
    width: 120,
    sortComparator: (v1, v2) => {
      // Parse as MM/DD/YYYY or M/D/YYYY
      const parse = (v: string) => {
        if (!v) return 0;
        const [m, d, y] = v.split('/');
        // Support 2-digit or 4-digit year
        const year = y.length === 2 ? 2000 + parseInt(y, 10) : parseInt(y, 10);
        return new Date(year, parseInt(m, 10) - 1, parseInt(d, 10)).getTime();
      };
      return parse(v1) - parse(v2);
    }
  },
  { field: 'action', headerName: 'Action', width: 150 },
  { field: 'ticker', headerName: 'Ticker', width: 100 },
  { field: 'amount', headerName: 'Amount', width: 150, type: 'number', valueFormatter: (params) => `$${params.value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
  { field: 'realizedPL', headerName: 'Realized P/L', width: 150, type: 'number', valueFormatter: (params) => params.value !== undefined ? `$${params.value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '' },
];

const TransactionLog: React.FC<TransactionLogProps> = ({ portfolio }) => {
  const rows = (portfolio.transactions || []).map((tx, idx) => ({ ...tx, id: tx.id || idx.toString() }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 600 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Transaction History
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
              sorting: {
                sortModel: [{ field: 'date', sort: 'asc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            disableRowSelectionOnClick
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TransactionLog; 