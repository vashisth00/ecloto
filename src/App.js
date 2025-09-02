import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  const [cart, setCart] = useState([]);
  const [showGiftMessage, setShowGiftMessage] = useState(false);

  const cartSubtotal = cart
    .filter((item) => item.id !== FREE_GIFT.id)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const amountNeeded = Math.max(THRESHOLD - cartSubtotal, 0);

  useEffect(() => {
    const hasFreeGift = cart.some((item) => item.id === FREE_GIFT.id);

    if (cartSubtotal > THRESHOLD && !hasFreeGift) {
      setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
      setShowGiftMessage(true);
      setTimeout(() => setShowGiftMessage(false), 3500);
    } else if (cartSubtotal < THRESHOLD && hasFreeGift) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== FREE_GIFT.id)
      );
    }
  }, [cartSubtotal]);

  const addToCart = (product) => {};

  const updateCartQuantity = (productId, delta) => {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shopping Cart
        </h1>

        <div className="mb-8">
          <h2>Products</h2>
          <div>
            {PRODUCTS.map((product) => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Cart Summary</h2>
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          {" "}
          <span>Subtotal :</span>
          <span className="font-semibold">{cartSubtotal}</span>
        </div>

        {amountNeeded > 0 ? (
          <div>Add {amountNeeded}for free wireless mouse </div>
        ) : (
          showGiftMessage && <div> You get free wireless mouse </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">CArt items</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>
                    {item.id === FREE_GIFT.id && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        FREE GIFT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
