 const suggestions = [
    {
      icon: '🏠',
      title: 'Trang chủ',
      description: 'Quay về trang chủ',
      path: '/'
    },
    {
      icon: '📋',
      title: 'Thực đơn',
      description: 'Xem các món ăn',
      path: '/menu'
    },
    {
      icon: '🍽️',
      title: 'Đặt bàn',
      description: 'Đặt bàn ngay',
      path: '/reservation'
    },
    {
      icon: '⚙️',
      title: 'Quản lý',
      description: 'Dashboard admin',
      path: '/admin'
    }
  ];

  const floatingItems = [
    { emoji: '🍜', delay: 0 },
    { emoji: '🍕', delay: 0.2 },
    { emoji: '🍔', delay: 0.4 },
    { emoji: '🍱', delay: 0.6 },
    { emoji: '🥗', delay: 0.8 },
    { emoji: '🍰', delay: 1.0 },
    { emoji: '☕', delay: 1.2 },
    { emoji: '🥤', delay: 1.4 }
  ];
export { suggestions, floatingItems };