import React, { useState, useEffect } from 'react';
import '../components/Trabaja.css';

const Trabaja = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.trabaja-info, .trabaja-form').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    

    // Aquí integrarías EmailJS o tu servicio de email
    // Por ahora simulamos el envío
    setTimeout(() => {
      setStatus('¡Mensaje enviado con éxito! Te contactaremos pronto.');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      setTimeout(() => setStatus(''), 5000);
    }, 1500);
  };

  return (
    <div className="trabaja-container">
      {/* Hero Section */}
      <section className="trabaja-hero-section">
        <div className="trabaja-hero-content">
          <div className="trabaja-hero-tag">💼 Unite al Equipo</div>
          <h1 className="trabaja-hero-title">
            Trabajá con Nosotros
          </h1>
          <p className="trabaja-hero-description">
            ¿Te apasiona el café y la atención al cliente? 
            Unite a nuestro equipo y formá parte de la familia Bob's Café.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="trabaja-content-section">
        <div className="trabaja-grid">
          
          {/* Info Side */}
          <div className="trabaja-info">
            <h2 className="trabaja-subtitle">¿Por qué Bob's Café?</h2>
            
            <div className="trabaja-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✨</span>
                <p>Ambiente de trabajo positivo y dinámico</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🌱</span>
                <p>Oportunidades de crecimiento</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎓</span>
                <p>Capacitación constante</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🤝</span>
                <p>Equipo comprometido y apasionado</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏖️</span>
                <p>Vibras playeras todos los días</p>
              </div>
            </div>


          </div>

          {/* Form Side */}
          <div className="trabaja-form">
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
                />
              </div>

              <div className="form-group">
                <textarea
                  name="mensaje"
                  placeholder="Contanos sobre vos y por qué querés formar parte de Bob's Café"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="6"
                  className="form-textarea"
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Enviar Postulación
              </button>

              {status && (
                <div className={`form-status ${status.includes('éxito') ? 'success' : 'sending'}`}>
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