import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">
            Organiza tus marcadores web de forma inteligente
          </h1>
          <p className="text-xl text-base-content/70">
            Guarda, organiza y accede a tus sitios web favoritos desde cualquier dispositivo con nuestra aplicación
            minimalista y potente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={'/auth'} className="btn btn-primary btn-lg">
              Comenzar gratis
            </Link>
            <button className="btn btn-outline btn-lg">
              Ver demo
            </button>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl border border-base-300">
          <div className="w-full h-full bg-base-300 flex items-center justify-center">
            {/* Reemplaza esto con una imagen real cuando esté disponible */}
            <div className="text-base-content/50 text-xl">
              <i className="ri-image-line text-4xl mb-2"></i>
              <p>Captura de pantalla de la aplicación</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
