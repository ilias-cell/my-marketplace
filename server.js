const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Mock данные товаров
const products = [
  {
    id: 1,
    name: "Смартфон Xiaomi",
    price: "15 000 ₸",
    category: "Электроника",
    image: "📱",
    description: "Новый смартфон с отличной камерой"
  },
  {
    id: 2,
    name: "Ноутбук Dell",
    price: "250 000 ₸",
    category: "Электроника",
    image: "💻",
    description: "Мощный ноутбук для работы"
  },
  {
    id: 3,
    name: "Кроссовки Nike",
    price: "25 000 ₸",
    category: "Одежда",
    image: "👟",
    description: "Спортивные кроссовки"
  },
  {
    id: 4,
    name: "Кофеварка",
    price: "18 000 ₸",
    category: "Техника",
    image: "☕",
    description: "Автоматическая кофеварка"
  }
];

// Маршруты API
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Товар не найден' });
  res.json(product);
});

// Главный маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`👉 Откройте: http://localhost:${PORT}`);
});