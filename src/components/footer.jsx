"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  FaFacebook,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaArrowUp,
  FaUtensils,
  FaMotorcycle,
} from "react-icons/fa"

const Footer = () => {
  const [showMap, setShowMap] = useState(false)
  const [messageStatus, setMessageStatus] = useState(null)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.3 })

  // Número de teléfono
  const phoneNumber = "3421052747"

  // Dirección (ejemplo)
  const address = "Calle Constitucion #17, Centro, Amacueca Jal."

  // Horarios
  const hours = [
    { days: "Jueves a Viernes", time: "19:00 - 22:00" },
    { days: "Sabado a Domingo", time: "15:00 - 22:00" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook size={20} />,
      url: "https://www.facebook.com/alitashouse.28",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      shadowColor: "shadow-blue-500/50",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      url: `https://wa.me/${phoneNumber}`,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      shadowColor: "shadow-green-500/50",
    },
  ]

const handleSubmit = async (e) => {
  e.preventDefault();

  setMessageStatus("sending");
  try {
    // Obtener la URL base del entorno
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al enviar el mensaje");
    }

    // Si todo sale bien, mostrar éxito
    setMessageStatus("success");
    setEmail("");
    setMessage("");

    // Resetear después de 3 segundos
    setTimeout(() => {
      setMessageStatus(null);
    }, 3000);
  } catch (error) {
    console.error("Error:", error);
    setMessageStatus("error");
    // Mostrar mensaje de error más informativo
    console.error("Detalles del error:", error);
    setTimeout(() => {
      setMessageStatus(null);
    }, 3000);
  }
};

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Animación para elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer ref={footerRef} className="relative bg-black text-white pt-20 pb-8 overflow-hidden">
      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-orange-500/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Fondo con gradiente avanzado */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-black/95 to-black z-0"></div>

      {/* Textura de fondo mejorada */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fillOpacity='0.4' fillRule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Divisor superior con forma de onda */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-orange-900/20"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <motion.div
          className="flex flex-wrap -mx-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Logo y descripción */}
          <motion.div className="w-full lg:w-1/3 px-4 mb-12 lg:mb-0" variants={itemVariants}>
            <motion.div className="mb-6 inline-block" whileHover={{ scale: 1.05 }}>
              <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                Alitas House
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"></div>
            </motion.div>
            <p className="text-white/80 max-w-xs leading-relaxed mb-6">
              Las mejores alitas y boneless con una increíble variedad de salsas para disfrutar con amigos y familia.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-orange-900/30 text-orange-400 text-xs font-semibold rounded-full flex items-center">
                <FaUtensils className="mr-1" /> Servicio de calidad
              </span>
              <span className="px-3 py-1 bg-orange-900/30 text-orange-400 text-xs font-semibold rounded-full flex items-center">
                <FaMotorcycle className="mr-1" /> Entrega rápida
              </span>
            </div>
          </motion.div>

          {/* Contacto y Ubicación */}
          <motion.div className="w-full lg:w-1/3 px-4 mb-12 lg:mb-0" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center">
              <span className="inline-block mr-2 p-1.5 rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                <FaPhone className="text-white text-sm" />
              </span>
              Contacto
            </h3>

            <div className="space-y-4 mb-6">
              <a href={`tel:${phoneNumber}`} className="flex items-center group">
                <div className="w-10 h-10 rounded-full mr-3 bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <FaPhone className="text-orange-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block text-white/60 text-sm">Teléfono</span>
                  <span className="block text-white group-hover:text-orange-400 transition-colors">{phoneNumber}</span>
                </div>
              </a>

              <button onClick={() => setShowMap(!showMap)} className="flex items-center group w-full text-left">
                <div className="w-10 h-10 rounded-full mr-3 bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <FaMapMarkerAlt className="text-orange-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block text-white/60 text-sm">Dirección</span>
                  <span className="block text-white group-hover:text-orange-400 transition-colors">{address}</span>
                  <span className="text-xs text-orange-500 mt-1 block underline">
                    {showMap ? "Ocultar mapa" : "Ver en mapa"}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {showMap && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 rounded-lg overflow-hidden shadow-lg shadow-orange-900/20"
                  >
                    {/* Aquí iría el mapa real, por ahora un placeholder */}
                    <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <img src="mapa.png" alt="mapa de ubicacion" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Horarios */}
          <motion.div className="w-full lg:w-1/3 px-4 mb-12 lg:mb-0" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center">
              <span className="inline-block mr-2 p-1.5 rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                <FaClock className="text-white text-sm" />
              </span>
              Horarios
            </h3>

            <div className="bg-orange-900/10 rounded-xl p-4 border border-orange-900/20">
              {hours.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between py-2 ${
                    index !== hours.length - 1 ? "border-b border-orange-900/20" : ""
                  }`}
                >
                  <span className="text-white/70 font-medium">{item.days}</span>
                  <span className="text-orange-400 font-semibold">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Separador */}
        <div className="border-t border-orange-900/30 my-10"></div>

        {/* Sección inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
          {/* Upgraded Copyright */}
          <div className="text-center md:text-left mb-8 md:mb-0 relative group">
            <motion.div
              className="text-white/60 text-sm font-medium tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              © {new Date().getFullYear()} <span className="text-orange-300 font-semibold">Alitas House</span>
              <span className="block md:inline md:ml-1">Todos los derechos reservados.</span>
              <span className="block text-xs mt-1 text-white/50">
                Desarrollado por Gudiño Galindo Jose Miguel{" "}
                <a href="tel:3312521635" className="text-orange-400 hover:text-orange-300 transition-colors">
                  3312521635
                </a>
              </span>
            </motion.div>
            <div className="absolute -bottom-1 left-0 right-0 md:right-auto h-px w-20 md:w-32 mx-auto md:mx-0 bg-gradient-to-r from-orange-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Enhanced Social Media Section */}
          <div className="flex flex-col sm:flex-row items-center">
            <motion.span
              className="text-sm font-medium text-white/60 mb-3 sm:mb-0 sm:mr-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Síguenos en redes:
            </motion.span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full bg-opacity-90 ${social.color} ${social.hoverColor} transition-all duration-300 flex items-center justify-center shadow-lg ${social.shadowColor} backdrop-blur-sm relative overflow-hidden group`}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  aria-label={social.name}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">{social.icon}</div>

                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {social.name}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botón de volver arriba */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 group flex flex-col items-center justify-center z-20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <FaArrowUp size={16} />
      </motion.button>
    </footer>
  )
}

export default Footer

