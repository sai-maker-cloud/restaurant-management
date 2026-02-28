import { Outlet, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/menu', label: 'Menu' },
  { to: '/orders', label: 'Orders' },
  { to: '/payment', label: 'Payment' },
];

const adminItems = [
  { to: '/inventory', label: 'Inventory' },
  { to: '/daily-sales', label: 'Daily Sales' },
];

export default function Layout() {
  const { logout, isAdmin } = useAuth();

  return (
    <div className="layout">
      <motion.header
        className="header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <NavLink to="/menu" className="logo">
          <motion.span
            className="logo-icon"
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            🍽
          </motion.span>
          <span className="logo-text">Restaurant</span>
        </NavLink>
        <nav className="nav">
          {navItems.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
          {isAdmin &&
            adminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link admin ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
        <motion.button
          type="button"
          className="btn btn-ghost"
          onClick={logout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Logout
        </motion.button>
      </motion.header>
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
