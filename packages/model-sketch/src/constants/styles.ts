export const SYSTEM_FONTS = [
  /* * Apple * */
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  /* * Microsoft * */
  'Segoe UI',
  /* * Android * */
  'Roboto',
];

type FontWeightType =
  | 'Regular'
  | 'Bold'
  | 'Semibold'
  | 'UltraLight'
  | 'Thin'
  | 'Light'
  | 'Medium'
  | 'Heavy'
  | 'Black';

type FontWeightEnum = {
  normal: FontWeightType;
  bold: FontWeightType;
  bolder: FontWeightType;
  '100': FontWeightType;
  '200': FontWeightType;
  '300': FontWeightType;
  '400': FontWeightType;
  '500': FontWeightType;
  '600': FontWeightType;
  '700': FontWeightType;
  '800': FontWeightType;
  '900': FontWeightType;
};

/**
 * 字体权重
 * */
export const FONT_WEIGHTS: FontWeightEnum = {
  normal: 'Regular',
  bold: 'Bold',
  bolder: 'Semibold',
  '100': 'UltraLight',
  '200': 'Thin',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'Semibold',
  '700': 'Bold',
  '800': 'Heavy',
  '900': 'Black',
};
