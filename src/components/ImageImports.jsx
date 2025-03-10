// src/components/ImageImports.jsx
import { createContext, useContext } from 'react';

// Import all images
import alitasWebp from '../assets/alitas.webp';
import alitas3Webp from '../assets/alitas3.webp';
import hamburguesaPng from '../assets/hamburguesa.png';
import papasPng from '../assets/papas.webp';
import wafflePng from '../assets/waffle.png';
import hotdogPng from '../assets/hotdog.png';
import gajoPng from '../assets/gajo.webp';
import arosPng from '../assets/aros.webp';
import dedossPng from '../assets/Dedos.png';
import fuegoPng from  '../assets/fuego.png';
import nuggets from  '../assets/nuggets.webp';
import Jalapeños from  '../assets/jalapeños.webp';
import dip from  '../assets/dip.webp';
// Create a context to store all image URLs
const ImageContext = createContext({});

// Create a provider component
export const ImageProvider = ({ children }) => {
  const images = {
    alitasWebp,
    alitas3Webp,
    hamburguesaPng,
    papasPng,
    wafflePng,
    dedossPng,
    arosPng,
    gajoPng,
    hotdogPng,
    nuggets,
    fuegoPng,
    Jalapeños,
    dip
  };

  return (
    <ImageContext.Provider value={images}>
      {children}
    </ImageContext.Provider>
  );
};

// Create a hook to use the images
export const useImages = () => {
  return useContext(ImageContext);
};

export default {
  alitasWebp,
  alitas3Webp,
  hamburguesaPng,
  papasPng,
  wafflePng,
  dedossPng,
  arosPng,
  gajoPng,
  hotdogPng,
  nuggets,
  fuegoPng,
  Jalapeños,
  dip
};