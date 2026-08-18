import { useState } from 'react';
import { Heart, Loader2, CheckCircle, Building, Mail, User, Utensils, Package, ClipboardCheck, UserPlus, GraduationCap, Badge, Phone, Coins } from 'lucide-react';
import qr from '../qr.jpg';
interface DonationProps {
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
  activeTab: 'donate' | 'volunteer';
  setActiveTab: (tab: 'donate' | 'volunteer') => void;
}

export default function Donation({ showSuccess, setShowSuccess, activeTab, setActiveTab }: DonationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    donationType: '',
    amount: '',
    note: '',
    age: '',
    institution: '',
    phone: '',
    cnic: '',
    designation: 'student'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const DONATION_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_DONATION_URL as string | undefined;
  const VOLUNTEER_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_VOLUNTEER_URL as string | undefined;

  const buildGoogleFormUrl = (baseUrl: string, data: typeof formData) => {
    const tokens: Record<string, string> = {
      '{{name}}': data.name,
      '{{email}}': data.email,
      '{{donationType}}': data.donationType,
      '{{amount}}': data.amount,
      '{{note}}': data.note,
      '{{phone}}': data.phone,
      '{{cnic}}': data.cnic,
      '{{age}}': data.age,
      '{{institution}}': data.institution,
      '{{designation}}': data.designation,
    };

    let finalUrl = baseUrl;
    Object.entries(tokens).forEach(([token, value]) => {
      const safeValue = encodeURIComponent(value || '');
      finalUrl = finalUrl.split(token).join(safeValue);
    });

    return finalUrl;
  };

  const donationCategories = [
    { id: 'ration', label: 'Ration Bag', icon: <Package className="w-5 h-5" />, price: 5000 },
    { id: 'meal', label: 'Per Meal', icon: <Utensils className="w-5 h-5" />, price: 300 },
    { id: 'daig', label: 'Daig', icon: <Heart className="w-5 h-5" />, price: 15000 },
    { id: 'Open Donation', label: 'Open Donation', icon: <Coins className="w-5 h-5" />, price: null },
  ];

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, ''); 
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)}-${digits.slice(4, 11)}`; 
  };

  const formatCNIC = (value: string) => {
    const digits = value.replace(/\D/g, ''); 
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`; 
  };

  const handleCategorySelect = (category: string, price: number | null) => {
    setFormData({ 
      ...formData, 
      donationType: category, 
      amount: price ? price.toString() : '' 
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProofImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'donate') {
        if (!formData.name || !formData.donationType) {
          throw new Error('Please fill all required donation fields.');
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
          throw new Error('Please enter a valid donation amount.');
        }
      } else {
        if (!formData.name || !formData.email || !formData.cnic || !formData.phone || !formData.age || !formData.institution) {
          throw new Error('Please fill out all volunteer fields.');
        }

        if (parseInt(formData.age) <= 13) {
          throw new Error('You must be above 13 years old to volunteer.');
        }

        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        if (!cnicRegex.test(formData.cnic)) {
          throw new Error('Please provide a complete 13-digit CNIC.');
        }

        const phoneRegex = /^03\d{2}-\d{7}$/;
        if (!phoneRegex.test(formData.phone)) {
          throw new Error('Please provide a valid Pakistani phone number (e.g., 0300-1234567).');
        }
      }

      const formUrl = activeTab === 'donate' ? DONATION_FORM_URL : VOLUNTEER_FORM_URL;

      if (!formUrl) {
        throw new Error('Google Form URL is missing. Add VITE_GOOGLE_FORM_DONATION_URL or VITE_GOOGLE_FORM_VOLUNTEER_URL to your environment variables.');
      }

      const finalFormUrl = buildGoogleFormUrl(formUrl, formData);
      window.open(finalFormUrl, '_blank', 'noopener,noreferrer');
      setShowSuccess(true);
      setFormData({ name: '', email: '', donationType: '', amount: '', note: '', age: '', institution: '', phone: '', cnic: '', designation: 'student' });
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donation" className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex w-full max-w-[400px] shadow-inner border border-gray-200">
            <button 
              onClick={() => { setActiveTab('donate'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'donate' ? 'bg-white text-emerald-600 shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Heart size={18} /> Donate
            </button>
            <button 
              onClick={() => { setActiveTab('volunteer'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'volunteer' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <UserPlus size={18} /> Volunteer
            </button>
          </div>
        </div>

        {showSuccess ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-6 animate-in fade-in duration-500">
            <CheckCircle className={`w-16 h-16 mx-auto ${activeTab === 'donate' ? 'text-emerald-500' : 'text-blue-500'}`} />
            <h3 className="text-3xl font-bold">Success!</h3>
            <p className="text-gray-600">
              {activeTab === 'donate'
                ? 'Your donation form is ready in Google Forms. Please complete it there to save the record.'
                : 'Your volunteer form is ready in Google Forms. Please complete it there to save the record.'}
            </p>
            <button onClick={() => setShowSuccess(false)} className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold">Close</button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className={`p-6 text-white flex justify-between items-center transition-colors duration-500 ${activeTab === 'donate' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
              <div>
                <h3 className="text-2xl font-bold">{activeTab === 'donate' ? 'Complete Your Donation' : 'Become a Volunteer'}</h3>
                <p className="text-white/80 text-sm">Fill in the details below to proceed</p>
              </div>
              {activeTab === 'donate' ? <Heart size={40} className="opacity-50" /> : <UserPlus size={40} className="opacity-50" />}
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><User className="w-4 h-4"/> Name</label>
                  <input type="text" className="w-full p-3 border rounded-xl outline-none focus:border-gray-400" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><Mail className="w-4 h-4"/> Email</label>
                  <input type="email" className="w-full p-3 border rounded-xl outline-none focus:border-gray-400" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              {activeTab === 'donate' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><ClipboardCheck className="w-4 h-4"/> Select Package</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {donationCategories.map((cat) => (
                        <button key={cat.id} type="button" onClick={() => handleCategorySelect(cat.label, cat.price)} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.donationType === cat.label ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' : 'border-gray-100 hover:border-emerald-200'}`}>
                          {cat.icon} <span className="text-sm font-bold text-center leading-tight">{cat.label}</span>
                          <span className="text-xs font-medium opacity-70">
                            {cat.price ? `Rs. ${cat.price.toLocaleString()}` : 'Any Amount'}
                          </span>
                        </button>
                      ))}
                    </div>

                    {formData.donationType === 'Open Donation' && (
                      <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                        <label className="text-sm font-bold text-gray-700 block mb-2">Enter Custom Amount (Rs.)</label>
                        <input 
                          type="number" 
                          min="100"
                          placeholder="e.g. 1000" 
                          className="w-full p-4 border-2 border-emerald-200 rounded-xl outline-none focus:border-emerald-500 font-bold text-lg text-emerald-900 bg-emerald-50"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  {/* Bank Details & QR Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                    <div className="space-y-3 min-w-0">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2"><Building className="w-4 h-4" /> Bank Details</h4>
                      <div className="text-sm space-y-2 text-slate-600 bg-white p-4 rounded-lg border border-slate-100 shadow-sm min-w-0">
                        <p className="flex justify-between"><span>NayaPay</span> <span className="font-bold text-slate-900"></span></p>
                        <p className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                          <span>IBAN:</span>
                          <span className="font-bold text-slate-900 break-all">PK44NAYA1234503004721155</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                      <div className="bg-white p-2 rounded-xl shadow-md border border-slate-200 w-full max-w-[160px]">
                        <img 
                          src={qr}
                          alt="Donation QR Code" 
                          className="w-full aspect-square object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-[10px] mt-2 font-bold text-slate-400 tracking-widest uppercase">Scan to Pay</span>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'volunteer' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><Phone size={14}/> Phone Number</label>
                      <input 
                        type="text" 
                        placeholder="03xx-xxxxxxx" 
                        className="w-full p-3 border rounded-xl" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: formatPhone(e.target.value)})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><Badge size={14}/> CNIC</label>
                      <input 
                        type="text" 
                        placeholder="xxxxx-xxxxxxx-x" 
                        className="w-full p-3 border rounded-xl" 
                        value={formData.cnic} 
                        onChange={(e) => setFormData({...formData, cnic: formatCNIC(e.target.value)})} 
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><GraduationCap size={14}/> Age & Institution</label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          min="14" 
                          placeholder="Age" 
                          className="w-20 p-3 border rounded-xl" 
                          value={formData.age} 
                          onChange={(e) => setFormData({...formData, age: e.target.value})} 
                        />
                        <input type="text" placeholder="Institution" className="flex-1 p-3 border rounded-xl" value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Designation</label>
                      <select className="w-full p-3 border rounded-xl bg-white" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})}>
                        <option value="student">Student</option>
                        <option value="professional">Professional</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

              <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${activeTab === 'donate' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}>
                {loading ? <Loader2 className="animate-spin" /> : activeTab === 'donate' ? <Heart /> : <UserPlus />}
                {activeTab === 'donate' ? 'Confirm Donation' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}