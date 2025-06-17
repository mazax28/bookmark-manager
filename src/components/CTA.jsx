import React from 'react'

function CTA() {
  return (
    <section className="py-20 bg-base-200 text-neutral-content">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Comienza a organizar tus marcadores hoy</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Únete a miles de usuarios que ya han transformado la forma en que guardan y acceden a sus sitios web
          favoritos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-lg btn-primary">Registrarse gratis</button>
          <button className="btn btn-lg btn-outline btn-primary">
            Ver planes premium
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA
