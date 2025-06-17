import { useViewStore } from "../store/viewStore"

function ViewSelector() {
  const { view, setView } = useViewStore()

  const views = [
    { icon: 'ri-table-view', value: 'list' },
    { icon: 'ri-layout-grid-line', value: 'grid' },
  ]

  return (
    <div className="flex items-center gap-2 p-1 rounded-box bg-base-100 sm:p-2 md:p-4">
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
