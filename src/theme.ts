import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00a76f',
    },
    secondary: {
      main: '#8e33ff',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Public Sans, -apple-system, BlinkMacSystemFont, Roboto',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      color: 'var(--palette-text-secondary)',
    },
    subtitle2: {
      fontSize: '14px',
      color: 'var(--palette-text-secondary)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '0.875rem',
          padding: '10px 18px',
          lineHeight: 'initial',
          ':focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ':focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: 'var(--palette-text-secondary)',
          '.MuiOutlinedInput-input': {
            fontSize: '14px',
            height: '16px',
          },
          '.MuiFormLabel-root': {
            color: 'var(--palette-text-secondary)',
            fontWeight: 600,
            lineHeight: '1.5',
          },
          '.MuiFormLabel-root.Mui-focused': {
            color: 'var(--palette-text-primary)',
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '8px',
            borderColor: 'rgba(var(--palette-grey-500Channel) / 0.5)',
          },
          '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            color: 'var(--palette-text-primary)',
            borderColor: 'var(--palette-text-primary) !important',
          },
        },
      },
      defaultProps: {
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--palette-background-paper)',
          boxShadow: 'var(--customShadows-card)',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '16px',
          padding: '24px',

          '&.MuiMenu-paper': {
            padding: '0 !important',
            borderRadius: '4px !important',
          },

          '&.MuiAutocomplete-paper': {
            padding: '0 !important',
            borderRadius: '4px !important',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-input': {
            // padding: '6px 12px',
            // fontSize: '14px',
            // color: 'var(--palette-text-primary)',
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(var(--palette-grey-500Channel) / 0.3)',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPopper: {
      styleOverrides: {
        root: {
          '&.MuiDataGrid-menu': {
            '.MuiPaper-root': {
              padding: 0,
            },
            '.MuiListItemIcon-root': {
              color: 'var(--palette-text-primary)',
            },
            '.MuiListItemText-root .MuiTypography-root': {
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--palette-text-primary)',
            },
          },
          '&.MuiMenu-rooter': {
            '.MuiMenu-paper': {
              padding: '0 !important',
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '.MuiCheckbox-root': {},
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '.MuiDataGrid-columnHeaders': {
            '.MuiDataGrid-columnHeader': {
              backgroundColor: 'var(--palette-background-neutral)',
              color: 'var(--palette-text-secondary)',
              fontSize: '13px',

              '.MuiDataGrid-columnHeaderTitleContainerContent': {
                fontWeight: 600,
              },
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '6px',
          borderRadius: '4px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          height: 'fit-content',
          fontSize: '0.7rem',
          fontWeight: 700,

          '.MuiChip-label': {
            padding: '8px 6px',
            lineHeight: '8px',
          },
        },
        colorDefault: {
          color: 'var(--palette-text-secondary)',
          backgroundColor: 'rgba(var(--palette-grey-500Channel) / 0.16)',
        },
        colorPrimary: {
          color: 'var(--palette-primary-secondary)',
          backgroundColor: 'rgba(var(--palette-primary-mainChannel) / 0.16)',
        },
        colorSecondary: {
          color: 'var(--palette-secondary-secondary)',
          backgroundColor: 'rgba(var(--palette-secondary-mainChannel) / 0.16)',
        },
        colorInfo: {
          color: 'var(--palette-info-dark)',
          backgroundColor: 'rgba(var(--palette-info-mainChannel) / 0.16)',
        },
        colorWarning: {
          color: 'var(--palette-warning-dark)',
          backgroundColor: 'rgba(var(--palette-warning-mainChannel) / 0.16)',
        },
        colorSuccess: {
          color: 'var(--palette-success-dark)',
          backgroundColor: 'rgba(var(--palette-success-mainChannel) / 0.16)',
        },
        colorError: {
          color: 'var(--palette-error-dark)',
          backgroundColor: 'rgba(var(--palette-error-mainChannel) / 0.16)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '.MuiModal-backdrop': {
            backgroundColor: 'rgba(var(--palette-grey-800Channel) / 0.48)',
          },
          '.MuiDialog-paper': {
            padding: 0,
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '20px',
          fontWeight: 700,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'var(--palette-text-secondary)',
          fontWeight: 600,
          // lineHeight: '1.5',
          fontSize: '14px',

          '&.Mui-focused': {
            color: 'var(--palette-text-primary)',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '8px',
            borderColor: 'rgba(var(--palette-grey-500Channel) / 0.5)',
          },
          '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            color: 'var(--palette-text-primary)',
            borderColor: 'var(--palette-text-primary) !important',
          },
          '.MuiInputBase-root': {
            fontSize: '14px',
          },
        },
      },
    },
  },
});

export default theme;
