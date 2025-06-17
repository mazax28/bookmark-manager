import React from 'react'

function Testimonials() {
  return (
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-base-content mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Descubre cómo Bookmark Manager ha ayudado a otros a organizar su vida digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="flex items-center mb-4">
                  <div className="avatar mr-4">
                    <div className="w-12 h-12 rounded-full bg-base-200"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content">María García</h4>
                    <p className="text-sm text-base-content/60">Diseñadora UX</p>
                  </div>
                </div>
                <p className="text-base-content/70">
                  "Como diseñadora, guardo cientos de referencias web. Bookmark Manager me ha permitido organizarlas
                  todas de forma intuitiva y acceder a ellas cuando las necesito."
                </p>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="flex items-center mb-4">
                  <div className="avatar mr-4">
                    <div className="w-12 h-12 rounded-full bg-base-200"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content">Carlos Rodríguez</h4>
                    <p className="text-sm text-base-content/60">Desarrollador web</p>
                  </div>
                </div>
                <p className="text-base-content/70">
                  "La función de etiquetas ha revolucionado mi flujo de trabajo. Puedo encontrar cualquier recurso de
                  programación en segundos, sin importar cuándo lo guardé."
                </p>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body pt-6">
                <div className="flex items-center mb-4">
                  <div className="avatar mr-4">
                    <div className="w-12 h-12 rounded-full bg-base-200"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content">Laura Martínez</h4>
                    <p className="text-sm text-base-content/60">Estudiante</p>
                  </div>
                </div>
                <p className="text-base-content/70">
                  "Organizo mis recursos de estudio por asignaturas y temas. La interfaz minimalista me ayuda a mantener
                  el enfoque y encontrar lo que necesito sin distracciones."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Testimonials
