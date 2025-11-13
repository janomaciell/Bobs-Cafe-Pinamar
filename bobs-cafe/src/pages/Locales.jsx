import React, { useEffect } from 'react';
import '../components/Locales.css';

const Locales = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.local-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="locales-container">
      {/* Hero Section */}
      <section className="locales-hero-section">
        <div className="locales-hero-content">
          <div className="locales-hero-tag">📍 Nuestros Espacios</div>
          <h1 className="locales-hero-title">
            Encontranos en Pinamar
          </h1>
          <p className="locales-hero-description">
            Dos espacios únicos para disfrutar de la mejor experiencia. 
            Desde la playa hasta el corazón de Bunge.
          </p>
        </div>
      </section>

      {/* Locales Section */}
      <section className="locales-section">
        <div className="locales-grid">
          
          {/* Local 1: Balneario Perico */}
          <div className="local-card">
            <div className="local-content">
              <div className="local-header">
                <h2 className="local-title">Balneario Perico</h2>
                <span className="local-badge">Chiringo de Playa</span>
              </div>
              
              <p className="local-description">
                Disfrutá de Bob's Café frente al mar. Nuestro chiringo en el Balneario Perico 
                es el lugar perfecto para comer waffles con vista a la costa.
              </p>

              <div className="local-details">
                <div className="local-detail-item">
                  <span className="detail-icon"></span>
                  <div>
                    <p className="detail-label">Temporada</p>
                    <p className="detail-value">15 de Diciembre - 28 de Febrero</p>
                  </div>
                </div>

                <div className="local-detail-item">
                  <span className="detail-icon"></span>
                  <div>
                    <p className="detail-label">Ubicación</p>
                    <p className="detail-value">Balneario Perico, Pinamar</p>
                  </div>
                </div>
              </div>

              <div className="local-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.1423600593384!2d-56.84351628811387!3d-37.09955159344311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9ca31680bf61%3A0x729c91d143ddf32f!2sRestaurante%20Perico%20Balneario!5e1!3m2!1ses!2sar!4v1763049182654!5m2!1ses!2sar" 
                  width="100%" 
                  height="800" 
                  style={{border:0, borderRadius: '16px'}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Balneario Perico"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Local 2: Edificio Bunge */}
          <div className="local-card">
            <div className="local-content">
              <div className="local-header">
                <h2 className="local-title">Bob's Café Bunge</h2>
                <span className="local-badge">Local Principal</span>
              </div>
              
              <p className="local-description">
                Nuestro local oficial en Av. Bunge. Un espacio cálido y acogedor con pasto en las paredes, 
                sillones elegantes y la mejor carta de café y waffles de Pinamar.
              </p>

              <div className="local-details">
                <div className="local-detail-item">
                  <span className="detail-icon">🕐</span>
                  <div>
                    <p className="detail-label">Horario</p>
                    <p className="detail-value">Todo el año</p>
                  </div>
                </div>

                <div className="local-detail-item">
                  <span className="detail-icon">📍</span>
                  <div>
                    <p className="detail-label">Ubicación</p>
                    <p className="detail-value">Av. Bunge 1112, entre Libertador y Marco Polo</p>
                  </div>
                </div>
              </div>

              <div className="local-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.552354856224!2d-56.87179934849198!3d-37.11233120059515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9ce7bd495f15%3A0x61f3e2c67505eb61!2sAv.%20Arquitecto%20Jorge%20Bunge%201085%2C%20B7167%20Pinamar%2C%20Provincia%20de%20Buenos%20Aires!5e1!3m2!1ses!2sar!4v1763049616564!5m2!1ses!2sar"
                  width="100%" 
                  height="800" 
                  style={{border:0, borderRadius: '16px'}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Local Bunge"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Info Section */}
      <section className="locales-info-section">
        <div className="locales-info-container">
          <p className="locales-info-text">
            Te esperamos en cualquiera de nuestros espacios para compartir 
            un momento único. Café de especialidad, waffles artesanales y 
            la mejor vista de Pinamar.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Locales;