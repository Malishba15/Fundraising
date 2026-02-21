import { Heart } from 'lucide-react';
import vol1 from '../v1.jpg';
import vol2 from '../v2.jpg';
import vol3 from '../v3.jpg';
import vol4 from '../v4.jpg';
interface JoinUsProps {
  onVolunteerClick: () => void;
}

export default function JoinUs({ onVolunteerClick }: JoinUsProps) {
  return (
   
    <section className="relative py-32 px-4 bg-emerald-50 overflow-hidden">
      
     
      <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl hidden md:block animate-pulse">
        <img src={vol1} alt="Volunteer" className="w-full h-full object-cover" />
      </div>
      
    
      <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl hidden lg:block">
        <img src={vol2} alt="Helping hands" className="w-full h-full object-cover" />
      </div>

     
      <div className="absolute top-20 right-[15%] w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl hidden md:block">
        <img src={vol3} alt="Community" className="w-full h-full object-cover" />
      </div>

    
      <div className="absolute bottom-10 right-[5%] w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl hidden lg:block">
        <img src={vol4} alt="Smiles" className="w-full h-full object-cover" />
      </div>

      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
        
        <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
          Take Action
        </div>

        
        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
          Join Us In Making <br /> A Difference
        </h2>

        <div className="flex flex-col items-center justify-center space-y-6 pt-4">
          
          <button 
            onClick={onVolunteerClick}
            className="group px-12 py-5 bg-emerald-600 text-white rounded-full font-bold text-sm tracking-widest hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
          >
            <Heart size={18} className="group-hover:fill-white transition-all" />
            VOLUNTEER NOW
          </button>

         
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Be the hands that serve and the hearts that give. Join our growing community of volunteers in Lahore this Ramzan to help distribute meals and bring hope to those who need it most.
          </p>
        </div>
      </div>
    </section>
  );
}