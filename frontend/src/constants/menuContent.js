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
    image: 'https://placehold.co/500?text=Sup+Hai+San',
    options: [
      { id: 'extra-seafood', name: 'Thêm hải sản', price: 20000 },
      { id: 'extra-mushroom', name: 'Thêm nấm', price: 10000 }
    ],
    recommendations: [8, 9] // Suggested drinks
  },
  {
    id: 2,
    categoryId: 'starters',
    name: 'Gỏi Ngó Sen Tôm Thịt',
    price: 120000,
    description: 'Ngó sen giòn ngọt trộn cùng tôm tươi, thịt ba chỉ và nước mắm chua ngọt.',
    image: 'https://via.placeholder.com/500?text=Goi+Ngo+Sen',
    options: [
      { id: 'extra-shrimp', name: 'Thêm tôm (4 con)', price: 30000 },
      { id: 'less-spicy', name: 'Ít cay', price: 0 }
    ],
    recommendations: [8, 1]
  },
  
  // Main Courses
  {
    id: 3,
    categoryId: 'main-courses',
    name: 'Bò Lúc Lắc Khoai Tây Chiên',
    price: 250000,
    description: 'Thịt bò Mỹ mềm mại xào cùng hành tây, ớt chuông và khoai tây chiên giòn.',
    image: 'https://via.placeholder.com/500?text=Bo+Luc+Lac',
    options: [
      { id: 'extra-beef', name: 'Thêm bò (100g)', price: 80000 },
      { id: 'extra-fries', name: 'Thêm khoai tây', price: 25000 }
    ],
    recommendations: [4, 9]
  },
  {
    id: 4,
    categoryId: 'main-courses',
    name: 'Cá Hồi Áp Chảo Sốt Chanh Dây',
    price: 320000,
    description: 'Cá hồi tươi áp chảo da giòn, dùng kèm sốt chanh dây thơm lừng và rau củ.',
    image: 'https://via.placeholder.com/500?text=Ca+Hoi+Ap+Chao',
    options: [
      { id: 'extra-salmon', name: 'Thêm cá hồi (100g)', price: 120000 },
      { id: 'extra-sauce', name: 'Thêm sốt', price: 15000 }
    ],
    recommendations: [9, 6]
  },
  {
    id: 5,
    categoryId: 'main-courses',
    name: 'Gà Quay Lu Thảo Mộc',
    price: 280000,
    description: 'Gà ta thả vườn quay lu với các loại thảo mộc, da giòn thịt ngọt.',
    image: 'https://via.placeholder.com/500?text=Ga+Quay+Lu',
    options: [
      { id: 'half-chicken', name: 'Nửa con', price: 0 },
      { id: 'whole-chicken', name: 'Nguyên con', price: 250000 }
    ],
    recommendations: [2, 8]
  },

  // Desserts
  {
    id: 6,
    categoryId: 'desserts',
    name: 'Chè Khúc Bạch Trái Cây',
    price: 45000,
    description: 'Thạch khúc bạch mềm béo, ăn kèm hạnh nhân rang và trái cây theo mùa.',
    image: 'https://via.placeholder.com/500?text=Che+Khuk+Bach',
    options: [
      { id: 'extra-almond', name: 'Thêm hạnh nhân', price: 5000 },
      { id: 'extra-jelly', name: 'Thêm thạch', price: 10000 }
    ],
    recommendations: [7, 8]
  },
  {
    id: 7,
    categoryId: 'desserts',
    name: 'Bánh Flan Cốt Dừa',
    price: 35000,
    description: 'Bánh flan mềm mịn hòa quyện cùng nước cốt dừa béo ngậy và caramel.',
    image: 'https://via.placeholder.com/500?text=Banh+Flan',
    options: [
      { id: 'extra-coconut', name: 'Thêm cốt dừa', price: 5000 }
    ],
    recommendations: [6, 9]
  },

  // Drinks
  {
    id: 8,
    categoryId: 'drinks',
    name: 'Nước Ép Cam Tươi',
    price: 40000,
    description: 'Cam tươi nguyên chất giàu vitamin C, không đường hóa học.',
    image: 'https://via.placeholder.com/500?text=Nuoc+Ep+Cam',
    options: [
      { id: 'no-ice', name: 'Không đá', price: 0 },
      { id: 'less-sugar', name: 'Ít đường', price: 0 }
    ],
    recommendations: [1, 6]
  },
  {
    id: 9,
    categoryId: 'drinks',
    name: 'Trà Đào Cam Sả',
    price: 45000,
    description: 'Trà đào thơm nồng kết hợp cùng vị cam tươi và hương sả thư giãn.',
    image: 'https://via.placeholder.com/500?text=Tra+Dao+Cam+Sa',
    options: [
      { id: 'extra-peach', name: 'Thêm miếng đào', price: 10000 },
      { id: 'large-size', name: 'Size lớn', price: 15000 }
    ],
    recommendations: [3, 4]
  }
];

export { menuCategories, menuItems };
