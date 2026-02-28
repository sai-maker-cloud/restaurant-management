import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuApi, type MenuItem } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const { isAdmin } = useAuth();

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await menuApi.getAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load menu');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const p = parseFloat(price);
    if (!name.trim() || isNaN(p) || p < 0 || !category.trim()) return;
    setError('');
    try {
      await menuApi.add(name.trim(), p, category.trim(), image.trim() || undefined);
      setName('');
      setPrice('');
      setCategory('');
      setImage('');
      setShowAdd(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
    }
  }

  async function handleDelete(id: number) {
    try {
      await menuApi.delete(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  }

  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Menu</h1>
        {isAdmin && (
          <motion.button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowAdd(!showAdd)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showAdd ? 'Cancel' : 'Add item'}
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {showAdd && isAdmin && (
          <motion.form
            className="card form-card"
            onSubmit={handleAdd}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>New menu item</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Item name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Appetizer, Main"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://... (optional)"
                type="url"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          className="alert alert-error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {loading ? (
        <motion.div
          className="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="spinner" />
          <p>Loading menu...</p>
        </motion.div>
      ) : (
        <motion.div
          className="card-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.p
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No menu items yet. {isAdmin && 'Add one above.'}
              </motion.p>
            ) : (
              items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="menu-card card"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.03 * i, duration: 0.3 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="menu-card-image-wrap">
                    <img
                      src={item.image || `https://placehold.co/400x260/c9a227/1a1a1a?text=${encodeURIComponent(item.name)}`}
                      alt={item.name}
                      className="menu-card-image"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x260/c9a227/1a1a1a?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  </div>
                  <div className="menu-card-content">
                    <span className="menu-card-category">{item.category}</span>
                    <h3>{item.name}</h3>
                    <p className="menu-card-price">${Number(item.price).toFixed(2)}</p>
                  </div>
                  {isAdmin && (
                    <div className="menu-card-actions">
                      <motion.button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
