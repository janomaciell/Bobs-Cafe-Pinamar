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
  const misionVisionRef = useRef(null);

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

    // Animación de Misión y Visión
    const misionVisionCards = misionVisionRef.current?.querySelectorAll('.mision-vision-card');
    misionVisionCards?.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, x: index === 0 ? -50 : 50 },
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

    // Animación de escritura palabra por palabra en "Nuestra Historia"
    if (historiaSectionRef.current) {
      const sectionTitle = historiaSectionRef.current.querySelector('.section-title');
      const paragraphs = historiaSectionRef.current.querySelectorAll('.historia-text p');
      
      const animateWords = (element, startPercent, endPercent, triggerElement) => {
        if (!element) return;
        
        const text = element.textContent || element.innerText;
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const originalHTML = element.innerHTML;
        
        element.innerHTML = '';
        
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
        
        words.forEach((word, index) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'historia-word';
          
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
        
        gsap.set(wordElements, {
          opacity: 0,
          y: 60,
          display: 'inline-block'
        });
        
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
      
      if (sectionTitle) {
        animateWords(sectionTitle, 90, 70, historiaSectionRef.current);
      }
      
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
              El nombre <strong>Bob's</strong> es la abreviación de la palabra 
              "better on the beach", haciendo la ilusión que los orígenes de la marca 
              son en la costa Argentina.
            </p>
            <p>
              Todo comenzó en <strong>Balneario Perico</strong>, donde la pasión por crear 
              los mejores waffles artesanales se encontró con el espíritu playero y la 
              esencia de Pinamar.
            </p>
            <p>
              Luego nos dimos cuenta que el café es el mejor complemento y lo implementamos 
              para darle una experiencia completa a nuestros clientes.
            </p>
            <p>
              Seguimos haciendo lo que nos apasiona y formando una comunidad que nos elige 
              constantemente.
            </p>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="nosotros-valores-section" ref={valoresRef}>
        <h2 className="section-title-center">Lo que nos define</h2>
        
        <div className="valores-grid">
          <div className="value-card">
            <h3 className="value-title">Pasión</h3>
            <p className="value-description">
              Transmitimos la excelencia del café y el waffle
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Comunidad</h3>
            <p className="value-description">
              Creamos una manera de vivir experiencias
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Ambiente Único</h3>
            <p className="value-description">
              Nuestros espacios reflejan la esencia de Pinamar
            </p>
          </div>

          <div className="value-card">
            <h3 className="value-title">Artesanal</h3>
            <p className="value-description">
              Cada producto es elaborado con materias primas seleccionadas
            </p>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="mision-vision-section" ref={misionVisionRef}>
        <div className="mision-vision-container">
          <div className="mision-vision-card">
            <h3 className="mision-vision-title">Misión</h3>
            <p className="mision-vision-description">
              Lograr que cada momento sea único
            </p>
          </div>

          <div className="mision-vision-card">
            <h3 className="mision-vision-title">Visión</h3>
            <p className="mision-vision-description">
              Formar una comunidad y un estilo de vivir
            </p>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="nosotros-final-section">
        <div className="nosotros-final-container">
          <p className="nosotros-final-text">
            Si quieres consumir waffles y café 
            <br />
            <strong>Is Better On the Beach</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;