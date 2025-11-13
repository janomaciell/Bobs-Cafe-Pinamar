import React, { useEffect } from 'react';
import '../components/Nosotros.css';

const Nosotros = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.value-card, .nosotros-text-content').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="nosotros-container">
      {/* Hero Section */}
      <section className="nosotros-hero-section">
        <div className="nosotros-hero-content">
          <div className="nosotros-hero-tag">Nuestra Esencia</div>
          <h1 className="nosotros-hero-title">
            De la playa al corazón de Pinamar
          </h1>
          <p className="nosotros-hero-description">
            Una historia de pasión, sabor y vibras playeras que transformamos 
            en cada waffle y cada taza de café.
          </p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="nosotros-historia-section">
        <div className="nosotros-text-content">
          <h2 className="section-title">Nuestra Historia</h2>
          
          <div className="historia-text">
            <p>
              Todo comenzó en <strong>Balneario Perico</strong>, donde la pasión por crear 
              los mejores waffles artesanales se encontró con el espíritu playero y fresco 
              de la costa.
            </p>
            <p>
              En Bob's Café, cada waffle es una obra de arte. Preparados con ingredientes 
              de primera calidad y mucho amor, nuestros waffles son el corazón de lo que hacemos. 
              Pero no nos detuvimos ahí.
            </p>
            <p>
              Hemos expandido nuestra propuesta para ofrecerte una experiencia completa: 
              medialunas artesanales, café de especialidad, té selectos y las mejores bebidas 
              sin alcohol de Coca-Cola.
            </p>
            <p>
              Somos más que una cafetería. Somos un lugar donde las vibras de playa se 
              encuentran con el sabor casero, donde cada visita te transporta a esos días 
              soleados junto al mar.
            </p>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="nosotros-valores-section">
        <h2 className="section-title-center">Lo que nos define</h2>
        
        <div className="valores-grid">
          <div className="value-card">
            <div className="value-icon">🧇</div>
            <h3 className="value-title">Artesanal</h3>
            <p className="value-description">
              Cada producto hecho con dedicación y los mejores ingredientes
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🌊</div>
            <h3 className="value-title">Vibras Playeras</h3>
            <p className="value-description">
              Traemos la frescura del balneario a cada rincón
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">☕</div>
            <h3 className="value-title">Calidad Premium</h3>
            <p className="value-description">
              Desde el café hasta las bebidas, solo lo mejor
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3 className="value-title">Pasión</h3>
            <p className="value-description">
              Amamos lo que hacemos y se nota en cada detalle
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3 className="value-title">Ambiente Único</h3>
            <p className="value-description">
              Pasto en las paredes y diseño que conecta con la naturaleza
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3 className="value-title">Comunidad</h3>
            <p className="value-description">
              Creamos momentos y conexiones que duran
            </p>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="nosotros-final-section">
        <div className="nosotros-final-container">
          <p className="nosotros-final-text">
            Cada taza, cada waffle, cada momento en Bob's Café está diseñado 
            para que disfrutes de lo simple hecho extraordinario.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;