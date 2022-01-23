import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Graph from 'components/Graph/Graph';
import Table from 'components/Table/Table';
import { Route, useHistory } from 'react-router-dom';
import { pages } from 'commons/navigation';
import ToasterContext from 'contexts/ToasterContext/ToasterContext';
import API from 'services/api';
import { ToasterTypes } from 'commons/enum';
import { IData } from 'commons/interfaces';
import Loader from 'components/_shared/Loader/Loader';

const Home = () => {
  const [data, setData] = useState<IData[]>([]);
  const [value, setValue] = React.useState<number>(0);

  const { showToaster } = React.useContext(ToasterContext);

  useEffect(() => {
    API.GetData()
      .then((data) => setData(data))
      .catch((e) => showToaster(ToasterTypes.ERROR, e));
  }, [showToaster]);

  const history = useHistory();

  return data.length > 0 ? (
    <div>
      <Typography>Hi, Welcome to Zscaler Assignment Demo</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '16px' }}>
        <Tabs
          value={value}
          onChange={(_event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
            history.push(newValue === 0 ? pages.GRAPH : pages.TABLE);
          }}
          aria-label='visual options'
        >
          <Tab label='Graph' />
          <Tab label='Table' />
        </Tabs>
      </Box>
      <Route exact path={[pages.HOME, pages.GRAPH]}>
        <Graph data={data} />
      </Route>
      <Route exact path={pages.TABLE}>
        <Table data={data} />
      </Route>
    </div>
  ) : (
    <Loader />
  );
};

export default Home;
