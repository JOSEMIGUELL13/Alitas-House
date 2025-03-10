import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaFire, FaPepperHot, FaInfoCircle } from 'react-icons/fa';

// Datos de salsas con descripciones añadidas
const salsasData = [
  { 
    name: 'Bbq', 
    picante: 1, 
    color: 'from-red-900 to-red-700',
    description: 'Dulce y ahumada, perfecta para los amantes de sabores tradicionales.'
  },
  { 
    name: 'Bbq hot', 
    picante: 2, 
    color: 'from-red-800 to-orange-600',
    description: 'Nuestra clásica BBQ con un toque picante para más sabor.'
  },
  { 
    name: 'Búfalo', 
    picante: 3, 
    color: 'from-red-700 to-orange-500',
    description: 'Salsa clásica americana con el balance perfecto entre picante y mantequilla.'
  },
  { 
    name: 'Búfalo habanero', 
    picante: 4, 
    color: 'from-orange-700 to-yellow-600',
    description: 'Nuestra búfalo elevada con el intenso picor del habanero.'
  },
  { 
    name: 'Mango habanero', 
    picante: 3, 
    color: 'from-yellow-600 to-amber-500',
    description: 'Dulzura tropical del mango con el kick picante del habanero.'
  },
  { 
    name: 'Piña habanero', 
    picante: 3, 
    color: 'from-yellow-700 to-amber-600',
    description: 'Sabor tropical de piña con el picante característico del habanero.'
  },
  { 
    name: 'Zarzamora habanero', 
    picante: 3, 
    color: 'from-purple-900 to-purple-700',
    description: 'Dulzura de bayas con un toque picante del habanero.'
  },
  { 
    name: 'Chipotle', 
    picante: 2, 
    color: 'from-red-800 to-orange-800',
    description: 'Sabor ahumado con notas de chile seco y especias.'
  },
  { 
    name: 'Aguachile', 
    picante: 4, 
    color: 'from-green-700 to-green-500',
    description: 'Fresca y cítrica con chile serrano y pepino.'
  },
  { 
    name: 'Pimienta limón', 
    picante: 1, 
    color: 'from-yellow-500 to-lime-500',
    description: 'Cítrica y aromática con un toque de pimienta negra.'
  },
  { 
    name: 'Ajo parmesano', 
    picante: 0, 
    color: 'from-white to-yellow-100',
    description: 'Cremosa y aromática con ajo tostado y queso parmesano.'
  },
  { 
    name: 'Parmesano', 
    picante: 0, 
    color: 'from-yellow-100 to-amber-100',
    description: 'Cremosa con el sabor intenso del queso parmesano italiano.'
  },
  { 
    name: 'Agridulces', 
    picante: 0, 
    color: 'from-orange-600 to-amber-400',
    description: 'Balance perfecto entre dulce y ácido, estilo asiático.'
  },
  { 
    name: 'Philadelphia jalapeño', 
    picante: 1, 
    color: 'from-blue-100 to-green-200',
    description: 'Cremosa con queso philadelphia y un toque de jalapeño fresco.'
  }
];

// Componente para renderizar el nivel de picante
const SpicyLevel = ({ level }) => {
  const colors = [
    "text-green-400", // nivel 0
    "text-yellow-400", // nivel 1
    "text-orange-400", // nivel 2
    "text-red-500", // nivel 3
    "text-red-600" // nivel 4
  ];
  
  const labels = ["Suave", "Ligero", "Medio", "Picante", "Muy picante"];
  
  if (level === 0) {
    return <span className={`${colors[level]} text-sm font-medium`}>{labels[level]}</span>;
  }
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {Array(level).fill(0).map((_, i) => (
          <FaFire key={i} className={colors[level]} />
        ))}
      </div>
      <span className={`${colors[level]} text-xs font-medium`}>{labels[level]}</span>
    </div>
  );
};

const SalsaCard = ({ salsa, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div 
        className={`relative h-full rounded-xl overflow-hidden shadow-xl backdrop-blur-sm border border-orange-900/30`}
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${salsa.color} opacity-30`}></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative p-5 h-full flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-2 text-white">{salsa.name}</h3>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Ver detalles"
            >
              <FaInfoCircle />
            </button>
          </div>
          
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="my-3 text-white/80 text-sm overflow-hidden"
              >
                <p>{salsa.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-auto pt-3 flex items-center justify-between">
            <SpicyLevel level={salsa.picante} />
            
            {/* Elemento decorativo */}
            <div className="opacity-40">
              <FaPepperHot size={20} className={`${salsa.picante > 0 ? "text-red-500" : "text-gray-400"}`} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Componente para filtrar salsas
const SalsaFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { name: "Todas", value: "all" },
    { name: "No Picantes", value: 0 },
    { name: "Ligeras", value: 1 },
    { name: "Medias", value: 2 },
    { name: "Picantes", value: 3 },
    { name: "Muy Picantes", value: 4 }
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {filters.map((filter) => (
        <motion.button
          key={filter.value}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.value 
              ? "bg-pink-600 text-white" 
              : "bg-gray-800/50 text-white/70 hover:bg-gray-700/70"
          }`}
          onClick={() => setActiveFilter(filter.value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.name}
        </motion.button>
      ))}
    </div>
  );
};

const Salsas = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.5 });
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Filtrar salsas basado en el filtro activo
  const filteredSalsas = salsasData.filter(salsa => 
    activeFilter === "all" || salsa.picante === activeFilter
  );

  return (
    <section id="salsas" className="relative py-24 px-4 bg-gradient-to-b from-black via-black to-gray-900 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-orange-500 filter blur-3xl"></div>
        <div className="absolute top-2/3 left-1/2 w-80 h-80 rounded-full bg-yellow-500 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Título de sección */}
        <motion.div
          ref={titleRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-500 to-orange-500">
            Nuestras Salsas
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto"></div>
          <p className="text-white/80 mt-6 max-w-2xl mx-auto text-lg">
            Elige entre nuestra variedad de deliciosas salsas para acompañar tus alitas y boneless
          </p>
        </motion.div>
        
        {/* Filtros */}
        <SalsaFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        {/* Grid de tarjetas */}
        <motion.div 
          className="flex flex-wrap -mx-3"
          layout
          transition={{ duration: 0.4, type: "spring" }}
        >
          {filteredSalsas.map((salsa, index) => (
            <SalsaCard key={salsa.name} salsa={salsa} index={index} />
          ))}
        </motion.div>
        
        {/* Mensaje si no hay resultados */}
        {filteredSalsas.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-white/70"
          >
            No hay salsas que coincidan con este nivel de picante.
          </motion.div>
        )}
      </div>
      
      {/* Divisor estilizado */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 53.3C840 47 960 33 1080 30C1200 27 1320 33 1380 36.7L1440 40V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" 
      fill="#000000" fillOpacity="0.9"/>
  </svg>
</div>

    </section>
  );
};

export default Salsas;