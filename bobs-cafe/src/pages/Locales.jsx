import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/Locales.css';

gsap.registerPlugin(ScrollTrigger);

const Locales = () => {
  const heroRef = useRef(null);
  const localesRef = useRef(null);

  useEffect(() => {
    // Animación del título hero
    const heroTitle = heroRef.current?.querySelector('.locales-hero-title');
    const heroWords = heroTitle?.querySelectorAll('.word');
    
    if (heroWords) {
      gsap.fromTo(heroWords,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    }

    // Animación de las tarjetas de locales
    const localCards = localesRef.current?.querySelectorAll('.local-card');
    localCards?.forEach((card, index) => {
      // Animación de entrada de la tarjeta
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animación de los detalles dentro de cada tarjeta
      const details = card.querySelectorAll('.local-detail-item');
      details.forEach((detail, detailIndex) => {
        gsap.fromTo(detail,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: detailIndex * 0.1,
            scrollTrigger: {
              trigger: detail,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animación del mapa
      const map = card.querySelector('.local-map');
      if (map) {
        gsap.fromTo(map,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: map,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

  }, []);

  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word">{word} </span>
    ));
  };

  return (
    <div className="locales-container">
      {/* Hero Section */}
      <section className="locales-hero-section" ref={heroRef}>
        <div className="locales-hero-content">
          <h1 className="locales-hero-title">
            {splitTextIntoWords('Nuestros Locales')}
          </h1>
          <p className="locales-hero-description">
            Dos espacios únicos en Pinamar para disfrutar de la mejor experiencia
          </p>
        </div>
      </section>

      {/* Locales Section */}
      <section className="locales-section" ref={localesRef}>
        <div className="locales-grid">
          
          {/* Local 1: Bob's Café Bunge - SUCURSAL PRINCIPAL */}
          <div className="local-card">
            <div className="local-content">
              <div className="local-header">
                <h2 className="local-title">Bob's Café Bunge</h2>
                <span className="local-badge">Sucursal Principal</span>
              </div>
              
              <p className="local-description">
                Nuestro local oficial en el centro de Pinamar, en Av. Bunge. Un espacio cálido y acogedor 
                con pasto en las paredes, sillones elegantes y la mejor carta de café y waffles de Pinamar.
              </p>

              <div className="local-details">
                <div className="local-detail-item">
                  <div>
                    <p className="detail-label">Horario</p>
                    <p className="detail-value">7:00 - 23:00 • Todos los días</p>
                  </div>
                </div>

                <div className="local-detail-item">
                  <div>
                    <p className="detail-label">Ubicación</p>
                    <p className="detail-value">Av. Bunge 1112, Centro de Pinamar</p>
                  </div>
                </div>

                <div className="local-detail-item">
                  <div>
                    <p className="detail-label">Temporada</p>
                    <p className="detail-value">Abierto todo el año</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="local-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.552354856224!2d-56.87179934849198!3d-37.11233120059515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9ce7bd495f15%3A0x61f3e2c67505eb61!2sAv.%20Arquitecto%20Jorge%20Bunge%201085%2C%20B7167%20Pinamar%2C%20Provincia%20de%20Buenos%20Aires!5e1!3m2!1ses!2sar!4v1763049616564!5m2!1ses!2sar"
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Local Bunge"
              ></iframe>
            </div>
          </div>

          {/* Local 2: Balneario Perico */}
          <div className="local-card">
            <div className="local-content">
              <div className="local-header">
                <h2 className="local-title">Balneario Perico</h2>
                <span className="local-badge">Chiringo de Playa</span>
              </div>
              
              <p className="local-description">
                Disfrutá de Bob's Café frente al mar. Nuestro chiringo en el Balneario Perico 
                es el lugar perfecto para disfrutar waffles con vista a la costa.
              </p>

              <div className="local-details">
                <div className="local-detail-item">
                  <div>
                    <p className="detail-label">Temporada</p>
                    <p className="detail-value">15 de Diciembre - 28 de Febrero</p>
                  </div>
                </div>

                <div className="local-detail-item">
                  <div>
                    <p className="detail-label">Ubicación</p>
                    <p className="detail-value">Balneario Perico, Frente al Mar</p>
                  </div>
                </div>

                <div className="local-detail-item">
                  <div>
                    <p className="detail-label">Horario</p>
                    <p className="detail-value">9:00 AM - 8:00 PM • Temporada de verano</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="local-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.1423600593384!2d-56.84351628811387!3d-37.09955159344311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9ca31680bf61%3A0x729c91d143ddf32f!2sRestaurante%20Perico%20Balneario!5e1!3m2!1ses!2sar!4v1763049182654!5m2!1ses!2sar" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Balneario Perico"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      {/* Info Section */}
      <section className="locales-info-section">
        <div className="locales-info-container">
          <p className="locales-info-text">
            Te esperamos en cualquiera de nuestros espacios para compartir 
            un momento único con café de especialidad y waffles artesanales.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Locales;