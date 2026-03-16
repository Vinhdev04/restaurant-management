import React, { useState } from 'react';
import styles from './MenuManagement.module.scss';

const MenuManagement = () => {
  const [activeTab, setActiveTab] = useState('All Items');

  const tabs = ['All Items', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];

  const menuItems = [
    {
      id: 1,
      name: 'Grilled Salmon',
      category: 'Main Course',
      price: '$28.99',
      description: 'Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon butter sauce',
      image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Caesar Salad',
      category: 'Appetizer',
      price: '$12.99',
      description: 'Crisp romaine lettuce with homemade Caesar dressing, parmesan cheese, and garlic croutons',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Ribeye Steak',
      category: 'Main Course',
      price: '$42.99',
      description: 'Premium 12oz ribeye steak cooked to your preference, served with mashed potatoes and grilled asparagus',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Tiramisu',
      category: 'Dessert',
      price: '$9.99',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      status: 'Available'
    },
    {
      id: 5,
      name: 'Lobster Bisque',
      category: 'Appetizer',
      price: '$15.99',
      description: 'Rich and creamy lobster soup with fresh herbs and a hint of sherry',
      image: 'https://images.unsplash.com/photo-1547592166-23acbe3a624b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      status: 'Available'
    },
    {
      id: 6,
      name: 'Margherita Pizza',
      category: 'Main Course',
      price: '$18.99',
      description: 'Traditional Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, and basil',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      status: 'Out of Stock'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Menu Management</h1>
          <p className={styles.subtitle}>Manage your restaurant menu items</p>
        </div>
        <button className={styles.addButton}>+ Add Menu Item</button>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {menuItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <span className={`${styles.statusBadge} ${item.status === 'Available' ? styles.available : styles.outOfStock}`}>
                {item.status}
              </span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <span className={styles.itemPrice}>{item.price}</span>
              </div>
              <span className={styles.itemCategory}>{item.category}</span>
              <p className={styles.itemDescription}>{item.description}</p>
              
              <div className={styles.cardActions}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
