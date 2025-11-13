import React, { useEffect, useRef, useState } from 'react';
import '../components/Hero.css';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.project-card, .service-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-tag">☕️ La cafetería de Pinamar 🌲</div>
          <h1 className="hero-title">
            Bob’s Café — un espacio donde la calidez, el aroma y el sabor se encuentran.
          </h1>
          <p className="hero-description">
            Ubicado en Av. Bunge, entre Libertador y Marco Polo, Bob’s Café es un nuevo punto de encuentro en Pinamar. 
            Disfrutá de nuestro café de especialidad, waffles con más de 15 variedades, tostados irresistibles y 
            medialunas recién horneadas. Todo en un ambiente cálido, con pasto en las paredes, sillones elegantes 
            y buena energía.
          </p>

          <a 
            href="https://www.instagram.com/bobscafe.ar/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hero-link"
          >
            Seguinos en Instagram
          </a>
        </div>
      </section>

      {/* Sección de Cajas con Links */}
      <section className="projects-section" ref={projectsRef}>
        <div className="projects-grid">
          <a href="/nosotros" className="project-card link-box">
            <div className="project-placeholder">
              <h2 className="link-text">Nosotros</h2>
            </div>
          </a>

          <a href="/productos" className="project-card link-box">
            <div className="project-placeholder">
              <h2 className="link-text">Productos</h2>
            </div>
          </a>

          <a href="/locales" className="project-card link-box">
            <div className="project-placeholder">
              <h2 className="link-text">Locales</h2>
            </div>
          </a>

          <a href="/trabaja" className="project-card link-box">
            <div className="project-placeholder">
              <h2 className="link-text">Trabajá con Nosotros</h2>
            </div>
          </a>
        </div>
      </section>

      {/* Info Section */}
      <section className="culture-section">
        <div className="culture-container">
          <p className="culture-text">
            En Bob’s Café creemos en los pequeños momentos que hacen grande el día. 
            Cada taza, cada waffle y cada charla están pensados para que disfrutes 
            una experiencia única, en un entorno donde la naturaleza y el diseño se combinan.
          </p>
          <div className="culture-image-container">
            <img 
              src="/img/wafflebob.png" 
              alt="Waffle Bob’s Café" 
              className="culture-image"
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
