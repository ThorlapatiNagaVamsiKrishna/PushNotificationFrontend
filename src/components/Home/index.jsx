import { useState, useEffect } from 'react';
import { messaging, getAccessToken } from '../notifications/firebaseConfig'
import Cookie from 'js-cookie'
// import { onMessage } from 'firebase/messaging';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [ user, setUser ] = useState('')

  const getProducts = async () => {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    setProducts(data.products)
  }

  const storeFcmToken = async (user) => {
    const fcmToken = await getAccessToken();
    const payload = {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({user: user.userId, fcmToken})
    }
    const response = await fetch('https://pushnotificationbackend-2.onrender.com/send/fcm', payload)
    const data = response.json()
  } 

  useEffect(() => {
     const getUser = Cookie.get('user');
        if (getUser) {
            const user = JSON.parse(getUser)
            setUser(JSON.parse(getUser))
            storeFcmToken(user)
      }
    getAccessToken();
    getProducts()
  }, []);

  const handleFcmToken = async (product) => {
    const res = await fetch('https://pushnotificationbackend-2.onrender.com/send/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user.userId,
        title: product.title,
      }),
    });
    const data = await res.json();
    toast.success(`🛒 ${product.title} added to cart!`);
  };

  return (
    <div className='flex flex-wrap justify-center'>
      <ToastContainer />
      {products.map((product) => (
        <div key={product.id} className="max-w-xs border-amber-50 rounded shadow bg-white m-2 p-4 cursor-pointer">
          <img src={product.thumbnail} className="h-48 w-full object-cover" alt={product.title} />
          <h3 className="font-bold">{product.title}</h3>
          <p>{product.description}</p>
          <button className="mt-2 w-full bg-blue-500 text-white p-2 rounded" onClick={() => handleFcmToken(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
