import { useFilterStore } from "../store/filterStore"
function BookmarkFilter() {
    const { selectedFilter, setFilter } = useFilterStore();
    const filters = [
        { label: 'Todos', value: 'todos' },
        { label: 'Favoritos', value: 'favoritos' },
        { label: 'Recientes', value: 'recientes' },
      ];
    console.log(selectedFilter)

  return (
    <div className="flex items-center gap-2 p-4 rounded-box bg-base-100">
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
