import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material';

const iconMap = {
  success: <CheckCircle color='success' fontSize='large' />,
  error: <Error color='error' fontSize='large' />,
  warning: <Warning color='warning' fontSize='large' />,
  info: <Info color='info' fontSize='large' />,
};

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

const ConfirmationDialog: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  type = 'info',
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm'>
      <DialogTitle display='flex' alignItems='center' gap={1}>
        {iconMap[type]} {title}
      </DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant='contained' color={type}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
