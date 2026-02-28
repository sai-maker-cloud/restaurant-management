import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { menuApi, ordersApi, type MenuItem } from '../api/client';

export default function Orders() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ menu_id: number; quantity: number; name: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    menuApi
      .getAll()
      .then(setMenu)
      .catch(() => setError('Failed to load menu'))
      .finally(() => setLoading(false));
  }, []);

  function addToCart(item: MenuItem, qty: number = 1) {
    if (qty < 1) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.menu_id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.menu_id === item.id ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [...prev, { menu_id: item.id, quantity: qty, name: item.name, price: item.price }];
    });
  }

  function updateQty(menuId: number, delta: number) {
    setCart((prev) =>
      prev
        .map((c) =>
          c.menu_id === menuId ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c
        )
        .filter((c) => c.quantity > 0)
    );
  }

  async function placeOrder() {
    if (cart.length === 0) return;
    setPlacing(true);
    setError('');
    try {
      const { order_id } = await ordersApi.place(
        cart.map((c) => ({ menu_id: c.menu_id, quantity: c.quantity }))
      );
      setOrderId(order_id);
      setCart([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  if (loading) {
    return (
      <div className="page">
        <div className="loading">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Place order
      </motion.h1>

      {orderId !== null && (
        <motion.div
          className="alert alert-success"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Order #{orderId} placed. Go to Payment to pay.
        </motion.div>
      )}
      {error && (
        <motion.div className="alert alert-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.div>
      )}

      <div className="orders-layout">
        <motion.div
          className="menu-list card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3>Menu</h3>
          <ul className="menu-order-list">
            {menu.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="menu-order-item"
              >
                <span className="menu-order-name">{item.name}</span>
                <span className="menu-order-price">${Number(item.price).toFixed(2)}</span>
                <motion.button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => addToCart(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="cart card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3>Your order</h3>
          {cart.length === 0 ? (
            <p className="empty-cart">Cart is empty. Add items from the menu.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((c) => (
                  <li key={c.menu_id} className="cart-item">
                    <span>{c.name} × {c.quantity}</span>
                    <div className="cart-item-actions">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => updateQty(c.menu_id, -1)}
                      >
                        −
                      </button>
                      <span>{c.quantity}</span>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => updateQty(c.menu_id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <span>${(c.price * c.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
              <motion.button
                type="button"
                className="btn btn-primary btn-block"
                onClick={placeOrder}
                disabled={placing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {placing ? 'Placing...' : 'Place order'}
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
