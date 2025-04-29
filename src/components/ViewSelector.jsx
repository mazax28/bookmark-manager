import { useViewStore } from "../store/viewStore"

function ViewSelector() {
  const { view, setView } = useViewStore()

  const views = [
    { icon: 'ri-kanban-view', value: 'list' },
    { icon: 'ri-layout-grid-line', value: 'grid' },
  ]

  return (
    <div className="flex items-center gap-2 p-4 rounded-box bg-base-100">
      {views.map(({ icon, value }) => (
        <p
          key={value}
          onClick={() => setView(value)}
          className={`p-2 rounded-box cursor-pointer select-none text-xl ${
            view === value ? 'bg-primary text-primary-content' : 'hover:bg-base-200'
          }`}
        >
          <i className={icon}></i>
        </p>
      ))}
    </div>
  )
}

export default ViewSelector
