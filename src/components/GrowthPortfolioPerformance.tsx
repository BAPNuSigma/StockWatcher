import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { trailingYearData, historicalGrowth, monthlyGrowth } from '../data/performance';

const trailingYearColumns: GridColDef[] = [
  { field: 'month', headerName: 'Month', width: 110 },
  { field: 'smif', headerName: 'SMIF ($)', width: 110, type: 'number' },
  { field: 'smifPct', headerName: 'SMIF %', width: 110, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
  { field: 'spy', headerName: 'SPY ($)', width: 110, type: 'number' },
  { field: 'spyPct', headerName: 'SPY %', width: 110, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
];

const historicalGrowthColumns: GridColDef[] = [
  { field: 'month', headerName: 'Month', width: 110 },
  { field: 'smif', headerName: 'SMIF ($)', width: 110, type: 'number' },
  { field: 'spy', headerName: 'SPY ($)', width: 110, type: 'number' },
];

const monthlyGrowthColumns: GridColDef[] = [
  { field: 'month', headerName: 'Month', width: 110 },
  { field: 'smif', headerName: 'SMIF ($)', width: 110, type: 'number' },
  { field: 'smifMoM', headerName: 'SMIF (m/m growth)', width: 140, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
  { field: 'smifCum', headerName: 'SMIF (cum. growth)', width: 140, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
  { field: 'spy', headerName: 'S&P ($)', width: 110, type: 'number' },
  { field: 'spyMoM', headerName: 'S&P (m/m growth)', width: 140, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
  { field: 'spyCum', headerName: 'S&P (cum. growth)', width: 140, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
];

const GrowthPortfolioPerformance: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {/* Trailing Year Performance Chart */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Trailing Year Performance (SMIF vs S&P 500)</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trailingYearData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${v.toFixed(0)}%`} />
              <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
              <Legend />
              <Line type="monotone" dataKey="smifPct" name="SMIF" stroke="#1976d2" dot={false} />
              <Line type="monotone" dataKey="spyPct" name="S&P 500" stroke="#e53935" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Trailing Year Data Table */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Trailing Year Data</Typography>
          <DataGrid
            rows={trailingYearData.map((row, i) => ({ id: i, ...row }))}
            columns={trailingYearColumns}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
          />
        </Paper>
      </Grid>

      {/* SMIF Growth Since Inception */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">SMIF Growth Since Inception</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={historicalGrowth} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
              <Legend />
              <Line type="monotone" dataKey="smif" name="SMIF" stroke="#1976d2" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Hypothetical Growth of $1000 */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Hypothetical Growth of $1000</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={historicalGrowth} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
              <Legend />
              <Line type="monotone" dataKey="smif" name="SMIF" stroke="#1976d2" dot={false} />
              <Line type="monotone" dataKey="spy" name="SPY" stroke="#e53935" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Historical Growth Table */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Historical Growth of $1000</Typography>
          <DataGrid
            rows={historicalGrowth.map((row, i) => ({ id: i, ...row }))}
            columns={historicalGrowthColumns}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
          />
        </Paper>
      </Grid>

      {/* Month-over-Month and Cumulative Growth Table */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Month-over-Month and Cumulative Growth</Typography>
          <DataGrid
            rows={monthlyGrowth.map((row, i) => ({ id: i, ...row }))}
            columns={monthlyGrowthColumns}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GrowthPortfolioPerformance; 