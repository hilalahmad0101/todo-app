import { themeBreakPoints } from './breakPoints';

const fontFamilies = {
  Lato: '"Lato", sans-serif',
  JosefinSans: "'Josefin Sans', sans-serif"

};

function responsiveFontSizes(xs, sm, md, lg) {
  return {
    [`@media only screen and (min-width: ${themeBreakPoints.values.xs}px)`]: {
      fontSize: `${xs}px`
    },
    [`@media only screen and (min-width: ${themeBreakPoints.values.sm}px)`]: {
      fontSize: `${sm}px`
    },
    [`@media only screen and (min-width: ${themeBreakPoints.values.md}px)`]: {
      fontSize: `${md}px`
    },
    [`@media only screen and (min-width: ${themeBreakPoints.values.lg}px)`]: {
      fontSize: `${lg}px`
    }
  };
}

const typography = () => {
  return {
    // fontFamily: fontFamilies.JosefinSans,
    // lineHeight: '140%',
    // fontWeight: '400',


    customFonts: {
      JosefinSans: fontFamilies.JosefinSans,
      Lato: fontFamilies.Lato
    },

    h1: {
      ...responsiveFontSizes(30, 34, 35, 36),
    },
    h2: {
      ...responsiveFontSizes(22, 24, 26, 32)
    },
    h3: {
      ...responsiveFontSizes(18, 20, 22, 24)
    },
    h4: {
      ...responsiveFontSizes(18, 18, 18, 20)
    },
    h5: {
      ...responsiveFontSizes(14, 14, 16, 18)
    },
    h6: {
      ...responsiveFontSizes(8, 10, 12, 14)
    },

    body1: {
      fontFamily: fontFamilies.Lato,
      ...responsiveFontSizes(14, 14, 16, 18)
    },
    body2: {
      fontFamily: fontFamilies.Lato,
      ...responsiveFontSizes(10, 12, 14, 16)
    },
    subtitle1: {
      fontFamily: fontFamilies.Lato,
      ...responsiveFontSizes(12, 12, 14, 16)
    },
    subtitle2: {
      fontFamily: fontFamilies.Lato,
      ...responsiveFontSizes(12, 12, 12, 12)
    },
    caption: {
      fontFamily: fontFamilies.Lato,
      fontSize: '14px',
      lineHeight: "19px",
      textAlign: "left"
    },
    price: {
      fontSize: "10px",
      fontWeight: 'bold'
    }
  };
};

export { typography, fontFamilies };
