-- Indian dishes with images. Run in pgAdmin (Query Tool on your 'rest' database).
-- First run: add-menu-image-column.sql if your menu_items table has no image column.

INSERT INTO menu_items (name, price, category, image) VALUES
-- Starters (Indian snacks / appetizers)
('Samosa', 3.99, 'Starters', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=260&fit=crop'),
('Pakora', 4.49, 'Starters', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=260&fit=crop'),
('Paneer Tikka', 6.99, 'Starters', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=260&fit=crop'),
('Chicken 65', 5.99, 'Starters', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=260&fit=crop'),
('Aloo Tikki', 3.49, 'Starters', 'https://images.unsplash.com/photo-1585937260642-63b27d0ed9ec?w=400&h=260&fit=crop'),
('Tandoori Chicken (half)', 7.99, 'Starters', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=260&fit=crop'),
('Onion Bhaji', 4.99, 'Starters', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=260&fit=crop'),
('Papdi Chaat', 4.49, 'Starters', 'https://images.unsplash.com/photo-1585937260642-63b27d0ed9ec?w=400&h=260&fit=crop'),
-- Main Course - Vegetarian
('Paneer Butter Masala', 11.99, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=260&fit=crop'),
('Chana Masala', 9.99, 'Main Course', 'https://images.unsplash.com/photo-1585937260642-63b27d0ed9ec?w=400&h=260&fit=crop'),
('Dal Makhani', 10.49, 'Main Course', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=260&fit=crop'),
('Palak Paneer', 11.49, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=260&fit=crop'),
('Aloo Gobi', 9.49, 'Main Course', 'https://images.unsplash.com/photo-1585937260642-63b27d0ed9ec?w=400&h=260&fit=crop'),
('Vegetable Biryani', 12.99, 'Main Course', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=260&fit=crop'),
('Malai Kofta', 11.99, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=260&fit=crop'),
('Dal Tadka', 8.99, 'Main Course', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=260&fit=crop'),
-- Main Course - Non-Veg
('Chicken Tikka Masala', 13.99, 'Main Course', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=260&fit=crop'),
('Butter Chicken', 13.99, 'Main Course', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=260&fit=crop'),
('Lamb Rogan Josh', 14.99, 'Main Course', 'https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=400&h=260&fit=crop'),
('Chicken Biryani', 13.49, 'Main Course', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=260&fit=crop'),
('Fish Curry', 12.99, 'Main Course', 'https://images.unsplash.com/photo-1580959375944-1ab5b3235966?w=400&h=260&fit=crop'),
('Goat Curry', 14.49, 'Main Course', 'https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=400&h=260&fit=crop'),
('Tandoori Chicken (full)', 12.99, 'Main Course', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=260&fit=crop'),
-- Breads
('Garlic Naan', 2.99, 'Breads', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=260&fit=crop'),
('Plain Naan', 2.49, 'Breads', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=260&fit=crop'),
('Butter Naan', 2.99, 'Breads', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=260&fit=crop'),
('Roti', 1.99, 'Breads', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=260&fit=crop'),
('Paratha', 3.49, 'Breads', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=260&fit=crop'),
('Puri', 3.99, 'Breads', 'https://images.unsplash.com/photo-1585937260642-63b27d0ed9ec?w=400&h=260&fit=crop'),
-- Rice
('Plain Rice', 2.99, 'Rice', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=260&fit=crop'),
('Jeera Rice', 3.49, 'Rice', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=260&fit=crop'),
('Lemon Rice', 3.99, 'Rice', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=260&fit=crop'),
-- Desserts
('Gulab Jamun', 4.99, 'Desserts', 'https://images.unsplash.com/photo-1488477181946-d9f107e2f35f?w=400&h=260&fit=crop'),
('Kheer', 4.49, 'Desserts', 'https://images.unsplash.com/photo-1488477181946-d9f107e2f35f?w=400&h=260&fit=crop'),
('Ras Malai', 5.49, 'Desserts', 'https://images.unsplash.com/photo-1488477181946-d9f107e2f35f?w=400&h=260&fit=crop'),
('Kulfi', 3.99, 'Desserts', 'https://images.unsplash.com/photo-1559925393-8be0ec4a26d2?w=400&h=260&fit=crop'),
('Gajar Halwa', 4.99, 'Desserts', 'https://images.unsplash.com/photo-1488477181946-d9f107e2f35f?w=400&h=260&fit=crop'),
-- Beverages
('Mango Lassi', 3.99, 'Beverages', 'https://images.unsplash.com/photo-1553536602-5dc53fbb9272?w=400&h=260&fit=crop'),
('Sweet Lassi', 3.49, 'Beverages', 'https://images.unsplash.com/photo-1553536602-5dc53fbb9272?w=400&h=260&fit=crop'),
('Masala Chai', 2.49, 'Beverages', 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=260&fit=crop'),
('Chai', 1.99, 'Beverages', 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=260&fit=crop'),
('Fresh Lime Soda', 2.99, 'Beverages', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=260&fit=crop');
