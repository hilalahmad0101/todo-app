import { customPrimaryColors, customSecondaryColors } from '../customColors';
import { fontFamilies } from './typography';
export const muiButton = {
  styleOverrides: {
    containedPrimary: {
      color: customSecondaryColors.light
    },
    containedSecondary: {
      color: customPrimaryColors.main
    },
    textSecondary: {
      color: customPrimaryColors.main
    },
    sizeSmall: {
      padding: '1.2rem 2rem'
    },
    sizeMedium: {
      padding: '1.8rem 2rem',
      maxWidth: '200px'
    },
    root: {
      fontFamily: fontFamilies.clashDisplay,
      whiteSpace: 'nowrap',
      lineHeight: 0
    }
  },
  defaultProps: {
    disableElevation: true
  }
};
