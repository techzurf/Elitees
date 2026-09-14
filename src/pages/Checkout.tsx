import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, MapPin, CheckCircle, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { storeConfig } from '../config/store';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useStore();
  
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form State
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });

  const [address, setAddress] = useState({
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    instructions: ''
  });

  const subtotal = cartTotal;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isCustomerValid = customer.firstName && customer.lastName && customer.mobile.length >= 10;
  const isAddressValid = address.street && address.area && address.city && address.state && address.pincode;

  const handlePlaceOrder = () => {
    if (!isCustomerValid || !isAddressValid) {
      alert("Please fill in all required fields.");
      return;
    }

    const generatedOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Generate WhatsApp message
    let message = `Hello, I would like to place an order.\n\n*Order ID:* ${generatedOrderId}\n\n*Order Items:*\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} × ${item.quantity} — ${storeConfig.currency}${item.product.price * item.quantity}\n`;
    });

    message += `\n*Subtotal:* ${storeConfig.currency}${subtotal}`;
    message += `\n*Delivery:* ${storeConfig.currency}${shipping}`;
    message += `\n*Total:* ${storeConfig.currency}${total}\n\n`;

    message += `*Customer Details:*\n`;
    message += `Name: ${customer.firstName} ${customer.lastName}\n`;
    message += `Mobile: ${customer.mobile}\n`;
    if (customer.email) {
      message += `Email: ${customer.email}\n`;
    }
    message += `\n`;

    message += `*Delivery Address:*\n`;
    message += `${address.street}, ${address.area}\n`;
    message += `${address.city}, ${address.state} - ${address.pincode}\n`;
    if (address.instructions) {
      message += `Instructions: ${address.instructions}\n`;
    }
    message += `\nPlease confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setOrderId(generatedOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="bg-gray-50 min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Request Sent!</h1>
        <p className="text-gray-600 mb-2">Thank you for shopping with {storeConfig.storeName}.</p>
        <p className="text-gray-600 mb-8">Your order reference number is <span className="font-bold text-blue-900">#{orderId}</span>. We will confirm your order on WhatsApp shortly.</p>
        
        <div className="flex gap-4">
          <Link to="/account/orders" className="bg-blue-900 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-800 transition-colors">
            View Orders
          </Link>
          <Link to="/" className="bg-white text-blue-900 border border-blue-900 font-bold px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Main Checkout Flow */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Step 1: Customer Information */}
            <div className={`bg-white rounded-xl shadow-sm border ${step === 1 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}>
              <div 
                className="p-5 md:p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setStep(1)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > 1 ? 'bg-green-500 text-white' : 'bg-blue-900 text-white'}`}>
                    {step > 1 ? <Check size={16} /> : '1'}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Customer Information</h2>
                </div>
                {step > 1 && <span className="text-sm font-medium text-blue-600 hover:underline">Edit</span>}
              </div>

              {step === 1 && (
                <div className="p-5 md:p-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input name="firstName" value={customer.firstName} onChange={handleCustomerChange} type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input name="lastName" value={customer.lastName} onChange={handleCustomerChange} type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (WhatsApp) *</label>
                      <input name="mobile" value={customer.mobile} onChange={handleCustomerChange} type="tel" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                      <input name="email" value={customer.email} onChange={handleCustomerChange} type="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (isCustomerValid) setStep(2);
                      else alert("Please fill all required customer fields.");
                    }}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-md transition-colors disabled:opacity-50"
                    disabled={!isCustomerValid}
                  >
                    Continue to Delivery
                  </button>
                </div>
              )}
              {step > 1 && (
                <div className="px-6 pb-6 pt-0 ml-12 text-sm text-gray-600">
                  <p>{customer.firstName} {customer.lastName}</p>
                  <p>{customer.mobile}</p>
                  {customer.email && <p>{customer.email}</p>}
                </div>
              )}
            </div>

            {/* Step 2: Delivery Address */}
            <div className={`bg-white rounded-xl shadow-sm border ${step === 2 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}>
              <div 
                className={`p-5 md:p-6 flex items-center justify-between ${step >= 2 ? 'cursor-pointer' : 'opacity-50'}`}
                onClick={() => step >= 2 && setStep(2)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > 2 ? 'bg-green-500 text-white' : step === 2 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > 2 ? <Check size={16} /> : '2'}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
                </div>
              </div>

              {step === 2 && (
                <div className="p-5 md:p-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                      <input name="street" value={address.street} onChange={handleAddressChange} type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area / Landmark *</label>
                      <input name="area" value={address.area} onChange={handleAddressChange} type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input name="city" value={address.city} onChange={handleAddressChange} type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input name="state" value={address.state} onChange={handleAddressChange} type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                      <input name="pincode" value={address.pincode} onChange={handleAddressChange} type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions (Optional)</label>
                      <textarea name="instructions" value={address.instructions} onChange={handleAddressChange} rows={2} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={!isAddressValid}
                    className="w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle size={20} />
                    Place Order on WhatsApp
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3 order-first lg:order-last">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, index) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded border border-gray-100 bg-gray-50 p-1 flex-shrink-0 relative">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">{item.product.name}</h4>
                      <p className="text-sm font-bold text-gray-900 mt-1">₹{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">₹{shipping}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 bg-gray-50 -mx-6 px-6 pb-2 rounded-b-xl">
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-900">₹{total}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
