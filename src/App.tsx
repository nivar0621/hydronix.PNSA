import React, { useState, useEffect } from 'react';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, Timer, Waves as WaveSine } from 'lucide-react';

function App() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-md z-40">
        <div className="container mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Calculator className="w-8 h-8 text-Green-600" />
            <span className="text-xl font-bold text-gray-800">Hydronix</span>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Wave Energy Simulator */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="container mx-auto px-6 mb-20 pt-32"
          id="simulador"
        >
          <div className="flex items-center gap-4 mb-8">
            <Calculator className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-800">Simulador de Energía Undimotriz</h2>
          </div>

          <WaveEnergySimulator fadeInUp={fadeInUp} />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm shadow-md mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Desarrollado por <span className="font-semibold">Brayniel Nivar Castro</span>
            </p>
            <p className="text-gray-600">
              Politécnico Nuestra Señora De La Altagracia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function WaveEnergySimulator({ fadeInUp }: { fadeInUp: any }) {
  const [waveHeight, setWaveHeight] = useState(2);
  const [waveLength, setWaveLength] = useState(50);
  const [waterDensity, setWaterDensity] = useState(1025);
  const [energy, setEnergy] = useState(0);

  const calculateEnergy = () => {
    const g = 9.81; // Gravity constant
    const T = Math.sqrt((2 * Math.PI * waveLength) / g); // Wave period
    const E = (waterDensity * Math.pow(g, 2) * Math.pow(waveHeight, 2) * T) / (64 * Math.PI);
    return E;
  };

  useEffect(() => {
    const result = calculateEnergy();
    setEnergy(result);
  }, [waveHeight, waveLength, waterDensity]);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white p-8 rounded-2xl shadow-xl"
    >
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura de Ola (H): {waveHeight} metros
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={waveHeight}
              onChange={(e) => setWaveHeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.5m</span>
              <span>10m</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitud de Ola (L): {waveLength} metros
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={waveLength}
              onChange={(e) => setWaveLength(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10m</span>
              <span>200m</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Densidad del Agua (ρ): {waterDensity} kg/m³
            </label>
            <input
              type="range"
              min="1000"
              max="1050"
              step="1"
              value={waterDensity}
              onChange={(e) => setWaterDensity(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1000 kg/m³</span>
              <span>1050 kg/m³</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Potencia Generada</h3>
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {Math.round(energy)}
          </div>
          <p className="text-gray-600">Watts por metro de frente de ola</p>
          
          <div className="mt-8 space-y-4 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <WaveSine className="w-4 h-4 text-blue-500" />
              Periodo de ola: {Math.round(Math.sqrt((2 * Math.PI * waveLength) / 9.81) * 10) / 10} segundos
            </p>
            <p className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-blue-500" />
              Energía por día: {Math.round(energy * 24)} kWh/m
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">¿Cómo funciona?</h4>
        <p className="text-gray-600">
          Este simulador calcula la potencia teórica disponible por metro de frente de ola basándose en la fórmula de energía undimotriz. 
          Los resultados son aproximados y pueden variar en condiciones reales debido a factores adicionales como la eficiencia de conversión 
          y las condiciones ambientales específicas.
        </p>
      </div>
    </motion.div>
  );
}

export default App;