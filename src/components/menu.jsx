import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
import Atropos from 'atropos/react';
import 'atropos/css';

// Simulación de datos de menú, basados en la imagen
const menuData = {
  boneless: [
    { size: '5 pzs', price: '$78' },
    { size: '7 pzs', price: '$98' },
    { size: '10 pzs', price: '$128' },
    { size: '15 pzs', price: '$175' }
  ],
  alitas: [
    { size: '5 pzs', price: '$68' },
    { size: '7 pzs', price: '$88' },
    { size: '10 pzs', price: '$118' },
    { size: '15 pzs', price: '$165' }
  ]
};

// Animación de fuego lottie
const fireLottieAnimation = {
  v: '5.7.1',
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ty: 4,
      nm: 'Flame',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              p: { a: 0, k: [0, 0] },
              s: {
                a: 1,
                k: [
                  { t: 0, s: [100, 100], e: [120, 150] },
                  { t: 30, s: [120, 150], e: [100, 100] },
                  { t: 60, s: [100, 100] }
                ]
              }
            },
            {
              ty: 'fl',
              c: {
                a: 1,
                k: [
                  { t: 0, s: [1, 0.5, 0], e: [1, 0.2, 0] },
                  { t: 30, s: [1, 0.2, 0], e: [1, 0.5, 0] },
                  { t: 60, s: [1, 0.5, 0] }
                ]
              },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

const MenuItem = ({ title, items, isRight = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`w-full md:w-1/2 p-4 ${isRight ? 'md:pl-8' : 'md:pr-8'}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Atropos 
        className="atropos-banner"
        highlight={true}
        shadow={true}
      >
        <div className="relative bg-gradient-to-br from-black via-black to-orange-900 rounded-2xl overflow-hidden shadow-xl border border-orange-900/30 h-full p-6">
          <motion.h2 
            className="text-center text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600"
            style={{ 
              textShadow: '0 0 15px rgb(255, 8, 0)'
            }}
          >
            {title}
          </motion.h2>
          
          <div className="space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center border-b border-orange-800/30 pb-4"
                variants={itemVariants}
              >
                <span className="text-white text-2xl">{item.size}</span>
                <span className="text-orange-400 text-2xl font-bold">{item.price}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Efecto decorativo */}
          <div className="absolute -bottom-10 -right-10 opacity-10 w-40 h-40">
            <Lottie 
              animationData={fireLottieAnimation} 
              loop={true} 
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </Atropos>
    </motion.div>
  );
};

const Menu = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.3 });

  return (
    <section id="menu" className="relative py-24 px-4 overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Overlay con textura */}
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0l20 20-20 20z' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px'
        }}
      ></div>
      
      <div className="container mx-auto relative z-10">
        {/* Título de sección */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            <span className="text-orange-500">MENU</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </motion.div>
        
        {/* Contenedor flexible para los elementos del menú */}
        <div className="flex flex-wrap -mx-4">
          <MenuItem title="Boneless" items={menuData.boneless} />
          <MenuItem title="Alitas" items={menuData.alitas} isRight={true} />
        </div>
      </div>
      
      {/* Divisor estilizado */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 53.3C840 47 960 33 1080 30C1200 27 1320 33 1380 36.7L1440 40V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="#e65c00" fillOpacity="0.3"/>
        </svg>
      </div>
    </section>
  );
};

export default Menu;