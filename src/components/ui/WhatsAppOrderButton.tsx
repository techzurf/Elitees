import React from 'react';
import { MessageCircle } from 'lucide-react';
import { storeConfig } from '../../config/store';
import { CartItem } from '../../types';

interface WhatsAppOrderButtonProps {
  items: CartItem[];
  customerDetails?: {
    name: string;
    mobile: string;
    email?: string;
  };
  deliveryAddress?: {
    address: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    instructions?: string;
  };
  subtotal: number;
  deliveryCharge: number;
  total: number;
  className?: string;
  label?: string;
  fullWidth?: boolean;
}

export const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  items,
  customerDetails,
  deliveryAddress,
  subtotal,
  deliveryCharge,
  total,
  className = '',
  label = 'Place Order on WhatsApp',
  fullWidth = false,
}) => {
  const handleOrder = () => {
    let message = `Hello, I would like to place an order.\n\n*Order Items:*\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} × ${item.quantity} — ${storeConfig.currency}${item.product.price * item.quantity}\n`;
    });

    message += `\n*Subtotal:* ${storeConfig.currency}${subtotal}`;
    message += `\n*Delivery:* ${storeConfig.currency}${deliveryCharge}`;
    message += `\n*Total:* ${storeConfig.currency}${total}\n\n`;

    if (customerDetails) {
      message += `*Customer Details:*\n`;
      message += `Name: ${customerDetails.name}\n`;
      message += `Mobile: ${customerDetails.mobile}\n`;
      if (customerDetails.email) {
        message += `Email: ${customerDetails.email}\n`;
      }
      message += `\n`;
    }

    if (deliveryAddress) {
      message += `*Delivery Address:*\n`;
      message += `${deliveryAddress.address}, ${deliveryAddress.area}\n`;
      message += `${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}\n`;
      if (deliveryAddress.instructions) {
        message += `Instructions: ${deliveryAddress.instructions}\n`;
      }
      message += `\n`;
    }

    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleOrder}
      className={`bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      {label}
    </button>
  );
};
