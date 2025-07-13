import React from 'react'
const statsConfig = [
    {
      key: "totalBookmarks",
      title: "Total Bookmarks",
      iconClass: "ri-bookmark-fill",
    },
    {
      key: "totalFolders",
      title: "Total Folders",
      iconClass: "ri-folder-fill",
    },
    {
      key: "totalSubfolders",
      title: "Total Subfolders",
      iconClass: "ri-folders-fill",
    },
    {
      key: "favorites",
      title: "Favoritos",
      iconClass: "ri-bookmark-fill text-yellow-400",
    },
  ];
  
  const dataBack = {
    totalBookmarks: 45,
    totalFolders: 8,
    totalSubfolders: 4,
    favorites: 10,
  };
  
  
  function StatsCard() {
    return (
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-4">
        {statsConfig.map((item) => (
          <div key={item.key} className="card border border-base-800 w-96">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title">{item.title}</h2>
                <i className={`${item.iconClass} text-xl`} />
              </div>
              <p className="text-4xl font-bold">{dataBack[item.key]}</p>
              <p>+12% desde el mes pasado</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  

export default StatsCard
