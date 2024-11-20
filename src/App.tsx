import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const loveQuotes = [
  "Te amo más que ayer, menos que mañana",
  "Eres mi sol en los días oscuros",
  "Si tuviera que volver a comenzar mi vida, intentaría encontrarte mucho antes",
  "Contigo, la vida es una hermosa melodía",
  "Bésame, hasta que mis labios tengan tu nombre",
  "Te quiero porque sin querer cambiar nada en mí, llegaste a cambiarlo todo",
  "Toma mi mano, toma mi corazón y abrázame para siempre. Te amo",
  "Cuando tú me ves, me devuelves el alma que el mundo me roba",
  "El camino será largo, pero valdrá la pena recorrerlo junto a ti",
  "No necesito decirte que te amo porque sé que lo sientes, pero uno de mis mayores placeres es hacértelo saber y hacértelo sentir",
  "Te amo, así de simple, así de fuerte",
  "Tú, yo, tu casa, acostados... viendo películas abrazados",
  "Ojalá estuvieras aquí conmigo, o yo allá contigo… ¡Te amo, te extraño",
  "Hay algo en ti que me resulta adictivo, quizás sea tu sonrisa, o tu mirada, o tus labios o todo junto.",
  "Prefiero estar contigo y que me salga mal, a no estar contigo nunca.",
  

];

const FloatingHeart = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const randomPosition = Math.floor(Math.random() * 80) + 10; // 10% to 90% of screen width

  return (
    <div 
      className={`absolute bottom-0 animate-float`}
      style={{ left: `${randomPosition}%` }}
    >
      <Heart 
        className="text-red-500 animate-pulse" 
        fill="pink" 
        size={24} 
      />
    </div>
  );
};

const LoveApp = () => {
  const [quote, setQuote] = useState('Catherine, te amo ❤️');
  const [hearts, setHearts] = useState([]);

  // Generar nuevo corazón cada segundo
  useEffect(() => {
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
      };
      setHearts(prev => [...prev, newHeart]);
    }, 1000);

    // Cambiar frase cada minuto
    const quoteInterval = setInterval(() => {
      const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
      setQuote(randomQuote);
    }, 12000);

    return () => {
      clearInterval(heartInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  const removeHeart = (id) => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-pink-50 overflow-hidden">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        
        <div className= "flex items-center justify-between space-x-5">
        {/* Título */}
        <h1 className="text-6xl font-bold text-red-500 mb-8">Catherine </h1>
        
        {/* Corazón central */}
        <Heart 
          className="text-red-500 mb-8 animate-pulse" 
          size={64} 
          fill="pink"
        />
        </div>

        {/* Frase de amor */}
        <p className="text-2xl text-center text-pink-700 px-4 max-w-lg">
          {quote}
        </p>
      </div>

      {/* Corazones flotantes */}
      {hearts.map(heart => (
        <FloatingHeart 
          key={heart.id}
          onComplete={() => removeHeart(heart.id)}
        />
      ))}

      {/* Estilos para la animación de float */}
      <style jsx global>{`
        .animate-float {
          animation: float 3s linear forwards;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoveApp;