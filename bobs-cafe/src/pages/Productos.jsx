import React, { useEffect } from 'react';
import '../components/Productos.css';

const Productos = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.producto-categoria').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const menuData = [
    {
      categoria: 'COFFEE & ICE COFFEE',
      subcategorias: [
        {
          titulo: 'SOLO CAFÉ',
          items: [
            { nombre: 'Espresso' },
            { nombre: 'Espresso Doble' },
            { nombre: 'Americano' },
            { nombre: 'Cortado' },
            { nombre: 'Capuccino' },
            { nombre: 'Flat White' },
            { nombre: 'Latte' }
          ]
        },
        {
          titulo: 'LATTES',
          items: [
            { nombre: 'Vainilla Latte' },
            { nombre: 'Caramel Latte' },
            { nombre: 'Pistacho Latte' },
            { nombre: 'Avellana Latte' },
            { nombre: 'Mocca Latte' },
            { nombre: 'Coco Latte' }
          ]
        },
        {
          titulo: 'SELECCIÓN DE TÉ',
          items: [
            { nombre: 'Té' }
          ]
        }
      ]
    },
    {
      categoria: 'COMBOS',
      items: [
        { 
          nombre: 'Bob\'s para Compartir',
          descripcion: 'Dos café medianos a elección con dos porciones de budín y un alfajor'
        },
        { 
          nombre: 'Ligth',
          descripcion: 'Café mediano a elección, avocado toast y un exprimido'
        },
        { 
          nombre: 'Clásico Bob\'s',
          descripcion: 'Café mediano a elección, dos medialunas'
        }
      ]
    },
    {
      categoria: 'BAKERY',
      subcategorias: [
        {
          titulo: 'PASTELERÍA',
          items: [
            { nombre: 'Medialuna' },
            { nombre: 'Medialuna de J&Q' },
            { nombre: 'Budín de Banana' },
            { nombre: 'Carrot Cake' },
            { nombre: 'Cookie con Chips' },
            { nombre: 'Cookie de Pistacho' }
          ]
        },
        {
          titulo: 'TORTAS',
          items: [
            { nombre: 'Chesscake con Frutos Rojos' },
            { nombre: 'Chesscake con Maracuya' },
            { nombre: 'Torta de Manzana' },
            { nombre: 'Chocotorta' }
          ]
        },
        {
          titulo: 'ALFAJORES',
          items: [
            { nombre: 'Dulce de Leche' },
            { nombre: 'Maicena' },
            { nombre: 'Chocolate Blanco' },
            { nombre: 'Alfajor Pinamar' }
          ]
        }
      ]
    },
    {
      categoria: 'DRINKS',
      subcategorias: [
        {
          titulo: 'BEBIDAS',
          items: [
            { nombre: 'Agua' },
            { nombre: 'Agua con Gas' },
            { nombre: 'Agua Saborizada' },
            { nombre: 'Gaseosa' }
          ]
        }
      ]
    },
    {
      categoria: 'WAFFLES',
      items: [
        { nombre: 'DDL o Crema' },
        { nombre: 'DDL y Crema' },
        { nombre: 'DDL y Frutas' },
        { nombre: 'Crema y Frutas' },
        { nombre: 'Nutella' },
        { nombre: 'Nutella y Frutillas' },
        { nombre: 'Nutella y Frutos Rojos' }
      ]
    },
    {
      categoria: 'ENTRE PANES',
      items: [
        { 
          nombre: 'Avocado Toast',
          descripcion: 'Queso crema, palta fileteada, huevo revuelto, tomate cherry'
        },
        { 
          nombre: 'Tostado de Jamón y Queso'
        },
        { 
          nombre: 'Jamón Crudo',
          descripcion: 'Sándwich de jamón crudo, tomate fresco, queso parmesano, rúcula y ali oli'
        },
        { 
          nombre: 'Sandwich de Mica',
          descripcion: 'Sándwich de jamón y queso'
        }
      ]
    },
    {
      categoria: 'ALMUERZO',
      items: [
        { 
          nombre: 'Ensalada Caesar',
          descripcion: 'Pollo grillado, hojas verdes, queso parmesano, croutons, aderezo caesar de palta'
        },
        { 
          nombre: 'Ensalada de Atún',
          descripcion: 'Arroz blanco, atún, tomate cherry, huevo duro'
        },
        { 
          nombre: 'Tarta',
          descripcion: 'Tarta de acelga, zapallo o J&Q, con ensalada de hojas verdes, tomate cherry y parmesano'
        },
        { 
          nombre: 'Sandwich de Pollo',
          descripcion: 'Tarta de acelga, zapallo o J&Q, con ensalada de hojas verdes, tomate cherry y parmesano'
        }
      ]
    },
    {
      categoria: 'DESAYUNOS Y MERIENDAS',
      items: [
        { 
          nombre: 'Bowl de Frutas',
          descripcion: 'Bowl de frutas de temporada y frutos secos'
        },
        { 
          nombre: 'Bowl de Yogurt',
          descripcion: 'Yogurt natural, fruta de temporada, granola'
        },
        { 
          nombre: 'Tostadas',
          descripcion: 'Tostadas de pan de masa madre con queso crema y mermelada'
        },
        { 
          nombre: 'Acai',
          descripcion: 'Bowl con base de acaí, fruta fresca y granola'
        }
      ]
    }
  ];

  return (
    <div className="productos-container">
      {/* Hero Section */}
      <section className="productos-hero-section">
        <div className="productos-hero-content">
          <div className="productos-hero-tag">🍽️ Nuestro Menú</div>
          <h1 className="productos-hero-title">
            Sabores que Enamoran
          </h1>
          <p className="productos-hero-description">
            Cada producto preparado con amor y los mejores ingredientes. 
            Desde waffles artesanales hasta café de especialidad.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="productos-menu-section">
        <div className="menu-grid">
          {menuData.map((seccion, index) => (
            <div key={index} className="producto-categoria">
              <h2 className="categoria-title">{seccion.categoria}</h2>
              
              {/* Si tiene subcategorías */}
              {seccion.subcategorias && seccion.subcategorias.map((sub, subIndex) => (
                <div key={subIndex} className="subcategoria-block">
                  <h3 className="subcategoria-title">{sub.titulo}</h3>
                  <div className="items-list">
                    {sub.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="menu-item">
                        <h4 className="item-nombre">{item.nombre}</h4>
                        {item.descripcion && (
                          <p className="item-descripcion">{item.descripcion}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Si tiene items directos */}
              {seccion.items && (
                <div className="items-list">
                  {seccion.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="menu-item">
                      <h4 className="item-nombre">{item.nombre}</h4>
                      {item.descripcion && (
                        <p className="item-descripcion">{item.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Section */}
      <section className="productos-final-section">
        <div className="productos-final-container">
          <p className="productos-final-text">
            Todo preparado con ingredientes premium y la pasión 
            que nos caracteriza. Venì a probar la experiencia Bob's Café.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Productos;