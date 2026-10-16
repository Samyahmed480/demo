/**
 * كفو (Kafu) - إدارة الحالة والمتجر المحلي (LocalStorage Store)
 */

const KafuStore = {
  // مفاتيح التخزين
  KEYS: {
    CART: 'kafu_cart_items',
    CAR: 'kafu_selected_car',
    FAVORITES: 'kafu_favorites',
    ADDRESSES: 'kafu_addresses',
    ORDERS: 'kafu_orders',
    WALLET: 'kafu_wallet_balance',
    USER: 'kafu_user_profile',
    USE_HINDI_NUMS: 'kafu_use_hindi_nums'
  },

  // تهيئة البيانات الأولية المطابقة للقطة الشاشة
  init() {
    // 1. السلة الأولية (3 قطع من طقم مكبس محرك كامل = 1,440 ر.س + ضريبة 216 = 1,656 ر.س)
    if (!localStorage.getItem(this.KEYS.CART)) {
      const initialCart = [
        {
          id: 'prod-1',
          name: 'طقم مكبس محرك كامل',
          seller: 'متجر كفو للقطع',
          price: 480,
          quantity: 3,
          image: PartGraphics.piston
        }
      ];
      localStorage.setItem(this.KEYS.CART, JSON.stringify(initialCart));
    }

    // 2. السيارة المحددة افتراضياً (مطابقة للقطة الشاشة: Toyota Camry 2025)
    if (!localStorage.getItem(this.KEYS.CAR)) {
      const defaultCar = {
        make: 'تويوتا',
        model: 'كامري',
        year: '2025',
        displayName: 'Toyota Camry 2025'
      };
      localStorage.setItem(this.KEYS.CAR, JSON.stringify(defaultCar));
    }

    // 3. العناوين المحفوظة
    if (!localStorage.getItem(this.KEYS.ADDRESSES)) {
      const defaultAddresses = [
        {
          id: 'addr-1',
          tag: 'المنزل',
          fullName: 'عميل كفو',
          phone: '0501234567',
          city: 'الرياض',
          district: 'حي الياسمين',
          street: 'شارع أنس بن مالك، مبنى 14',
          isDefault: true
        }
      ];
      localStorage.setItem(this.KEYS.ADDRESSES, JSON.stringify(defaultAddresses));
    }

    // 4. المحفظة
    if (!localStorage.getItem(this.KEYS.WALLET)) {
      localStorage.setItem(this.KEYS.WALLET, '2500');
    }

    // 5. الأرقام الهندية (١٢٣)
    if (localStorage.getItem(this.KEYS.USE_HINDI_NUMS) === null) {
      localStorage.setItem(this.KEYS.USE_HINDI_NUMS, 'true');
    }
  },

  formatNumber(num) {
    const useHindi = localStorage.getItem(this.KEYS.USE_HINDI_NUMS) !== 'false';
    const formatted = Number(num).toLocaleString('en-US');
    if (!useHindi) return formatted;
    
    const hindiDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return formatted.replace(/[0-9]/g, w => hindiDigits[+w]).replace(/,/g, '٬');
  },

  formatPrice(amount) {
    return `${this.formatNumber(amount)} ر.س`;
  },

  getCart() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.CART)) || [];
    } catch {
      return [];
    }
  },

  saveCart(items) {
    localStorage.setItem(this.KEYS.CART, JSON.stringify(items));
    this.emitChange('cart', items);
  },

  getCartCount() {
    const items = this.getCart();
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  getCartTotals() {
    const items = this.getCart();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = Math.round(subtotal * 0.15);
    const total = subtotal + vat;
    return { subtotal, vat, total };
  },

  addToCart(product, quantity = 1) {
    let items = this.getCart();
    const existingIndex = items.findIndex(i => i.id === product.id);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        seller: product.seller || 'متجر كفو للقطع',
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }

    this.saveCart(items);
    return items;
  },

  updateQuantity(productId, delta) {
    let items = this.getCart();
    const item = items.find(i => i.id === productId);
    if (!item) return items;

    item.quantity += delta;
    if (item.quantity <= 0) {
      items = items.filter(i => i.id !== productId);
    }

    this.saveCart(items);
    return items;
  },

  removeFromCart(productId) {
    let items = this.getCart();
    items = items.filter(i => i.id !== productId);
    this.saveCart(items);
    return items;
  },

  clearCart() {
    this.saveCart([]);
  },

  getSelectedCar() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.CAR));
    } catch {
      return null;
    }
  },

  setSelectedCar(car) {
    car.displayName = `${car.make === 'تويوتا' ? 'Toyota' : car.make} ${car.model === 'كامري' ? 'Camry' : car.model} ${car.year}`;
    localStorage.setItem(this.KEYS.CAR, JSON.stringify(car));
    this.emitChange('car', car);
  },

  clearSelectedCar() {
    localStorage.removeItem(this.KEYS.CAR);
    this.emitChange('car', null);
  },

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.FAVORITES)) || [];
    } catch {
      return [];
    }
  },

  isFavorite(productId) {
    return this.getFavorites().includes(productId);
  },

  toggleFavorite(productId) {
    let favs = this.getFavorites();
    const index = favs.indexOf(productId);
    if (index > -1) {
      favs.splice(index, 1);
    } else {
      favs.push(productId);
    }
    localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favs));
    this.emitChange('favorites', favs);
    return favs.includes(productId);
  },

  getAddresses() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.ADDRESSES)) || [];
    } catch {
      return [];
    }
  },

  addAddress(address) {
    let list = this.getAddresses();
    if (address.isDefault) {
      list.forEach(a => a.isDefault = false);
    }
    address.id = 'addr-' + Date.now();
    list.push(address);
    localStorage.setItem(this.KEYS.ADDRESSES, JSON.stringify(list));
    this.emitChange('addresses', list);
    return address;
  },

  deleteAddress(id) {
    let list = this.getAddresses().filter(a => a.id !== id);
    localStorage.setItem(this.KEYS.ADDRESSES, JSON.stringify(list));
    this.emitChange('addresses', list);
    return list;
  },

  getOrders() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.ORDERS)) || [];
    } catch {
      return [];
    }
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const newOrder = {
      id: 'KAFU-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'قيد التجهيز',
      items: [...this.getCart()],
      totals: this.getCartTotals(),
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod
    };
    orders.unshift(newOrder);
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
    this.clearCart();
    this.emitChange('orders', orders);
    return newOrder;
  },

  getWalletBalance() {
    return parseFloat(localStorage.getItem(this.KEYS.WALLET) || '0');
  },

  emitChange(key, data) {
    window.dispatchEvent(new CustomEvent('kafu_store_update', {
      detail: { key, data }
    }));
  }
};

KafuStore.init();
