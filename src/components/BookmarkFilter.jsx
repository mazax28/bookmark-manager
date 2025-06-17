import { useFilterStore } from "../store/filterStore"
function BookmarkFilter() {
    const { selectedFilter, setFilter } = useFilterStore();
    const filters = [
        { label: 'Todos', value: 'todos' },
        { label: 'Favoritos', value: 'favoritos' },
        { label: 'Recientes', value: 'recientes' },
      ];

  return (
    <div className="flex items-center gap-2 p-1 rounded-box bg-base-100 sm:p-2 md:p-4">
        {
            filters.map(({label, value}) => (
                <p 
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`p-2 rounded-box cursor-pointer ${selectedFilter === value ? 'bg-primary' : ''}`}
                >
                    {label}   
                </p>


            ))
        }
      
    </div>
  )
}

export default BookmarkFilter
