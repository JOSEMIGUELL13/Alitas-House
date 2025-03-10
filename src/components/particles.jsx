import { useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const options = useMemo(() => {
    return {
      particles: {
        number: {
          value: 15,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ["#FF5733", "#FFC300", "#FF0000", "#FF8C00"]
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 1,
            sync: false
          }
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 1,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble"
          },
          onclick: {
            enable: true,
            mode: "repulse"
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 200,
            size: 6,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      retina_detect: true,
      background: {
        color: "transparent",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
      }
    };
  }, []);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className="fixed inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
      />
    </div>
  );
};

export default ParticlesBackground;