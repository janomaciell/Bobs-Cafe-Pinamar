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
  const titleRef = useRef(null);

  useEffect(() => {
    emailjs.init('xCWtkK4Ps5xI2FaAT'); // Tu Public Key

    // Animación del título
    const titleWords = titleRef.current?.querySelectorAll('.word');
    if (titleWords) {
      gsap.fromTo(
        titleWords,
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

    // Animación del formulario
    const formGroups = formRef.current?.querySelectorAll('.form-group');
    formGroups?.forEach((group, index) => {
      gsap.fromTo(
        group,
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
    setStatus('Enviando postulación...');

    try {
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        phone: formData.telefono,
        message: formData.mensaje,
        to_name: "Bob's Café"
      };

      await emailjs.send(
        'service_11dvtef', // Service ID
        'template_6l3bcz7', // Template ID
        templateParams
      );

      setStatus('✓ Postulación enviada con éxito');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });

      setTimeout(() => setStatus(''), 5000);

    } catch (error) {
      console.error('Error al enviar:', error);
      setStatus('✗ Error al enviar. Intenta nuevamente');
      setTimeout(() => setStatus(''), 5000);
    }

    setIsSubmitting(false);
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
            {splitTextIntoWords('Trabajá con Nosotros')}
          </h1>
          <p className="trabaja-hero-description">
            Si creés que tenés lo que necesitamos, envianos tu postulación y nos pondremos en contacto contigo.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="trabaja-form-section">
        <div className="trabaja-form-container" ref={formRef}>
          <h1 className="trabaja-form-title-trabaja">Formulario de Postulación</h1>

          <form onSubmit={handleSubmit} className="contact-form">

            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                className="form-input"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="form-input"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <textarea
                name="mensaje"
                placeholder="Contanos sobre vos: experiencia, disponibilidad horaria..."
                value={formData.mensaje}
                onChange={handleChange}
                rows="8"
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
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            {status && (
              <div
                className={`form-status ${
                  status.includes('✓')
                    ? 'success'
                    : status.includes('✗')
                    ? 'error'
                    : 'sending'
                }`}
              >
                {status}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="trabaja-info-section">
        <div className="trabaja-info-content">
          <p className="info-text">
            Buscamos personas apasionadas que quieran formar parte de una experiencia única.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Trabaja;
