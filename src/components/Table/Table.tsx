import { IData } from 'commons/interfaces';
import { useEffect, useState } from 'react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import ToasterContext from 'contexts/ToasterContext/ToasterContext';
import React from 'react';
import { ToasterTypes } from 'commons/enum';

interface TableProps {
  data: IData[];
}

const Table = ({ data }: TableProps) => {
  const [columns, setColumns] = useState<GridColumns>();
  const { showToaster } = React.useContext(ToasterContext);

  useEffect(() => {
    setColumns([
      {
        field: 'timestamp',
        headerName: 'Time',
        width: 220,
        valueFormatter: (field) =>
          `${new Date(field.value as string).toDateString()} ${new Date(
            field.value as string
          ).toLocaleTimeString()}`,
      },
      { field: 'type', headerName: 'Type', width: 140 },
      { field: 'severity', headerName: 'Severity', width: 100, hide: true },
      {
        field: 'kill_chain_phase',
        headerName: 'Kill Chain Phase',
        width: 150,
        hide: true,
      },
      {
        field: 'attacker_id',
        headerName: 'Attacker Id',
        width: 140,
      },
      { field: 'attacker_name', headerName: 'Attacker Name', width: 160 },
      { field: 'attacker_port', headerName: 'Attcker Port', width: 110 },
      { field: 'decoy_id', headerName: 'Decoy Id', width: 100, hide: true },
      { field: 'decoy_name', headerName: 'Decoy Name', width: 200 },
      {
        field: 'decoy_group',
        headerName: 'Decoy Group',
        width: 120,
        hide: true,
      },
      { field: 'decoy_ip', headerName: 'Decoy IP', width: 100, hide: true },
      { field: 'decoy_port', headerName: 'Decoy Port', width: 100, hide: true },
      { field: 'decoy_type', headerName: 'Decoy Type', width: 120, hide: true },
    ]);
  }, [data]);

  return (
    <div style={{ height: 540, width: '100%', marginTop: '16px' }}>
      {data.length > 0 && columns && (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onError={(e) => showToaster(ToasterTypes.ERROR, e)}
        />
      )}
    </div>
  );
};

export default Table;
