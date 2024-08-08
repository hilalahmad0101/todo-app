import { customPrimaryColors, customSecondaryColors } from '../customColors';

export const inputTextField = {
  defaultProps: {
    fullWidth: false,
    variant: 'outlined',
  },

  styleOverrides: {
    root: {
      border: "0px solid pink",
      fontSize: '1rem',
    },

  }
};

export const inputTextFilledInput = {
  defaultProps: {
    disableUnderline: true,
    color: 'primary',

  },
  styleOverrides: {
    colorPrimary: {
      backgroundColor: customPrimaryColors.light,
      color: customSecondaryColors.main
    },
    colorSecondary: {
      backgroundColor: customSecondaryColors.main,
      color: customSecondaryColors.main
    },
    input: {
      padding: '0',
      '&::placeholder': {
        color: customSecondaryColors.white
      }
    }
  }
};
