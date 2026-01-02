
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, GraduationCap, ShieldCheck, Zap } from 'lucide-react';
import { AREAS } from '../mockData';

const Feature = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-500 text-sm text-center leading-relaxed">{desc}</p>
  </div>
);

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50 -skew-x-12 translate-x-1/2 opacity-50 hidden lg:block" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block py-1 px-3 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                Dhaka's #1 Student Housing Platform
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Find Your Perfect <br />
                <span className="text-indigo-600">Student Basha</span>
              </h1>
              <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto lg:mx-0">
                Stop wandering around Dhaka looking for To-Let signs. Find affordable rooms, 
                sublets, and mess seats near your university in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/explore" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100">
                  <Search size={20} />
                  Start Searching
                </Link>
                <Link to="/create" className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-indigo-200 transition-all flex items-center justify-center gap-2">
                  <Zap size={20} className="text-amber-400" />
                  List Your Room
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://picsum.photos/id/${i+10}/100/100`} alt="user" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  Joined by <span className="font-bold text-gray-900">2,000+</span> Dhaka students
                </p>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative z-10 w-full max-w-lg mx-auto">
                <img 
                  src="https://picsum.photos/id/122/800/800" 
                  alt="Student life in Dhaka" 
                  className="rounded-3xl shadow-2xl border-4 border-white"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-50">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg"><MapPin /></div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Trending Now</p>
                    <p className="font-bold">Dhanmondi, Rd 15</p>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-indigo-600 text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-2xl font-black">৳4,500</p>
                  <p className="text-xs opacity-80">Lowest Seat Rate</p>
                </div>
              </div>
              {/* Background dots / decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Search by Area</h2>
            <p className="text-gray-500">Popular hubs for students in Dhaka city</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {AREAS.map(area => (
              <Link key={area} to={`/explore?area=${area}`} className="group bg-white p-4 rounded-xl border border-gray-200 text-center hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all">
                <MapPin size={20} className="mx-auto mb-2 text-indigo-500 group-hover:text-indigo-100" />
                <span className="font-semibold">{area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              icon={GraduationCap} 
              title="Near Universities" 
              desc="We calculate the exact distance to top institutions like DU, NSU, BRACU, and more."
            />
            <Feature 
              icon={ShieldCheck} 
              title="Verified Owners" 
              desc="We manually verify homeowners to ensure you stay in a safe and trustworthy environment."
            />
            <Feature 
              icon={Zap} 
              title="Instant Contact" 
              desc="No middleman. Call or WhatsApp the homeowner directly from the room details page."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
