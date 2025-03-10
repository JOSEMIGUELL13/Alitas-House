import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

// Animación simple de alitas
const wingAnimation = {
  v: '5.7.1',
  fr: 30,
  ip: 0,
  op: 60,
  w: 300,
  h: 300,
  nm: 'Wings',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Wing',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [-5], e: [5] },
            { t: 30, s: [5], e: [-5] },
            { t: 60, s: [-5] }
          ]
        },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [80, 30] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 15 }
            },
            {
              ty: 'fl',
              c: { a: 0, k: [0.98, 0.45, 0.02] },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <Lottie 
          animationData={wingAnimation} 
          style={{ width: 150, height: 150 }}
          loop={true}
        />
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
          Alitas House
        </span>
      </motion.h1>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '250px' }}
        transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-4 text-white/70"
      >
        Cargando delicias...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;