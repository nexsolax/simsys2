import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreateProductDialog from './create/CreateProduct';
import { useStore } from '../../store';

const Product: React.FC = () => {
  const navigate = useNavigate();
  const fetchAllProducts = useStore((state) => state.fetchAllProducts);
  const fetchAllConsignments = useStore((state) => state.fetchAllConsignments);

  const productsList = useStore((state) => state.products.productsList);
  const consignmentsList = useStore((state) => state.consignments.consignmentsList);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [productsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    fetchAllProducts();
    fetchAllConsignments();
  }, []);

  useEffect(() => {
    if (productsList && consignmentsList) {
      const newProductsData = productsList.map((product: any) => ({
        ...product,
        id: product.productid,
        consignment: consignmentsList.find(
          (consignment: any) => consignment.id === product.consignmentid,
        ),
      }));
      console.log(newProductsData);
      setProductsData(newProductsData);
    }
  }, [productsList, consignmentsList]);

  const columnsProduct: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Product',
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img
            style={{ width: 50, height: 50, borderRadius: '8px' }}
            src={'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-1.webp'}
            alt={params.row.name}
          />

          <Box>
            <Typography
              variant='body2'
              fontWeight={600}
              mb={0}
              sx={{ color: 'var(--palette-text-primary)' }}
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();

                navigate(`/dashboard/product/detail`);
              }}
            >
              {params.row.name}
            </Typography>
            <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
              {params.row.category}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography variant='body2'>{params.row.description}</Typography>
        </Box>
      ),
    },
    {
      field: 'importDate',
      headerName: 'Import Date',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Typography variant='body2'>
            {new Date(params.row.consignment.importDate).toISOString().split('T')[0]}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'saleprice',
      headerName: 'Price ($)',
      width: 120,
      valueFormatter: (params: number) => `${params ? `${params.toLocaleString()}đ` : 0}`,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 120,
      renderCell: (params) => (
        <Box>
          <Box sx={{ mb: 0.5, width: '100%' }}>
            <LinearProgress
              color={
                params.row.quantity > 10
                  ? 'success'
                  : params.row.quantity === 0
                    ? 'error'
                    : 'warning'
              }
              variant='determinate'
              value={params.row.quantity}
            />
          </Box>

          <Typography variant='caption' sx={{ color: 'var(--palette-text-secondary)' }}>
            {`${params.row.quantity === 0 ? 'out of stock' : `${params.row.quantity} in stock`}`}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          color={params.value ? 'info' : 'default'}
          label={params.value ? 'Active' : 'Inactive'}
        />
      ),
    },
    {
      field: 'functions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: () => (
        <Box>
          <IconButton size='small'>
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton size='small'>
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Button
        sx={{
          position: 'absolute',
          right: '40px',
          top: '16px',
          width: 'fit-content',
          bgcolor: 'var(--palette-grey-800)',
          color: 'var(--palette-common-white)',
          padding: '8px',
          gap: '4px',
          fontSize: '13px',
        }}
        type='submit'
        variant='contained'
        fullWidth
        onClick={() => setOpenCreateProduct(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New Product
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={productsData}
              columns={columnsProduct}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              className='datagrid-minimals-custom'
              sx={{ minHeight: 500, maxHeight: 500 }}
            />
          </Paper>
        </Grid2>
      </Grid2>

      <CreateProductDialog
        open={openCreateProduct}
        onClose={() => {
          setOpenCreateProduct(false);
        }}
      />
    </>
  );
};

export default Product;
