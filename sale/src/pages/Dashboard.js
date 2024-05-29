import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ActiveSaleOrders from '../components/ActiveOrders';
import CompletedSaleOrders from '../components/CompletedOrders';

const Dashboard = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Active Sale Orders</Tab>
        <Tab>Completed Sale Orders</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ActiveSaleOrders />
        </TabPanel>
        <TabPanel>
          <CompletedSaleOrders />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;
