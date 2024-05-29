import React, { useState } from 'react';
import { Button, Table, Tbody, Tr, Td, Th, Thead } from '@chakra-ui/react';
import SaleOrderModal from './SaleOrderModal';
import "./order.css"

const CompletedSaleOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCreateOrder = () => {
    setSelectedOrder(null); // Reset selectedOrder to null for creating a new order
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null); // Reset selectedOrder after modal is closed
  };

  const handleSubmitOrder = (newOrder) => {
    const updatedOrders = [...orders];
    if (selectedOrder) {
      const index = updatedOrders.findIndex((order) => order.id === selectedOrder.id);
      if (index !== -1) {
        updatedOrders[index] = newOrder; // Replace existing order with updated order
      }
    } else {
      newOrder.id = orders.length + 1; // Generate a new ID for the new order
      updatedOrders.push(newOrder); // Add new order to the list
    }
    setOrders(updatedOrders);
    handleModalClose(); // Close the modal after submitting the form
  };

  return (
    <>
      <Button onClick={handleCreateOrder} className='create'>Create Sale Order</Button>
      <SaleOrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmitOrder}
        order={selectedOrder}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Customer Name</Th>
            <Th>Invoice Date</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => (
            <Tr key={index}>
              <Td>{order.id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.invoice_date ? new Date(order.invoice_date).toLocaleString() : ''}</Td>
              <Td>₹{order.price}</Td>
              <Td>
                <SaleOrderModal
                  isOpen={false}
                  onClose={() => {}}
                  order={order}
                  readOnly={true} // Set readOnly to true for completed sale orders
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default CompletedSaleOrders;
