import { useState } from 'react';
import { Heart, Loader2, CheckCircle, CreditCard, Building, Mail, User } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';


interface DonationProps {
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
}

export default function Donation({ showSuccess, setShowSuccess }: DonationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: ''
  });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const presetAmounts = [500, 1000, 2500, 5000];

  const handlePresetAmount = (amount: number) => {
    setSelectedAmount(amount);
    setFormData({ ...formData, amount: amount.toString() });
  };

  const handleCustomAmount = (value: string) => {
    setSelectedAmount(null);
    setFormData({ ...formData, amount: value });
  };

  const generateTransactionRef = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `TXN-${timestamp}-${random}`;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid donation amount');
      return false;
    }

    if (amount < 100) {
      setError('Minimum donation amount is 100');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const transactionRef = generateTransactionRef();

      await addDoc(collection(db, 'donations'), {
        donor_name: formData.name,
        donor_email: formData.email,
        amount: parseFloat(formData.amount),
        transaction_reference: transactionRef,
        status: 'completed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setShowSuccess(true);
      setFormData({ name: '', email: '', amount: '' });
      setSelectedAmount(null);

      setTimeout(() => {
        setShowSuccess(false);
      }, 8000);

    } catch (err) {
      console.error('Donation error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donation" className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
            Make a Difference
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Support Our Cause
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your generosity provides food, clothing, and hope to families in need this Ramzan
          </p>
        </div>

        {showSuccess ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Thank You for Your Generosity!</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Your donation has been received successfully. May your kindness be rewarded manifold.
            </p>
            <div className="pt-6">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-semibold hover:shadow-xl transition-all"
              >
                Make Another Donation
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Donation Details</h3>
                  <p className="text-emerald-100 mt-1">Test Mode - Demo Payment Processing</p>
                </div>
                <Heart className="w-12 h-12 opacity-80" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="block">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </label>

                <label className="block">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CreditCard className="w-4 h-4" />
                  Select or Enter Amount (PKR)
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePresetAmount(amount)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        selectedAmount === amount
                          ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-lg font-semibold"
                  placeholder="Or enter custom amount"
                  min="100"
                />
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-semibold">
                  <Building className="w-5 h-5" />
                  Bank Account Details
                </div>
                <div className="text-sm text-blue-800">
                  <p><span className="font-semibold">Bank:</span> ABC National Bank</p>
                  <p><span className="font-semibold">Account:</span> 1234-5678-9012</p>
                  <p className="text-xs text-blue-600 mt-2">
                    This is a demo account for testing purposes
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-800">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-6 h-6" />
                    Donate Now
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                Your donation is secure and will be used responsibly for humanitarian efforts
              </p>
            </form>
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-3xl font-bold text-emerald-600 mb-2">100%</p>
            <p className="text-gray-600">Secure Transactions</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-3xl font-bold text-blue-600 mb-2">95%</p>
            <p className="text-gray-600">Goes to Programs</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-3xl font-bold text-teal-600 mb-2">24/7</p>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
