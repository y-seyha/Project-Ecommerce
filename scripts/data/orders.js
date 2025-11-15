export let orders = [
  {
    orderNumber: "FF-123456",
    orderDate: "2025-11-15",
    status: "Processing",
    items: [
      { name: "Acqua di Gio Profondo", price: 98, quantity: 2 },
      { name: "Chanel No.5", price: 60, quantity: 1 },
    ],
  },
];

export function calculateOrderTotal() {
  orders.forEach((order) => {
    order.total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  });
}
