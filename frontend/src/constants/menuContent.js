const menuCategories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'starters', name: 'Món Khai Vị' },
  { id: 'main-courses', name: 'Món Chính' },
  { id: 'desserts', name: 'Tráng Miệng' },
  { id: 'drinks', name: 'Đồ Uống' }
];

const menuItems = [
  // Starters
  {
    id: 1,
    categoryId: 'starters',
    name: 'Súp Hải Sản Tóc Tiên',
    price: 85000,
    description: 'Súp hải sản tươi ngon kết hợp cùng tóc tiên thanh mát và nấm hương.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500'
  },
  {
    id: 2,
    categoryId: 'starters',
    name: 'Gỏi Ngó Sen Tôm Thịt',
    price: 120000,
    description: 'Ngó sen giòn ngọt trộn cùng tôm tươi, thịt ba chỉ và nước mắm chua ngọt.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500'
  },
  
  // Main Courses
  {
    id: 3,
    categoryId: 'main-courses',
    name: 'Bò Lúc Lắc Khoai Tây Chiên',
    price: 250000,
    description: 'Thịt bò Mỹ mềm mại xào cùng hành tây, ớt chuông và khoai tây chiên giòn.',
    image: 'https://images.unsplash.com/photo-1558030006-45c675171f3a?q=80&w=500'
  },
  {
    id: 4,
    categoryId: 'main-courses',
    name: 'Cá Hồi Áp Chảo Sốt Chanh Dây',
    price: 320000,
    description: 'Cá hồi tươi áp chảo da giòn, dùng kèm sốt chanh dây thơm lừng và rau củ.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500'
  },
  {
    id: 5,
    categoryId: 'main-courses',
    name: 'Gà Quay Lu Thảo Mộc',
    price: 280000,
    description: 'Gà ta thả vườn quay lu với các loại thảo mộc, da giòn thịt ngọt.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=500'
  },

  // Desserts
  {
    id: 6,
    categoryId: 'desserts',
    name: 'Chè Khúc Bạch Trái Cây',
    price: 45000,
    description: 'Thạch khúc bạch mềm béo, ăn kèm hạnh nhân rang và trái cây theo mùa.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500'
  },
  {
    id: 7,
    categoryId: 'desserts',
    name: 'Bánh Flan Cốt Dừa',
    price: 35000,
    description: 'Bánh flan mềm mịn hòa quyện cùng nước cốt dừa béo ngậy và caramel.',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=500'
  },

  // Drinks
  {
    id: 8,
    categoryId: 'drinks',
    name: 'Nước Ép Cam Tươi',
    price: 40000,
    description: 'Cam tươi nguyên chất giàu vitamin C, không đường hóa học.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500'
  },
  {
    id: 9,
    categoryId: 'drinks',
    name: 'Trà Đào Cam Sả',
    price: 45000,
    description: 'Trà đào thơm nồng kết hợp cùng vị cam tươi và hương sả thư giãn.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500'
  }
];

export { menuCategories, menuItems };
