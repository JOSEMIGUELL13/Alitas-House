"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { FaBurger, FaHotdog, FaFire, FaStar } from "react-icons/fa6"
import { BiSolidFoodMenu } from "react-icons/bi"
import { useImages } from "./ImageImports"

// Datos de snacks mejorados con descripciones, etiquetas e imageKey para mapear las imágenes
const snacksData = [
  {
    name: "Gajo",
    price: "$53",
    icon: "🍟",
    description: "Papas gajo sazonadas con especias",
    tags: ["Mas vendido"],
    imageKey: "gajoPng",  // Asignamos la clave correspondiente a la imagen
  },
  {
    name: "Wafflle",
    price: "$53",
    icon: "🍟",
    description: "Papas waffle sazonadas con especias",
    tags: ["Popular"],
    imageKey: "wafflePng",  // Asignamos la clave correspondiente a la imagen
  },
  {
    name: "Francesa",
    price: "$45",
    icon: "🍟",
    description: "Papas a la francesa crujientes",
    tags: [],
    imageKey: "papasPng",
  },
  {
    name: "Nuggets",
    price: "$50",
    icon: "🍗",
    description: "Nuggets de pollo crujientes",
    tags: ["Para niños"],
    imageKey: "nuggets",
  },
  {
    name: "Aros de cebolla",
    price: "$53",
    icon: "⭕",
    description: "Aros de cebolla empanizados",
    tags: [],
    imageKey: "arosPng",
  },
  {
    name: "Jalapeños Philadelphia",
    price: "$60",
    icon: "🌶️",
    description: "Jalapeños rellenos de queso crema",
    tags: [],
    imageKey: "Jalapeños",
  },
  {
    name: "Dedos de queso",
    price: "$60",
    icon: "🧀",
    description: "Bastones de queso mozzarella empanizados",
    tags: ["Popular"],
    imageKey: "dedossPng",
  },
]

const hotDogsData = [
  {
    name: "Sencillo",
    price: "$30",
    description: "Clásico hot dog con salchicha, catsup y mostaza",
    tags: ["Clásico"],
    extras: ["Cebolla caramelizada", "Tomate", "Jalapeños"],
    imageKey: "hotdogPng",
  },
  {
    name: "Especial",
    price: "$40",
    description: "Con cebolla caramelizada, Tomate, cebolla, chips ",
    tags: ["Recomendado"],
    extras: ["salsa", "topping", "Chps Rufles"],
    imageKey: "hotdogPng",
  },
]

const hamburguesaData = [
  {
    name: "C/ gajo",
    price: "$67",
    description: "Hamburguesa de pollo con papas gajo y salsa de tu eleccion",
    tags: [],
    extras: ["Queso extra", "Salsa","Toppings"],
    imageKey: "hamburguesaPng",
  },
  {
    name: "C/ francesa",
    price: "$62",
    description: "Hamburguesa de pollo con papas a la francesa y salsa de tu eleccion",
    tags: ["Más vendido"],
    extras: ["Queso extra", "Salsa","Toppings"],
    imageKey: "hamburguesaPng",
  },
]

// Componente Badge para mostrar etiquetas especiales
const Badge = ({ text, type }) => {
  let bgColor = "bg-orange-500"
  const textColor = "text-white"
  let icon = null

  switch (type) {
    case "Popular":
      bgColor = "bg-yellow-500"
      icon = <FaStar className="mr-1" />
      break
    case "Picante":
      bgColor = "bg-red-600"
      icon = <FaFire className="mr-1" />
      break
    case "Recomendado":
    case "Más vendido":
      bgColor = "bg-green-600"
      break
    case "Para niños":
      bgColor = "bg-blue-500"
      break
    case "Clásico":
      bgColor = "bg-purple-500"
      break
    default:
      bgColor = "bg-gray-600"
  }

  return (
    <span className={`${bgColor} ${textColor} text-xs font-bold px-2 py-1 rounded-full flex items-center`}>
      {icon}
      {text}
    </span>
  )
}

const SnackCard = ({ item, index, className, images }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [showDetails, setShowDetails] = useState(false)
  
  // Obtenemos la imagen correspondiente usando la clave imageKey
  const imageSrc = item.imageKey ? images[item.imageKey] : null

  return (
    <motion.div
      ref={ref}
      className={`${className} p-3`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="relative h-full bg-gradient-to-br from-black to-orange-950 rounded-xl overflow-hidden shadow-xl border border-orange-800/30 transition-all duration-300"
        whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(255, 132, 0, 0.3)" }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {/* Efecto de brillo en la esquina */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 opacity-20 rounded-bl-full"></div>

        {/* Decoración lateral */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 via-yellow-500 to-transparent"></div>

        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              {imageSrc ? (
                <div className="w-12 h-12 mr-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 flex items-center justify-center shadow-lg">
                  <img src={imageSrc} alt={item.name} className="w-8 h-8 object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 mr-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 flex items-center justify-center shadow-lg">
                  <span className="text-xl">{item.icon}</span>
                </div>
              )}
              <div>
                <h3 className="text-white font-bold text-xl">{item.name}</h3>
                <p className="text-white/70 text-sm mt-1 line-clamp-1">{item.description}</p>
              </div>
            </div>
            <div className="text-orange-400 font-bold text-2xl bg-black/50 px-3 py-1 rounded-full shadow-inner">
              {item.price}
            </div>
          </div>

          {/* Etiquetas */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags.map((tag, i) => (
                <Badge key={i} text={tag} type={tag} />
              ))}
            </div>
          )}

          {/* Extras - Mostrar solo si showDetails es true */}
          <AnimatePresence>
            {showDetails && item.extras && (
              <motion.div
                className="mt-4 bg-black/30 p-3 rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-yellow-400 font-medium mb-2">Extras:</h4>
                <ul className="text-white/80 text-sm">
                  {item.extras.map((extra, i) => (
                    <li key={i} className="flex items-center my-1">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                      {extra}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón para mostrar detalles - Solo si hay extras */}
          {item.extras && (
            <motion.button
              className="mt-auto self-end text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1 mt-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showDetails ? "Ocultar detalles" : "Ver detalles"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const FoodSection = ({ title, items, icon, headerColor }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const images = useImages()

  return (
    <motion.div
      ref={ref}
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center mb-6 bg-black/40 p-3 rounded-xl shadow-lg">
        <div
          className={`w-12 h-12 mr-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 p-2 flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
        <div>
          <h3
            className={`text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-${headerColor} to-yellow-300`}
          >
            {title}
          </h3>
          <div className={`w-16 h-1 bg-${headerColor} mt-1`}></div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3">
        {items.map((item, index) => (
          <SnackCard 
            key={index} 
            item={item} 
            index={index} 
            className="w-full sm:w-1/2 lg:w-1/3" 
            images={images}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Componente para el filtro de categorías
const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: "all", name: "Todo", icon: <BiSolidFoodMenu /> },
    { id: "snacks", name: "Snacks", icon: "🍟" },
    { id: "hotdogs", name: "Hot Dogs", icon: <FaHotdog /> },
    { id: "hamburguesas", name: "Hamburguesas", icon: <FaBurger /> },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
            activeCategory === category.id
              ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
              : "bg-black/30 text-white/70 hover:bg-black/50"
          }`}
          onClick={() => setActiveCategory(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{typeof category.icon === "string" ? category.icon : category.icon}</span>
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}

const Snacks = () => {
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: false, amount: 0.5 })
  const images = useImages()
  const [activeCategory, setActiveCategory] = useState("all")
  
  // Verificar en consola que las imágenes están disponibles
  console.log("Imágenes disponibles:", Object.keys(images))

  return (
    <section
      id="snacks"
      className="relative py-24 px-5 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Partículas de fondo */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.7, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Título de sección */}
        <motion.div
          ref={titleRef}
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
            Nuestro Menú
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Disfruta de nuestras deliciosas opciones preparadas con los mejores ingredientes. Cada platillo está hecho
            con dedicación para ofrecerte una experiencia única.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Filtro de categorías */}
        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* Secciones de comida */}
        {(activeCategory === "all" || activeCategory === "snacks") && (
          <FoodSection
            title="Snacks"
            items={snacksData}
            icon={<span className="text-2xl">🍟</span>}
            headerColor="yellow-500"
          />
        )}

        {(activeCategory === "all" || activeCategory === "hotdogs") && (
          <FoodSection 
            title="Hot Dogs" 
            items={hotDogsData} 
            icon={<FaHotdog size={24} />} 
            headerColor="blue-500" 
          />
        )}

        {(activeCategory === "all" || activeCategory === "hamburguesas") && (
          <FoodSection
            title="Hamburguesa de Pollo"
            items={hamburguesaData}
            icon={<FaBurger size={24} />}
            headerColor="purple-500"
          />
        )}
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-red-600 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-orange-500 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute top-2/3 left-1/4 w-40 h-40 bg-yellow-500 rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
    </section>
  )
}

export default Snacks