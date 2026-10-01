import { createTheme, type MantineColorsTuple } from '@mantine/core';

// Cores geradas baseadas no verde esmeralda #2D6D65
const brandColors: MantineColorsTuple = [
  '#e5f4f2',
  '#cce9e5',
  '#99d2cc',
  '#66bbb3',
  '#33a499',
  '#2D6D65', // Sua cor primária exata
  '#245751',
  '#1b413d',
  '#122b28',
  '#091614',
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: brandColors,
  },
  defaultRadius: 'xl', // Mantendo o padrão arredondado (pílula) que você desenhou
  fontFamily: 'Inter, sans-serif',
});
