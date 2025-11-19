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
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Inicializar EmailJS con tu Public Key
    emailjs.init('TU_PUBLIC_KEY_AQUI'); // Reemplaza con tu Public Key

    // Animación del título
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

    // Animación del formulario
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

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar que sea PDF y menor a 5MB
      if (file.type !== 'application/pdf') {
        setStatus('✗ Solo se permiten archivos PDF');
        setTimeout(() => setStatus(''), 3000);
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setStatus('✗ El archivo debe ser menor a 5MB');
        setTimeout(() => setStatus(''), 3000);
        e.target.value = '';
        return;
      }
      setCvFile(file);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cvFile) {
      setStatus('✗ Por favor adjunta tu CV en PDF');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setStatus('Enviando postulación...');

    try {
      // Convertir PDF a base64
      const pdfBase64 = await convertFileToBase64(cvFile);

      // Preparar parámetros del template
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        phone: formData.telefono,
        message: formData.mensaje,
        to_name: "Bob's Café",
        cv_filename: cvFile.name,
        cv_content: pdfBase64
      };

      // Enviar email usando EmailJS
      const result = await emailjs.send(
        'TU_SERVICE_ID',      // Reemplaza con tu Service ID
        'TU_TEMPLATE_ID',     // Reemplaza con tu Template ID
        templateParams
      );

      console.log('Email enviado:', result);
      setStatus('✓ Postulación enviada con éxito');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      setCvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('Error al enviar:', error);
      setStatus('✗ Error al enviar. Intenta nuevamente');
      setTimeout(() => setStatus(''), 5000);
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
            {splitTextIntoWords('Trabajá con Nosotros')}
          </h1>
          <p className="trabaja-hero-description">
            Si crees que tenés lo que necesitamos, podés enviarnos tu CV y nos pondremos en contacto contigo.
          </p>
          <p className="trabaja-hero-description">
            También podés contactarnos a través de nuestro formulario de contacto.
          </p>
          <p className="trabaja-hero-description">
            Nos pondremos en contacto contigo a la brevedad.
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
                id="nombre"
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
                id="email"
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
                id="telefono"
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
                id="mensaje"
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

            <div className="form-group file-group">
              <label htmlFor="cv" className="file-label">
                <span className="file-label-text">
                  {cvFile ? cvFile.name : 'Adjuntar CV (PDF - Max 5MB)'}
                </span>
                <span className="file-icon">📎</span>
              </label>
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="form-file-input"
                disabled={isSubmitting}
                required
              />
              {cvFile && (
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => {
                    setCvFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  disabled={isSubmitting}
                >
                  ✕
                </button>
              )}
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            {status && (
              <div className={`form-status ${status.includes('✓') ? 'success' : status.includes('✗') ? 'error' : 'sending'}`}>
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
            Buscamos personas apasionadas que quieran formar parte de una experiencia única
          </p>
        </div>
      </section>
    </div>
  );
};

export default Trabaja;