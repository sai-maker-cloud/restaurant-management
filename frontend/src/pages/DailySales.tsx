import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ordersApi } from '../api/client';

export default function DailySales() {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    ordersApi
      .dailySales()
      .then((data) => setTotal(data.total_sales ?? 0))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Daily sales
      </motion.h1>

      {error && (
        <motion.div className="alert alert-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      ) : (
        <motion.div
          className="daily-sales-card card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="daily-sales-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            📊
          </motion.span>
          <h2>Today&apos;s sales</h2>
          <p className="daily-sales-amount">
            ${typeof total === 'number' ? total.toFixed(2) : '0.00'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
