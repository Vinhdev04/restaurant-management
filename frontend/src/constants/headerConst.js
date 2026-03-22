 const navigationItems = [
    { name: 'Trang chủ', path: '/', icon: '🏠' },
    { 
      name: 'Thực đơn', 
      path: '/menu',
      icon: '📋',
      dropdown: [
        { name: 'Khai vị', path: '/menu/appetizers' },
        { name: 'Món chính', path: '/menu/main-dishes' },
        { name: 'Đồ uống', path: '/menu/beverages' },
        { name: 'Tráng miệng', path: '/menu/desserts' }
      ]
    },
    { 
      name: 'Đặt bàn', 
      path: '/reservation',
      icon: '📅'
    },
    {
      name: 'Gọi món',
      path: '/tablet',
      icon: '🍽️'
    },
    { 
      name: 'Quản lý', 
      path: '/admin',
      icon: '⚙️',
      dropdown: [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Đơn hàng', path: '/admin/orders' },
        { name: 'Bàn ăn', path: '/admin/tables' },
        { name: 'Báo cáo', path: '/admin/reports' }
      ]
    }
  ];

  export { navigationItems };