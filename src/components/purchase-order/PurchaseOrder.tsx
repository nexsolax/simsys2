import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Chip, Grid2, Paper } from '@mui/material';

const PurchaseOrder: React.FC = () => {
  const [ordersData, setOrdersData] = useState<any[]>([
    {
      id: 1,
      supplierId: 101,
      quantity: 50,
      costPrice: 200,
      status: false,
      totalAmount: 10000,
      orderDate: '2024-03-01',
      note: 'Initial stock replenishment',
    },
    {
      id: 2,
      supplierId: 102,
      quantity: 75,
      costPrice: 150,
      status: true,
      totalAmount: 11250,
      orderDate: '2024-03-05',
      note: 'Monthly inventory restock',
    },
    {
      id: 3,
      supplierId: 103,
      quantity: 30,
      costPrice: 300,
      status: false,
      totalAmount: 9000,
      orderDate: '2024-03-10',
      note: 'Emergency order for high-demand items',
    },
    {
      id: 4,
      supplierId: 104,
      quantity: 100,
      costPrice: 80,
      status: false,
      totalAmount: 8000,
      orderDate: '2024-03-15',
      note: 'Bulk order for seasonal items',
    },
    {
      id: 5,
      supplierId: 105,
      quantity: 25,
      costPrice: 400,
      status: true,
      totalAmount: 10000,
      orderDate: '2024-03-20',
      note: 'Premium items restock',
    },
  ]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'note', headerName: 'Note', width: 300, flex: 1 },
    { field: 'supplierId', headerName: 'Supplier ID', width: 100, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', width: 100, flex: 1 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 120, flex: 1 },
    { field: 'orderDate', headerName: 'Order Date', width: 120, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      flex: 1,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case true:
            color = 'success';
            break;
          case false:
            color = 'error';
            break;
          default:
            color = 'default';
            break;
        }
        return <Chip label={params.value ? 'Approve' : 'Reject'} color={color} />;
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={ordersData}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              className='datagrid-minimals-custom'
              sx={{ minHeight: 500, maxHeight: 500 }}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default PurchaseOrder;
