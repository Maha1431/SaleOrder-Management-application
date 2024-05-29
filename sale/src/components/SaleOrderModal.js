import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderModal = ({ isOpen, onClose, onSubmit, order, readOnly = false }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm({
    defaultValues: order || {},
  });

  const [invoiceDate, setInvoiceDate] = React.useState(order?.invoice_date ? new Date(order.invoice_date) : null);

  React.useEffect(() => {
    if (order) {
      setValue('customer_id', order.customer_id);
      setValue('customer_name', order.customer_name || '');
      setValue('price', order.price || '');
      setValue('sku_id', order.items?.[0]?.sku_id || '');
      setInvoiceDate(order.invoice_date ? new Date(order.invoice_date) : null);
    }
  }, [order, setValue]);

  const handleFormSubmit = (data) => {
    if (!readOnly) {
      data.invoice_date = invoiceDate; // Add invoice date to the form data
      onSubmit(data);
      reset();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? (readOnly ? 'View' : 'Edit') : 'Create'} Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl isInvalid={errors.customer_name}>
              <FormLabel>Customer Name</FormLabel>
              <Input {...register('customer_name', { required: 'Customer name is required' })} readOnly={readOnly} />
              <FormErrorMessage>{errors.customer_name && errors.customer_name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.price}>
              <FormLabel>Price</FormLabel>
              <Input {...register('price', { required: 'Price is required' })} readOnly={readOnly} />
              <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.invoice_date}>
              <FormLabel>Invoice Date</FormLabel>
              <DatePicker
                selected={invoiceDate}
                onChange={(date) => setInvoiceDate(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy h:mm aa"
                readOnly={readOnly}
              />
              <FormErrorMessage>{errors.invoice_date && errors.invoice_date.message}</FormErrorMessage>
            </FormControl>
            {!readOnly && <Button type="submit">{order ? 'Update' : 'Create'}</Button>}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
