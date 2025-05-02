const foldermockData = [
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


const bookmarkmockData = [
  {
    "_id": "1",
    "url": "https://github.com",
    "title": "GitHub",
    "description": "Plataforma de desarrollo colaborativo.",
    "tags": ["dev", "code", "git"],
    "clickCount": 14,
    "lastClicked": "2025-04-27T10:00:00Z",
    "folder": "desarrollo",
    "createdAt": "2025-04-01T08:00:00Z",
    "updatedAt": "2025-04-20T10:00:00Z"
  },
  {
    "_id": "2",
    "url": "https://dribbble.com",
    "title": "Dribbble",
    "description": "Comunidad de diseñadores.",
    "tags": ["design", "ui", "ux"],
    "metadata": {
      "image": "https://cdn.dribbble.com/assets/dribbble-ball-icon-3f6c3a221f5d42ee86205fa0d6348c81c7cf8468cb7e733be2ce1d9701e4f08f.svg"
    },
    "clickCount": 8,
    "lastClicked": "2025-04-25T12:00:00Z",
    "folder": "diseño",
    "createdAt": "2025-04-03T08:00:00Z",
    "updatedAt": "2025-04-22T10:00:00Z"
  },
  {
    "_id": "3",
    "url": "https://notion.so",
    "title": "Notion",
    "description": "Espacio de trabajo todo-en-uno.",
    "tags": ["productividad", "organización"],
    "metadata": {
      "image": "https://www.notion.so/images/logo-ios.png"
    },
    "clickCount": 21,
    "lastClicked": "2025-04-30T08:00:00Z",
    "folder": "productividad",
    "createdAt": "2025-04-05T09:00:00Z",
    "updatedAt": "2025-04-28T11:00:00Z"
  },
  {
    "_id": "4",
    "url": "https://notion.so",
    "title": "Notion",
    "description": "Espacio de trabajo todo-en-uno.",
    "tags": ["productividad", "organización"],
    "metadata": {
      "image": "https://www.notion.so/images/logo-ios.png"
    },
    "clickCount": 21,
    "lastClicked": "2025-04-30T08:00:00Z",
    "folder": "productividad",
    "createdAt": "2025-04-05T09:00:00Z",
    "updatedAt": "2025-04-28T11:00:00Z"
  }
  ,
  {
    "_id": "5",
    "url": "https://stackoverflow.com",
    "title": "Stack Overflow",
    "description": "Comunidad de preguntas para programadores.",
    "tags": ["dev", "programación"],
    "metadata": {
      "image": "https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.png"
    },
    "clickCount": 10,
    "lastClicked": "2025-04-26T14:00:00Z",
    "folder": "desarrollo",
    "createdAt": "2025-04-02T08:00:00Z",
    "updatedAt": "2025-04-23T10:00:00Z"
  }
]



  
  export { foldermockData, bookmarkmockData };