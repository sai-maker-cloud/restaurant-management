const API_BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as object),
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch (err) {
    throw new Error('Cannot reach server. Is the backend running on port 5000?');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || data.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

export const authApi = {
  login: (email: string, password: string) =>
    api<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (name: string, email: string, password: string, roll?: string) =>
    api<{ id: number; name: string; email: string; roll: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, roll: roll || 'staff' }),
    }),
};

export const menuApi = {
  getAll: () => api<MenuItem[]>('/menu/'),
  add: (name: string, price: number, category: string, image?: string) =>
    api<MenuItem>('/menu/add', {
      method: 'POST',
      body: JSON.stringify({ name, price, category, image: image || null }),
    }),
  delete: (id: number) =>
    api<{ message: string }>(`/menu/${id}`, { method: 'DELETE' }),
};

export const ordersApi = {
  place: (items: { menu_id: number; quantity: number }[]) =>
    api<{ message: string; order_id: number }>('/orders', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),
  getBill: (id: number) =>
    api<BillItem[]>(`/orders/bill/${id}`),
  dailySales: () =>
    api<{ total_sales: number | null }>('/orders/daily-sales'),
};

export const inventoryApi = {
  getAll: () => api<InventoryItem[]>('/inventory/'),
  add: (item_name: string, quantity: number, unit: string) =>
    api<InventoryItem>('/inventory', {
      method: 'POST',
      body: JSON.stringify({ item_name, quantity, unit }),
    }),
  update: (id: number, quantity: number) =>
    api<InventoryItem>(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
};

export const paymentApi = {
  pay: (order_id: number) =>
    api<{ message: string }>('/payment/pay', {
      method: 'POST',
      body: JSON.stringify({ order_id }),
    }),
};

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string | null;
}

export interface BillItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InventoryItem {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
}
