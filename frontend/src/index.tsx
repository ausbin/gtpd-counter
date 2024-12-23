import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App incidentsUrl="/incidents.json" incidentsByMonthCsvUrl="/incidents_by_month.csv" incidentsByHourCsvUrl="/incidents_by_hour.csv" />
  </React.StrictMode>
);
