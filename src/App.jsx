import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Datos y textos (castellano argentino) ---
const NAV_LINKS = [
  { href: '#hero', label: 'Inicio' },
  { href: '#activities', label: 'Actividades' },
  { href: '#safety', label: 'Seguridad' },
  { href: '#contact', label: 'Contacto' },
];

const SERVICES = [
  {
    id: 1,
    iconPath:
      'M21 15.546c-.523 0-1.046.1-.546 0-.523 0-1.046.1-.546 0zM17 17l.617-.617M12 21.5V17m5.5-2.25l-.478.478M16.5 10l-.478.478M12 3.5V7m0 14h.01M17 4.5l.617.617M7 17l-.617-.617M13 10.5V10m0-2v-3.5',
    title: 'Fiestas de cumple',
    description: 'Celebrá tu cumple con una salida distinta: aventura, risas y fotos memorables.',
  },
  {
    id: 2,
    iconPath:
      'M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2H5a2 2 0 00-2 2v11a2 2 0 002 2h2v1a1 1 0 001 1h8a1 1 0 001-1v-1zM9 4h6m-6 0v2H9V4zM7 7h10M7 7v11a1 1 0 001 1h8a1 1 0 001-1V7H7z',
    title: 'Team building',
    description: 'Actividades pensadas para reforzar el laburo en equipo y la comunicación.',
  },
  {
    id: 3,
    iconPath:
      'M12 4.354l-4.596 4.596M12 4.354V15m0-10.646L7.404 8.95L12 15m0-10.646l4.596 4.596M12 4.354V15m0 0l4.596 4.596M12 15l-4.596 4.596',
    title: 'Eventos grupales',
    description: 'Ideal para escuelas, empresas o juntadas familiares grandes.',
  },
];

const ACTIVITIES = [
  {
    id: 1,
    imgSrc: 'https://placehold.co/400x300/F97316/FFFFFF?text=Reto+Canopy',
    alt: 'Reto Canopy',
    title: 'Reto Canopy',
    description: 'Poné a prueba tu equilibrio y agilidad en puentes y redes aéreas.',
  },
  {
    id: 2,
    imgSrc: 'https://placehold.co/400x300/F97316/FFFFFF?text=Travesía+Árboles',
    alt: 'Travesía en los árboles',
    title: 'Travesía en los árboles',
    description: 'Movete entre las copas mientras disfrutás la vista.',
  },
  {
    id: 3,
    imgSrc: 'https://placehold.co/400x300/F97316/FFFFFF?text=Tirolesa',
    alt: 'Tirolesa',
    title: 'Tirolesas',
    description: 'Velocidad y adrenalina en nuestros circuitos seguros.',
  },
  {
    id: 4,
    imgSrc: 'https://placehold.co/400x300/F97316/FFFFFF?text=Cursos+Avanzados',
    alt: 'Cursos avanzados',
    title: 'Cursos avanzados',
    description: 'Desafíos para quienes buscan elevar la dificultad.',
  },
];

const SPECIAL_ACTIVITIES = [
  {
    id: 1,
    imgSrc: 'https://placehold.co/300x200/F97316/FFFFFF?text=Escalada+Nocturna',
    alt: 'Escaladas nocturnas',
    title: 'Escaladas nocturnas',
    description: 'Viví el parque bajo la luna: una experiencia distinta y mágica.',
  },
  {
    id: 2,
    imgSrc: 'https://placehold.co/300x200/F97316/FFFFFF?text=Senderismo+Guiado',
    alt: 'Senderismo guiado',
    title: 'Senderismo guiado',
    description: 'Recorridos con guías locales para conocer fauna y flora.',
  },
];

const SAFETY_FEATURES = [
  'Capacitación de seguridad completa',
  'Equipamiento certificado y en buen estado',
  'Personal capacitado y con experiencia',
  'Inspecciones diarias de las instalaciones',
];

const CONTACT_DETAILS = [
  {
    id: 1,
    iconPath:
      'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    text: 'Av. de la Aventura 123, Ciudad Parque, CP 1234',
  },
  {
    id: 2,
    iconPath:
      'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    text: '+54 9 11 1234-5678',
  },
  {
    id: 3,
    iconPath:
      'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    text: 'info@ParqueAereoAventura.com.ar',
  },
];

const SOCIAL_LINKS = [
  { id: 1, iconPath: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z', href: '#' },
  { id: 2, iconPath: 'M12.423 20.378c-3.267 0-5.908-2.64-5.908-5.908V12c0-.55.45-1 1-1h1.592c.55 0 1 .45 1 1v2.47c0 1.34.82 2.5 2.052 2.915.204.068.42.103.636.103.882 0 1.592-.71 1.592-1.592V12c0-.55.45-1 1-1h1.592c.55 0 1 .45 1 1v2.47c0 1.34-.82 2.5-2.052 2.915-.204.068-.42.103-.636.103-.882 0-1.592-.71-1.592-1.592zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 1.875A10.125 10.125 0 001.875 12 10.125 10.125 0 0012 22.125 10.125 10.125 0 0022.125 12 10.125 10.125 0 0012 1.875zM12 7.5A4.5 4.5 0 007.5 12c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5S14.485 7.5 12 7.5zM12 6.125A5.875 5.875 0 0117.875 12c0 3.235-2.64 5.875-5.875 5.875S6.125 15.235 6.125 12 8.765 6.125 12 6.125z', href: '#' },
  { id: 3, iconPath: 'M12 2C6.477 2 2 6.477 2 12c0 4.417 2.866 8.125 6.839 9.475.5.092.682-.213.682-.472 0-.232-.008-.857-.013-1.687-2.782.604-3.367-1.34-3.367-1.34-.454-1.15-.111-1.458-.111-1.458.927-.633 1.405.048 1.405.048.823 1.396 2.152.991 2.671.758.084-.587.323-.991.592-1.22-.927-.105-1.902-.464-1.902-2.077 0-.46.166-.837.439-1.135-.045-.106-.157-.534.043-1.116 0 0 .359-.114 1.178.435.339-.094.7-.142 1.06-.144.36.002.721.05 1.06.144.819-.549 1.178-.435 1.178-.435.201.582.09.91.043 1.116.273.298.439.675.439 1.135 0 1.618-.976 1.972-1.908 2.075.244.209.479.62.479 1.258 0 .91-.008 1.64-.013 1.861 0 .262.181.566.687.472C19.134 20.125 22 16.417 22 12c0-5.523-4.477-10-10-10z', href: '#' },
];

// --- Componentes pequeños para mantener el JSX limpio ---
const Icon = ({ path, className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
  </svg>
);

const SocialIcon = ({ path }) => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d={path} clipRule="evenodd"></path>
  </svg>
);

// --- Secciones principales ---
const Hero = () => (
  <section id="hero" className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center rounded-b-lg shadow-xl" style={{ backgroundImage: 'url("src/assets/DSCN1112.JPG")' }}>
    <div className="absolute inset-0 bg-orange-700 opacity-30 rounded-b-lg"></div>
    <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Parque Aereo Aventura</h1>
      <p className="text-lg md:text-xl mb-8">Tu aventura te espera entre los árboles. ¿Te la vas a perder?</p>
      <a href="#activities" className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">RESERVÁ AHORA</a>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-16 bg-white rounded-lg shadow-md mx-4 md:mx-auto max-w-6xl -mt-10 relative z-20 p-8">
    <h2 className="text-4xl font-bold text-center text-orange-700 mb-12">Nuestros servicios</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SERVICES.map((s) => (
        <div key={s.id} className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-lg shadow-sm hover:shadow-md transition duration-300">
          <svg className="w-16 h-16 text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.iconPath}></path>
          </svg>
          <h3 className="text-2xl font-semibold text-orange-800 mb-2">{s.title}</h3>
          <p className="text-gray-600">{s.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const Activities = () => (
  <section id="activities" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-orange-700 mb-12">Actividades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ACTIVITIES.map((a) => (
          <div key={a.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <img src={a.imgSrc} alt={a.alt} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-2">{a.title}</h3>
              <p className="text-gray-600 text-sm">{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SpecialActivities = () => (
  <section id="special-activities" className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-orange-700 mb-12">Actividades especiales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {SPECIAL_ACTIVITIES.map((s) => (
          <div key={s.id} className="flex flex-col md:flex-row items-center bg-orange-50 rounded-lg shadow-md p-6">
            <img src={s.imgSrc} alt={s.alt} className="w-full md:w-1/2 rounded-lg object-cover mb-4 md:mb-0 md:mr-6" />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-orange-800 mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Safety = () => (
  <section id="safety" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-orange-700 mb-12">Nuestra seguridad</h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
        <div className="md:w-1/2 text-center md:text-left">
          <img src="https://placehold.co/500x300/F97316/FFFFFF?text=Seguridad+Aérea" alt="Medidas de seguridad" className="rounded-lg shadow-lg mb-6 mx-auto md:mx-0" />
        </div>
        <div className="md:w-1/2">
          <ul className="space-y-4 text-lg text-gray-700">
            {SAFETY_FEATURES.map((f, i) => (
              <li key={i} className="flex items-center">
                <svg className="w-7 h-7 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-16 bg-orange-600 text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Contactanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-orange-700 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Mandanos un mensaje</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
              <input type="text" id="name" name="name" className="w-full p-3 rounded-md bg-orange-800 border border-orange-700 focus:ring-2 focus:ring-orange-300 focus:outline-none text-white placeholder-orange-200" placeholder="Tu nombre" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-3 rounded-md bg-orange-800 border border-orange-700 focus:ring-2 focus:ring-orange-300 focus:outline-none text-white placeholder-orange-200" placeholder="tu.email@ejemplo.com" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Teléfono</label>
              <input type="tel" id="phone" name="phone" className="w-full p-3 rounded-md bg-orange-800 border border-orange-700 focus:ring-2 focus:ring-orange-300 focus:outline-none text-white placeholder-orange-200" placeholder="(opcional) +54 9 11 xxxx-xxxx" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
              <textarea id="message" name="message" rows="4" className="w-full p-3 rounded-md bg-orange-800 border border-orange-700 focus:ring-2 focus:ring-orange-300 focus:outline-none text-white placeholder-orange-200" placeholder="Contanos qué querés organizar..."></textarea>
            </div>
            <button type="submit" className="w-full bg-white text-orange-600 font-bold py-3 px-6 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">Enviar</button>
          </form>
        </div>

        <div className="md:mt-0 mt-8">
          <h3 className="text-2xl font-semibold mb-6">Encontranos</h3>
          <div className="space-y-4">
            {CONTACT_DETAILS.map((d) => (
              <p key={d.id} className="flex items-center text-lg">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d.iconPath}></path>
                </svg>
                <span>{d.text}</span>
              </p>
            ))}
          </div>

          <div className="flex space-x-4 mt-8">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.id} href={s.href} className="text-white hover:text-orange-200 transition duration-300" aria-label={`Red social ${s.id}`}>
                <SocialIcon path={s.iconPath} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- App (navbar optimizado: usa NAV_LINKS para desktop y mobile) ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <header className="bg-orange-600 shadow-lg fixed w-full z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold flex items-center space-x-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7m7 7v10a1 1 0 01-1 1h-3"></path>
              </svg>
              <span>Parque Aereo Aventura</span>
            </Link>
          </div>

          <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2" aria-label="Alternar menú">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>

          <ul className="hidden md:flex space-x-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-white hover:text-orange-200 transition duration-300 font-medium">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-orange-700 pb-4">
            <ul className="flex flex-col items-center space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={`mobile-${link.href}`}>
                  <a href={link.href} onClick={toggleMenu} className="text-white hover:text-orange-200 transition duration-300 font-medium block w-full text-center py-2">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="pt-20">
        <Hero />
        <Services />
        <Activities />
        <SpecialActivities />
        <Safety />
        <Contact />
      </main>

      <footer className="bg-orange-800 text-white py-8 text-center">
        <p>© {new Date().getFullYear()} Parque Aereo Aventura. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
