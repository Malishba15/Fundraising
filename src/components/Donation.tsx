import { useState, useRef } from 'react';
import { Heart, Loader2, CheckCircle, Building, Mail, User, Utensils, Package, Camera, ClipboardCheck, UserPlus, GraduationCap, Badge, Phone, Coins, X } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
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
    age: '',
    institution: '',
    phone: '',
    cnic: '',
    designation: 'student'
  });

  const [proofImage, setProofImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CLOUD_NAME = "dfn3u0zm8"; 
  const UPLOAD_PRESET = "donation_proofs"; 

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

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) throw new Error("Image upload failed");
    const result = await response.json();
    return result.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'donate') {
        if (!formData.name || !formData.donationType || !proofImage) {
          throw new Error('Please fill all fields and upload payment proof.');
        }
        
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
          throw new Error('Please enter a valid donation amount.');
        }

        const imageUrl = await uploadToCloudinary(proofImage);

        await addDoc(collection(db, 'donations'), {
          donor_name: formData.name,
          donor_email: formData.email,
          donation_item: formData.donationType,
          amount: parseFloat(formData.amount), 
          proof_url: imageUrl,
          status: 'pending',
          created_at: new Date().toISOString(),
        });
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

        await addDoc(collection(db, 'volunteers'), {
          volunteer_name: formData.name,
          volunteer_email: formData.email,
          age: parseInt(formData.age),
          institution: formData.institution,
          phone: formData.phone,
          cnic: formData.cnic,
          designation: formData.designation,
          status: 'applied',
          created_at: new Date().toISOString(),
        });
      }

      setShowSuccess(true);
      setFormData({ name: '', email: '', donationType: '', amount: '', age: '', institution: '', phone: '', cnic: '', designation: 'student' });
      setProofImage(null);
      setImagePreview(null);
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
              {activeTab === 'donate' ? 'Thank you for your donation. We will verify it shortly.' : 'Your volunteer application has been received.'}
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
                  <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2"><Building className="w-4 h-4" /> Bank Details</h4>
                      <div className="text-sm space-y-2 text-slate-600 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                        <p className="flex justify-between"><span>NayaPay</span> <span className="font-bold text-slate-900"></span></p>
                        <p  className="flex justify-between"><span>IBAN:</span> <span className="font-bold text-slate-900">PK44NAYA1234503004721155</span></p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0">
                      <div className="bg-white p-2 rounded-xl shadow-md border border-slate-200">
                        <img 
                          src={qr}
                          alt="Donation QR Code" 
                          className="w-28 h-28 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-[10px] mt-2 font-bold text-slate-400 tracking-widest uppercase">Scan to Pay</span>
                    </div>
                  </div>

                  {/* Payment Proof Upload */}
                  <div 
                    onClick={() => !imagePreview && fileInputRef.current?.click()} 
                    className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${imagePreview ? 'border-emerald-500 bg-white p-4' : 'border-gray-200 p-8 cursor-pointer hover:border-emerald-300'}`}
                  >
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                    
                    {imagePreview ? (
                      <div className="flex items-center gap-4">
                        <img src={imagePreview} alt="Proof" className="w-20 h-20 object-cover rounded-lg border border-emerald-100" />
                        <div className="flex-1">
                          <p className="text-emerald-700 font-bold text-sm">Proof Selected</p>
                          <p className="text-gray-500 text-xs">{proofImage?.name}</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); setImagePreview(null); setProofImage(null); }}
                          className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center gap-2">
                        <Camera size={32} /> 
                        <span className="text-sm font-medium text-gray-600">Upload Payment Screenshot</span>
                        <span className="text-xs">PNG, JPG up to 5MB</span>
                      </div>
                    )}
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