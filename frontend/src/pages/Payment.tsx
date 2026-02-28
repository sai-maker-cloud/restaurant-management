import { useState } from 'react';
import { motion } from 'framer-motion';
import { paymentApi } from '../api/client';
import { ordersApi } from '../api/client';

export default function Payment() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bill, setBill] = useState<{ name: string; quantity: number; price: number; total?: number }[] | null>(null);
  const [billOrderId, setBillOrderId] = useState<number | null>(null);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    const id = parseInt(orderId, 10);
    if (isNaN(id)) {
      setError('Enter a valid order ID');
      return;
    }
    setError('');
    setLoading(true);
    setSuccess(false);
    try {
      await paymentApi.pay(id);
      setSuccess(true);
      setOrderId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleGetBill(e: React.FormEvent) {
    e.preventDefault();
    const id = parseInt(orderId, 10);
    if (isNaN(id)) {
      setError('Enter a valid order ID');
      return;
    }
    setError('');
    setBill(null);
    try {
      const data = await ordersApi.getBill(id);
      setBill(data);
      setBillOrderId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bill');
    }
  }

  const billTotal = bill?.reduce((sum, row) => sum + (row.price || 0) * row.quantity, 0) ?? 0;

  return (
    <div className="page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Payment
      </motion.h1>

      {success && (
        <motion.div
          className="alert alert-success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Payment successful.
        </motion.div>
      )}
      {error && (
        <motion.div className="alert alert-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.div>
      )}

      <div className="payment-grid">
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3>Pay order</h3>
          <form onSubmit={handlePay} className="payment-form">
            <div className="form-group">
              <label>Order ID</label>
              <input
                type="number"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. 5"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Processing...' : 'Pay'}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3>View bill</h3>
          <form onSubmit={handleGetBill} className="payment-form">
            <div className="form-group">
              <label>Order ID</label>
              <input
                type="number"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. 5"
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-block">
              Get bill
            </button>
          </form>
          {bill && (
            <motion.div
              className="bill-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4>Order #{billOrderId}</h4>
              <table className="bill-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.map((row, i) => (
                    <tr key={i}>
                      <td>{row.name}</td>
                      <td>{row.quantity}</td>
                      <td>${Number(row.price).toFixed(2)}</td>
                      <td>${(row.quantity * (row.price || 0)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="bill-total">Total: ${billTotal.toFixed(2)}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
