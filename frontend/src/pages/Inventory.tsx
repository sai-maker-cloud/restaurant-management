import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inventoryApi, type InventoryItem } from '../api/client';

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQty, setEditQty] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const q = parseInt(quantity, 10);
    if (!itemName.trim() || isNaN(q) || q < 0 || !unit.trim()) return;
    setError('');
    try {
      await inventoryApi.add(itemName.trim(), q, unit.trim());
      setItemName('');
      setQuantity('');
      setUnit('');
      setShowAdd(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add');
    }
  }

  async function handleUpdate(id: number) {
    const q = parseInt(editQty, 10);
    if (isNaN(q) || q < 0) return;
    try {
      await inventoryApi.update(id, q);
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: q } : i)));
      setEditingId(null);
      setEditQty('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
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
        <h1>Inventory</h1>
        <motion.button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowAdd(!showAdd)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showAdd ? 'Cancel' : 'Add item'}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showAdd && (
          <motion.form
            className="card form-card"
            onSubmit={handleAdd}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3>New inventory item</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Item name</label>
                <input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Tomatoes"
                  required
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <input
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="kg, L, pcs"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {error && (
        <motion.div className="alert alert-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading inventory...</p>
        </div>
      ) : (
        <motion.div
          className="table-wrap card inventory-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {items.length === 0 ? (
            <div className="empty-state-inline">
              <p>No inventory items yet.</p>
              <p className="empty-state-hint">Click &quot;Add item&quot; above to add your first item.</p>
            </div>
          ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.03 * i }}
                    exit={{ opacity: 0 }}
                  >
                    <td>{item.item_name}</td>
                    <td>
                      {editingId === item.id ? (
                        <input
                          type="number"
                          min="0"
                          value={editQty}
                          onChange={(e) => setEditQty(e.target.value)}
                          className="input-inline"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td>{item.unit}</td>
                    <td>
                      {editingId === item.id ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => handleUpdate(item.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={() => {
                              setEditingId(null);
                              setEditQty('');
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setEditingId(item.id);
                            setEditQty(String(item.quantity));
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          )}
        </motion.div>
      )}
    </div>
  );
}
