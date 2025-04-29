const mockData = [
    {
      id: 'folder-1',
      name: 'Desarrollo',
      color: 'blue',
      bookmarks: [
        {
          id: 'bm-1',
          title: 'GitHub',
          description: 'Plataforma de desarrollo colaborativo',
          url: 'https://github.com',
          favorite: true,
          createdAt: '2024-11-01'
        },
        {
          id: 'bm-2',
          title: 'Stack Overflow',
          description: 'Comunidad de preguntas para programadores',
          url: 'https://stackoverflow.com',
          favorite: false,
          createdAt: '2024-11-02'
        }
      ]
    },
    {
      id: 'folder-2',
      name: 'Diseño',
      color: 'pink',
      bookmarks: [
        {
          id: 'bm-3',
          title: 'Dribbble',
          description: 'Comunidad de diseñadores',
          url: 'https://dribbble.com',
          favorite: false,
          createdAt: '2024-11-03'
        },
        {
          id: 'bm-4',
          title: 'Behance',
          description: 'Trabajo creativo y portafolios',
          url: 'https://behance.net',
          favorite: true,
          createdAt: '2024-11-04'
        }
      ]
    },
    {
      id: 'folder-3',
      name: 'Productividad',
      color: 'green',
      bookmarks: [
        {
          id: 'bm-5',
          title: 'Notion',
          description: 'Espacio de trabajo todo-en-uno',
          url: 'https://notion.so',
          favorite: true,
          createdAt: '2024-11-05'
        },
        {
          id: 'bm-6',
          title: 'Trello',
          description: 'Herramienta de gestión de proyectos',
          url: 'https://trello.com',
          favorite: false,
          createdAt: '2024-11-06'
        }
      ]
    }
  ];
  
  export { mockData };