import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/Productos.css';

gsap.registerPlugin(ScrollTrigger);

const Productos = () => {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const qrSectionRef = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    // Animación del hero
    gsap.fromTo(
      heroRef.current?.querySelectorAll('.hero-content > *'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Animación de categorías
    const categoryCards = categoriesRef.current?.querySelectorAll('.category-card');
    categoryCards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animación de productos destacados
    const featuredCards = featuredRef.current?.querySelectorAll('.featured-product');
    featuredCards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animación de la sección QR
    gsap.fromTo(
      qrSectionRef.current?.querySelectorAll('.qr-content > *'),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: qrSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animación de partículas flotantes
    const createFloatingAnimation = (element, duration, y) => {
      gsap.to(element, {
        y: y,
        duration: duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    };

    const decorElements = document.querySelectorAll('.floating-decor');
    decorElements.forEach((elem, i) => {
      createFloatingAnimation(elem, 3 + i * 0.5, -20 - i * 10);
    });

  }, []);

  const categories = [
    {
      title: 'Waffles',
      description: 'Artesanales y recién hechos',
      highlight: 'Especialidad',
      number: '01'
    },
    {
      title: 'Café',
      description: 'Blend premium de origen',
      highlight: 'Premium',
      number: '02'
    },
    {
      title: 'Bebidas Frías',
      description: 'Refrescantes y deliciosas',
      highlight: 'Refrescante',
      number: '03'
    },
    {
      title: 'Extras',
      description: 'Complementos perfectos',
      highlight: 'Delicioso',
      number: '04'
    }
  ];

  const featuredProducts = [
    {
      name: 'Waffle Clásico',
      description: 'Nuestro waffle insignia con ingredientes premium',
      badge: 'Más Popular',
      number: '01'
    },
    {
      name: 'Café Latte',
      description: 'Espresso suave con leche vaporizada',
      badge: 'Recomendado',
      number: '02'
    },
    {
      name: 'Smoothie Bowl',
      description: 'Fresco y nutritivo para cualquier momento',
      badge: 'Nuevo',
      number: '03'
    }
  ];

  return (
    <div className="productos-container">
      {/* Hero Section */}
      <section className="productos-hero" ref={heroRef}>
        <div className="hero-content">
          <span className="hero-badge">Menú Digital</span>
          <h1 className="hero-title">
            Descubre Nuestros
            <span className="highlight-text"> Productos</span>
          </h1>
          <p className="hero-subtitle">
            Cada día preparamos los mejores waffles y café con pasión y dedicación
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Artesanal</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Fresh</span>
              <span className="stat-label">Diario</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Premium</span>
              <span className="stat-label">Calidad</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" ref={categoriesRef}>
        <h2 className="section-title-center">Nuestras Categorías</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-number">{category.number}</div>
              <h3 className="category-title">{category.title}</h3>
              <div className="category-divider"></div>
              <p className="category-description">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section" ref={featuredRef}>
        <h2 className="section-title-center">Destacados del Menú</h2>
        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <div key={index} className="featured-product">
              <div className="featured-number">{product.number}</div>
              <div className="featured-badge">{product.badge}</div>
              <h3 className="featured-title">{product.name}</h3>
              <div className="featured-divider"></div>
              <p className="featured-description">{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QR Section - Mejorada */}
      <section className="qr-section" ref={qrSectionRef}>
        <div className="qr-content">
          <div className="qr-text-content">
            <span className="qr-badge">Menú Digital</span>
            <h2 className="qr-title">
              Escanea y Descubre Todo Nuestro Menú
            </h2>
            <p className="qr-description">
              Accede a nuestro menú completo con precios actualizados, 
              descripciones detalladas y las últimas novedades.
            </p>
            <div className="qr-features">
              <div className="qr-feature">
                <span className="feature-icon">✓</span>
                <span>Actualizado diariamente</span>
              </div>

              <div className="qr-feature">
                <span className="feature-icon">✓</span>
                <span>Ofertas especiales</span>
              </div>
            </div>
          </div>
          
          <div className="qr-image-container">
            <div className="qr-wrapper">
              <div className="qr-glow"></div>
              <img 
                src="/img/qr_menu.jpeg" 
                alt="QR Code para ver el menú digital" 
                className="qr-image"
              />
            </div>
            <p className="qr-instruction">
              Apunta tu cámara aquí
            </p>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Productos;