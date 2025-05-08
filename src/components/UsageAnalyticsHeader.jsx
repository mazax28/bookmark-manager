
import { useState } from "react";
function UsageAnalyticsHeader() {
    const [selectedFilter, setSelectedFilter] = useState('todos');
    const filters = [
        { label: 'Todos', value: 'todos' },
        { label: 'Favoritos', value: 'favoritos' },
        { label: 'Recientes', value: 'recientes' },
      ];
  return (
    <div className='flex items-center justify-between bg-base-200 px-4 py-2 rounded-box'>
        <div className="flex items-center gap-2 p-4 rounded-box bg-base-100">
        {
            filters.map(({label, value}) => (
                <p 
                    key={value}
                    onClick={() => setSelectedFilter(value)}
                    className={`p-2 rounded-box cursor-pointer ${selectedFilter === value ? 'bg-primary' : ''}`}
                >
                    {label}   
                </p>


            ))
        }
      
    </div>
    </div>
  )
}

export default UsageAnalyticsHeader
