import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/Trabaja.css';

gsap.registerPlugin(ScrollTrigger);

const Trabaja = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef(null);
  const benefitsRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Animación del título - palabras que aparecen
    const titleWords = titleRef.current?.querySelectorAll('.word');
    if (titleWords) {
      gsap.fromTo(titleWords,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    }

    // Animación de beneficios con línea progresiva
    const benefits = benefitsRef.current?.querySelectorAll('.benefit-item');
    benefits?.forEach((benefit, index) => {
      gsap.fromTo(benefit,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: benefit,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animación del formulario - campos que suben
    const formGroups = formRef.current?.querySelectorAll('.form-group');
    formGroups?.forEach((group, index) => {
      gsap.fromTo(group,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animación del botón
    const button = formRef.current?.querySelector('.btn-submit');
    if (button) {
      gsap.fromTo(button,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.5,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: button,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Enviando tu postulación...');

    try {
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        phone: formData.telefono,
        message: formData.mensaje,
        to_name: "Bob's Café"
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

      setStatus('¡Postulación enviada con éxito! Nos pondremos en contacto pronto.');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      
      setTimeout(() => setStatus(''), 6000);
    } catch (error) {
      console.error('Error al enviar:', error);
      setStatus('Hubo un error al enviar tu postulación. Por favor, intenta nuevamente.');
      setTimeout(() => setStatus(''), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word">{word} </span>
    ));
  };

  return (
    <div className="trabaja-container">
      {/* Hero Section */}
      <section className="trabaja-hero-section">
        <div className="trabaja-hero-content">
          <h1 className="trabaja-hero-title" ref={titleRef}>
            {splitTextIntoWords('Unite a Nuestro Equipo')}
          </h1>
          <p className="trabaja-hero-description">
            Buscamos personas apasionadas que quieran formar parte de una experiencia única
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="trabaja-content-section">
        <div className="trabaja-grid">
          
          {/* Info Side */}
          <div className="trabaja-info">
            <h2 className="trabaja-subtitle">¿Por qué trabajar en Bob's Café?</h2>
            
            <div className="trabaja-benefits" ref={benefitsRef}>
              <div className="benefit-item">
                <div className="benefit-number">01</div>
                <p>Ambiente de trabajo profesional y colaborativo</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">02</div>
                <p>Oportunidades reales de crecimiento y desarrollo</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">03</div>
                <p>Capacitación continua en café de especialidad</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">04</div>
                <p>Beneficios y horarios flexibles</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">05</div>
                <p>Cultura de equipo orientada a la excelencia</p>
              </div>
            </div>

            <div className="info-extra">
              <p>Valoramos la experiencia previa pero también formamos a personas con actitud y ganas de aprender.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="trabaja-form" ref={formRef}>
            <h3 className="form-title">Envianos tu postulación</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tucorreo@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="+54 9 11 1234-5678"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Contanos sobre vos *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Experiencia previa, disponibilidad horaria, por qué querés trabajar con nosotros..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="6"
                  className="form-textarea"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button 
                type="submit" 
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
              </button>

              {status && (
                <div className={`form-status ${status.includes('éxito') ? 'success' : status.includes('error') ? 'error' : 'sending'}`}>
                  {status}
                </div>
              )}
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Trabaja;