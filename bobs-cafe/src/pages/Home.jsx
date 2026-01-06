import React, { useEffect, useRef, useState } from 'react';
import '../components/Hero.css';
import { Link } from 'react-router-dom';


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
        <div className="hero-content-split">
          <div className="hero-left">
            <img 
              src="/img/BOBS.png" 
              alt="Bob's Café" 
              className="hero-image" />
          </div>
          <div className="hero-right">
            {/* Texto a la izquierda del waffle */}
            <div className="hero-side-text left">
                <p>Experiencia única</p>

            </div>
            
            <img 
              src="/img/wafflecostado.png" 
              alt="Bob's Café" 
              className="hero-image-side"
            />
            
            {/* Texto a la derecha del waffle */}
            <div className="hero-side-text right">
              <p>Ahora con café</p>

            </div>
          </div>
        </div>

      </section>
      <section className="hero-bottom-text">
        <div className="hero-content-split">
          <p className="hero-secondary-text">
            En Bob's creemos en los pequeños momentos que hacen grande el día. 
            Cada taza y cada waffle están hechos de manera artesanal.
          </p>
        </div>
      </section>

      {/* Sección de Cajas con Links */}
      <section className="text-section-home" ref={projectsRef}>
          <div className="projects-grid">
            <Link to="/nosotros" className="project-card link-box">
              <div className="project-placeholder" data-project="nosotros">
                <h2 className="link-text">Nosotros</h2>
              </div>
            </Link>

            <Link to="/productos" className="project-card link-box">
              <div className="project-placeholder" data-project="productos">
                <h2 className="link-text">Productos</h2>
              </div>
            </Link>

            <Link to="/locales" className="project-card link-box">
              <div className="project-placeholder" data-project="locales">
                <h2 className="link-text">Locales</h2>
              </div>
            </Link>

            <Link to="/trabaja" className="project-card link-box">
              <div className="project-placeholder" data-project="trabaja">
                <h2 className="link-text">Trabajá con Nosotros</h2>
              </div>
            </Link>
          </div>
        </section>

      {/* Info Section */}
      <section className="culture-section">
        <div className="culture-container">
          <p className="culture-text">
            Compartimos nuestra pasión por el café y los waffles. Elaboramos productos 
            con materias primas seleccionadas.
          </p>
          <div className="culture-image-container">
            <img src="/img/waffleoreo.png" alt="Bob's Café" className="culture-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;