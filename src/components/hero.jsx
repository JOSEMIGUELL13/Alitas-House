"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import gsap from "gsap"
import { useImages } from "./ImageImports"
import { FaStar, FaFire, FaRegClock, FaCheck } from "react-icons/fa"

const Hero = ({ setActiveSection }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [activePromo, setActivePromo] = useState(0)
  const images = useImages()

  // Scroll Animation
  const { scrollY } = useScroll()
  // Eliminamos efectos de scroll para mantener elementos estáticos
  const titleOpacity = 1
  const titleY = 0
  const imageScale = 1

  // Promociones/características destacadas
  const promos = [
    { title: "Eperiencias Unicas", description: "Sabores caseros", icon: <FaStar className="text-yellow-400" /> },
    { title: "Salsas únicas", description: "Más de 12 sabores", icon: <FaFire className="text-red-500" /> },
    { title: "Entrega rápida", description: "En menos de 30 min", icon: <FaRegClock className="text-blue-400" /> },
  ]

  // Características principales
  const features = ["Alitas crujientes", "Boneless sabrosos", "Salsas artesanales", "Snacks deliciosos"]

  useEffect(() => {
    // Mark component as loaded after a short delay
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Rotate through promos
    const promoInterval = setInterval(() => {
      setActivePromo((prev) => (prev + 1) % promos.length)
    }, 4000)

    return () => {
      clearTimeout(loadTimer)
      clearInterval(promoInterval)
    }
  }, [promos.length])

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    })

    // Title animation with staggered spans
    tl.fromTo(".split-text span", { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.8 }, 0.3)
      .fromTo(
        ".hero-badge",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" },
        0.8,
      )
      .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1)
      .fromTo(".hero-features", { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, 1.2)
      .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.4)
      .fromTo(".promo-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.5)

    // Mouse movement tracking for interactive elements
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: clientX / innerWidth - 0.5,
        y: clientY / innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      tl.kill()
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Split title text into individual characters for animation
  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 md:px-8 bg-black"
    >
      {/* Fondo con gradiente avanzado */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900 via-red-900 to-black opacity-80 z-0"></div>

      {/* Textura de fondo */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fillOpacity='0.4' fillRule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Partículas de fuego interactivas */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {isLoaded &&
          Array(25)
            .fill(0)
            .map((_, i) => {
              const size = 2 + Math.random() * 5
              const duration = 3 + Math.random() * 7
              const xPos = Math.random() * 100

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    left: `${xPos}%`,
                    background: `radial-gradient(circle, rgba(255,159,0,1) 0%, rgba(255,64,0,1) 70%, rgba(255,0,0,0) 100%)`,
                    boxShadow: "0 0 10px 2px rgba(255, 69, 0, 0.3)",
                  }}
                  initial={{
                    y: window.innerHeight + 10,
                    opacity: 0.3 + Math.random() * 0.7,
                    x: 0,
                  }}
                  animate={{
                    y: -100,
                    opacity: [0.7, 0.9, 0],
                    x: (xPos > 50 ? -1 : 1) * Math.random() * 100,
                  }}
                  transition={{
                    duration: duration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 10,
                    ease: "easeOut",
                  }}
                />
              )
            })}
      </div>

      {/* Contenido principal */}
      <div
        ref={containerRef}
        className="container mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center"
      >
        {/* Lado izquierdo: Título, descripción y CTA */}
        <div className="md:w-1/2 mt-12 md:mt-0">
          <motion.div ref={titleRef} style={{ opacity: titleOpacity, y: titleY }} className="relative">
            {/* Badges flotantes */}
            <div className="absolute -right-4 -top-8">
              <motion.div
                className="hero-badge bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg shadow-red-900/40 flex items-center gap-1 transform rotate-3"
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <FaFire /> Súper picantes
              </motion.div>
            </div>

            {/* Título principal con clase para animación de caracteres */}
            <h1 className="split-text text-6xl md:text-8xl font-extrabold mb-6 tracking-tight">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 inline-block">
                {splitText("")}
              </div>
              <br />
              <div className="text-white inline-block mt-1">
                {splitText("Alitas House")}
              </div>
            </h1>

            {/* Fuego animado integrado con el título */}
            <motion.div
              className="absolute -right-10 md:right-0 -top-10 w-32 h-32 md:w-48 md:h-48 z-[-1] opacity-80"
              animate={{
                rotate: [-2, 2, -2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <img src={images.fuegoPng || "/placeholder.svg"} alt="Fuego" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>

          <motion.p
            className="hero-subtitle text-xl md:text-2xl text-white/90 mb-6 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Disfruta las alitas más deliciosas con nuestras salsas caseras, hechas con ingredientes frescos y mucho
            sabor.
          </motion.p>

          {/* Lista de características */}
          <ul className="mb-8 flex flex-wrap gap-x-5 gap-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="hero-features flex items-center text-white/80"
                whileHover={{ x: 5, color: "rgba(255, 255, 255, 1)" }}
              >
                <span className="w-5 h-5 mr-2 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <FaCheck className="text-white text-xs" />
                </span>
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="hero-cta relative px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full text-white font-bold shadow-lg shadow-orange-900/50 overflow-hidden group"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(255, 69, 0, 0.7)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                document.getElementById("menu").scrollIntoView({ behavior: "smooth" })
                setActiveSection("menu")
              }}
            >
              {/* Efecto de brillo en hover */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              Ver Menú
            </motion.button>

            <motion.a
              href={`https://wa.me/3421052747`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ordenar ahora
            </motion.a>
          </div>

          {/* Promotional badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePromo}
              className="promo-badge mt-10 bg-gradient-to-r from-black/60 to-black/20 backdrop-blur-sm p-3 rounded-lg border border-orange-900/30 max-w-md shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                  {promos[activePromo].icon}
                </div>
                <div>
                  <div className="text-xs text-orange-400 font-medium">{promos[activePromo].title}</div>
                  <div className="text-white font-semibold">{promos[activePromo].description}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lado derecho: Imagen principal */}
        <div className="md:w-1/2 relative">
          <motion.div
            style={{ scale: imageScale }}
            initial={{ opacity: 0, x: 50, rotateY: 25 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              type: "spring",
              stiffness: 70,
              damping: 15,
            }}
            className="relative"
          >
            {/* Círculo decorativo detrás de la imagen */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-600/30 to-red-900/40 blur-xl z-0"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Contenedor para efecto de fuego */}
            <div className="relative z-10">
              <div className="w-full h-64 md:h-96 flex items-center justify-center">
                <img
                  src={images.alitas3Webp || "/placeholder.svg"}
                  alt="Alitas deliciosas"
                  className="max-w-full max-h-full object-contain z-20 relative"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(255, 69, 0, 0.7))",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Badge circular de calidad */}
          <motion.div
            className="absolute -right-5 bottom-10 z-20 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              delay: 1.2, 
              duration: 0.8, 
              type: "spring", 
              stiffness: 120,
              damping: 10
            }}
            whileHover={{ 
              scale: 1.08, 
              rotate: 5,
              transition: { duration: 0.3 } 
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Main badge container */}
            <div className="w-22 h-22 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-xl shadow-amber-900/40 relative overflow-hidden p-1 cursor-pointer">
              {/* Shiny effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-70"></div>
              
              {/* Rotating dashed border */}
              <div
                className="absolute inset-1 rounded-full border-[3px] border-dashed border-yellow-300/80 animate-spin-slow"
                style={{ animationDuration: "25s" }}
              />
              
              {/* Inner content container */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex flex-col items-center justify-center text-center p-1 relative z-10">
                {/* Star burst effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)]"></div>
                </div>
                
                {/* Text content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-xs md:text-base font-extrabold text-yellow-100 tracking-wider">100%</div>
                  <div className="text-sm md:text-2xl font-black text-white leading-none tracking-wide my-0.5 md:my-1">SABOR</div>
                  <div className="text-xs md:text-sm font-bold text-yellow-100/90 tracking-wider">GARANTIZADO</div>
                </div>
              </div>
              
              {/* Optional highlight effect */}
              <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-white/70 blur-[1px]"></div>
              <div className="absolute bottom-0 right-1/4 w-1/2 h-[1px] bg-white/70 blur-[1px]"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simple decoración inferior */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  )
}

export default Hero

