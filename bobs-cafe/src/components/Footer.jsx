import { Link } from 'react-router-dom'
import { FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Bob's Cafe</h3>
          <p>Waffles artesanales y café con vibras de playa</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/bobscafe.ar/" target="_blank" rel="noopener noreferrer">
              <FiInstagram size={24} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/locales">Locales</Link></li>
            <li><Link to="/trabaja">Trabajá con Nosotros</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="footer-contact">
            <li>
              <FiMapPin size={18} />
              <span>Balneario Perico, Buenos Aires</span>
            </li>
            <li>
              <FiPhone size={18} />
              <span>+54 9 11 1234-5678</span>
            </li>
            <li>
              <FiMail size={18} />
              <span>info@bobscafe.com.ar</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Horarios</h4>
          <p>Lunes a Domingo</p>
          <p className="footer-hours">9:00 - 20:00</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Bob's Cafe. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
