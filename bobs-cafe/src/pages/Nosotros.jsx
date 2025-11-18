import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/Nosotros.css';

gsap.registerPlugin(ScrollTrigger);

const Nosotros = () => {
  const lineRef = useRef(null);
  const heroTextRef = useRef(null);
  const imageRef = useRef(null);
  const valoresRef = useRef(null);
  const historiaSectionRef = useRef(null);

  useEffect(() => {
    // Animación simple del hero (sin efecto de escritura)
    const heroWords = heroTextRef.current.querySelectorAll('.word');
    gsap.fromTo(heroWords, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );



    // Animación de la imagen que crece con scroll
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { scale: 0.8, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'center 40%',
            scrub: 1,
          }
        }
      );
    }

    // Animación de los valores que aparecen
    const valueCards = valoresRef.current?.querySelectorAll('.value-card');
    valueCards?.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animación de escritura palabra por palabra en "Nuestra Historia"
    if (historiaSectionRef.current) {
      // Obtener el título y todos los párrafos
      const sectionTitle = historiaSectionRef.current.querySelector('.section-title');
      const paragraphs = historiaSectionRef.current.querySelectorAll('.historia-text p');
      
      // Función para animar palabras de un elemento preservando HTML
      const animateWords = (element, startPercent, endPercent, triggerElement) => {
        if (!element) return;
        
        // Obtener el texto completo y dividir en palabras
        const text = element.textContent || element.innerText;
        const words = text.split(/\s+/).filter(word => word.length > 0);
        
        // Guardar el HTML original para preservar elementos como <strong>
        const originalHTML = element.innerHTML;
        
        // Limpiar y reconstruir con spans para cada palabra
        element.innerHTML = '';
        
        // Dividir el HTML original en palabras pero preservar tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        const textNodes = [];
        
        const extractTextNodes = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const nodeWords = node.textContent.split(/\s+/).filter(w => w.length > 0);
            nodeWords.forEach(w => textNodes.push({ type: 'text', content: w }));
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            const nodeWords = node.textContent.split(/\s+/).filter(w => w.length > 0);
            nodeWords.forEach(w => textNodes.push({ type: 'tag', tag: tagName, content: w }));
          }
          Array.from(node.childNodes).forEach(extractTextNodes);
        };
        
        extractTextNodes(tempDiv);
        
        // Reconstruir con spans para cada palabra
        words.forEach((word, index) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'historia-word';
          
          // Buscar si esta palabra está dentro de un tag especial
          const wordInOriginal = originalHTML.includes(`<strong>${word}</strong>`) || 
                                   originalHTML.includes(`<strong>${word} `);
          
          if (wordInOriginal) {
            wordSpan.innerHTML = `<strong>${word}</strong>`;
          } else {
            wordSpan.textContent = word;
          }
          
          wordSpan.style.display = 'inline-block';
          element.appendChild(wordSpan);
          if (index < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
          }
        });
        
        const wordElements = element.querySelectorAll('.historia-word');
        const totalWords = wordElements.length;
        
        // Inicializar palabras como invisibles
        gsap.set(wordElements, {
          opacity: 0,
          y: 60,
          display: 'inline-block'
        });
        
        // Animar cada palabra individualmente
        wordElements.forEach((word, index) => {
          const wordScrollPortion = (startPercent - endPercent) / totalWords;
          const wordStart = startPercent - (index * wordScrollPortion);
          const wordEnd = wordStart - wordScrollPortion;
          
          gsap.fromTo(word,
            {
              opacity: 0,
              y: 40
            },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: triggerElement || historiaSectionRef.current,
                start: `top ${wordStart}%`,
                end: `top ${wordEnd}%`,
                scrub: true,
              }
            }
          );
        });
      };
      
      // Animar el título "Nuestra Historia"
      if (sectionTitle) {
        animateWords(sectionTitle, 90, 70, historiaSectionRef.current);
      }
      
      // Animar cada párrafo palabra por palabra
      paragraphs.forEach((p, pIndex) => {
        const paragraphStart = 85 - (pIndex * 15);
        const paragraphEnd = paragraphStart - 12;
        animateWords(p, paragraphStart, paragraphEnd, p);
      });
    }

  }, []);

  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word">{word} </span>
    ));
  };

  return (
    <div className="nosotros-container">
      {/* Línea animada que sigue el scroll */}
      <div className="scroll-line-container">
        <div className="scroll-line" ref={lineRef}></div>
      </div>

      {/* Hero Section */}
      <section className="nosotros-hero-section">
        <div className="nosotros-hero-content">
          <h1 className="nosotros-hero-title" ref={heroTextRef}>
            {splitTextIntoWords('De la playa al corazón de Pinamar')}
          </h1>
        </div>
      </section>

      {/* Video que crece */}
      <section className="nosotros-image-section">
        <div className="image-container" ref={imageRef}>
          <div className="placeholder-image">
            <video 
              src="/img/nenewaffle.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="video-element"
            />
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="nosotros-historia-section" ref={historiaSectionRef}>
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
      <section className="nosotros-valores-section" ref={valoresRef}>
        <h2 className="section-title-center">Lo que nos define</h2>
        
        <div className="valores-grid">
          <div className="value-card">
            <h3 className="value-title">Artesanal</h3>
            <p className="value-description">
              Cada producto hecho con dedicación y los mejores ingredientes
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Vibras Playeras</h3>
            <p className="value-description">
              Traemos la frescura del balneario a cada rincón
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Calidad Premium</h3>
            <p className="value-description">
              Desde el café hasta las bebidas, solo lo mejor
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Pasión</h3>
            <p className="value-description">
              Amamos lo que hacemos y se nota en cada detalle
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Ambiente Único</h3>
            <p className="value-description">
              Pasto en las paredes y diseño que conecta con la naturaleza
            </p>
          </div>

          <div className="value-card">
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