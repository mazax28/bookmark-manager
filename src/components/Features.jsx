import React from 'react'

function Features() {
  return (
   <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-base-content mb-4">Características principales</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Diseñado para simplificar la forma en que guardas y organizas tus sitios web favoritos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="mb-4 bg-base-200 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <i className="ri-folder-line text-xl text-base-content"></i>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">Organización en carpetas</h3>
                <p className="text-base-content/70">
                  Organiza tus marcadores en carpetas personalizadas para mantener todo ordenado y fácil de encontrar.
                </p>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="mb-4 bg-base-200 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <i className="ri-price-tag-3-line text-xl text-base-content"></i>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">Etiquetas personalizadas</h3>
                <p className="text-base-content/70">
                  Añade etiquetas a tus marcadores para facilitar la búsqueda y organización por categorías.
                </p>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="mb-4 bg-base-200 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <i className="ri-star-line text-xl text-base-content"></i>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">Favoritos y recientes</h3>
                <p className="text-base-content/70">
                  Marca tus sitios más importantes como favoritos y accede rápidamente a los visitados recientemente.
                </p>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="mb-4 bg-base-200 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <i className="ri-layout-grid-line text-xl text-base-content"></i>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">Vistas personalizables</h3>
                <p className="text-base-content/70">
                  Visualiza tus marcadores en formato de tarjeta o tabla según tus preferencias.
                </p>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="mb-4 bg-base-200 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <i className="ri-search-line text-xl text-base-content"></i>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">Búsqueda rápida</h3>
                <p className="text-base-content/70">
                  Encuentra cualquier marcador al instante con nuestra potente función de búsqueda.
                </p>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="mb-4 bg-base-200 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <i className="ri-time-line text-xl text-base-content"></i>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">Sincronización automática</h3>
                <p className="text-base-content/70">
                  Accede a tus marcadores desde cualquier dispositivo con sincronización en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Features
