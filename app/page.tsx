import Link from 'next/link';

export const revalidate = 3600; // 1 hour

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-primary">HealthMate</h1>
        <div className="hidden md:flex space-x-8 text-slate-600 font-medium tracking-tight">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#security" className="hover:text-primary transition-colors">Security</a>
        </div>
        <div className="space-x-4">
          <Link href="/login" className="px-4 py-2 text-slate-600 hover:text-primary font-bold transition-colors">Login</Link>
          <Link href="/signup" className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/10 transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section: The Problem & Solution */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              HealthMate – Health ka <span className="text-primary italic">Smart Dost</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 mb-10 leading-relaxed font-medium">
              Family ki medical reports manage karna ab mushkil nahi. Jab doctor kahe <b>"Pichlay reports laao"</b>,
              toh WhatsApp ya purani files dhoondne ki zaroorat nahi.
              HealthMate mein sab mehfooz hai aur Gemini AI inhein asaan <b>Roman Urdu</b> mein explain karta hai.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link href="/signup" className="px-10 py-5 bg-primary text-white text-xl font-black rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-blue-800 transition-all transform hover:-translate-y-1">
                Start Your Health Vault
              </Link>
              <button className="px-10 py-5 bg-slate-50 text-slate-700 text-xl font-black rounded-2xl hover:bg-slate-100 transition-all border border-slate-200">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Feature Section: What Gemini Does */}
        <section id="features" className="bg-slate-50/50 py-24 border-y border-slate-100">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl md:text-4xl font-black text-center mb-16 text-slate-900 tracking-tight">Gemini AI ki Power</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Card 1 */}
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-slate-100 group">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">📄</div>
                <h4 className="text-2xl font-black mb-4 text-slate-900">Direct File Reading</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Gemini direkt aapki PDF, images, aur scanned reports ko parhta hai. Kisi manual data entry ki zaroorat nahi.
                </p>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-slate-100 group">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">💬</div>
                <h4 className="text-2xl font-black mb-4 text-slate-900">Bilingual Summary</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Har report ka asaan nichore (Summary) English aur Roman Urdu mein payein.
                </p>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-slate-100 group">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">⚠️</div>
                <h4 className="text-2xl font-black mb-4 text-slate-900">Highlight Abnormalities</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Agar report mein WBC high ho ya Hb low, Gemini foran usay highlight karke asaan alfaaz mein samjhata hai.
                </p>
              </div>
              {/* Card 4 */}
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-slate-100 group">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">❓</div>
                <h4 className="text-2xl font-black mb-4 text-slate-900">Doctor Questions</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Gemini aapko 3-5 ahem sawalaat suggest karega jo aap agali mulaqat mein doctor se puch sakte hain.
                </p>
              </div>
              {/* Card 5 */}
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-slate-100 group">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">🥗</div>
                <h4 className="text-2xl font-black mb-4 text-slate-900">Lifestyle Suggestions</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Report ke mutabiq kis tarah ka khana khana chahiye aur kis se parhez karna chahiye.
                </p>
              </div>
              {/* Card 6 */}
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-slate-100 group">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">📈</div>
                <h4 className="text-2xl font-black mb-4 text-slate-900">Manual Vitals</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Bina report ke bhi BP, Sugar, aur Weight track karein. Maslan: "10th Oct, BP was 130/80".
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Preview */}
        <section className="py-24 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h3 className="text-4xl font-black mb-8 text-slate-900 leading-tight tracking-tight">
                Aapki Medical History, <br />
                <span className="text-primary italic">Aik Hi Timeline Mein</span>
              </h3>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium">
                HealthMate aapke saare reports aur manual entries ko aik timeline mein dikhata hai.
                Ab purane records dhoondna mazi ki baat hai.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="bg-slate-50 border border-slate-100 p-1.5 rounded-lg text-primary shadow-sm font-bold">✓</span>
                  <p className="font-bold text-slate-700">Reports sorted by date</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="bg-slate-50 border border-slate-100 p-1.5 rounded-lg text-primary shadow-sm font-bold">✓</span>
                  <p className="font-bold text-slate-700">Easy preview of PDF/Images</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="bg-slate-50 border border-slate-100 p-1.5 rounded-lg text-primary shadow-sm font-bold">✓</span>
                  <p className="font-bold text-slate-700">Secure and Private access</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 bg-slate-50 p-6 sm:p-12 rounded-[3.5rem] relative overflow-hidden border border-slate-100">
              <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 mb-6 border-l-[10px] border-emerald-500 transform -rotate-2 border border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Yesterday, 4:00 PM</p>
                <p className="font-black text-slate-900 italic text-xl">"Sugar level was 105 mg/dL"</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border-l-[10px] border-primary transform rotate-2 border border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">10th Oct, 2024</p>
                <p className="font-black text-slate-900 text-xl">Blood Test Report Analysed 📄</p>
                <p className="text-xs text-primary mt-3 font-black uppercase tracking-widest underline cursor-pointer hover:text-blue-800 transition-colors">View AI Summary</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="bg-primary py-24 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h3 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">"Yeh sirf ek project nahi, ek real-life problem ka digital solution hai."</h3>
            <div className="grid md:grid-cols-3 gap-12 mt-16">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <p className="text-4xl font-black mb-2">JWT</p>
                <p className="font-bold uppercase tracking-widest text-blue-100/60 text-xs">Secure Auth</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <p className="text-4xl font-black mb-2">Cloud</p>
                <p className="font-bold uppercase tracking-widest text-blue-100/60 text-xs">Safe Storage</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <p className="text-4xl font-black mb-2">Gemini</p>
                <p className="font-bold uppercase tracking-widest text-blue-100/60 text-xs">AI Insights</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white p-12 text-center border-t border-slate-100">
        <p className="text-slate-900 font-black text-lg mb-4 italic tracking-tight">
          "Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi."
        </p>
        <p className="text-slate-400 text-sm font-medium max-w-xl mx-auto leading-relaxed">
          HealthMate provides AI-powered medical report summaries for educational purposes only. Always consult a qualified healthcare professional.
        </p>
        <div className="mt-8 text-primary font-black uppercase tracking-[0.2em] text-xs">
          © 2026 HealthMate - Built for impact
        </div>
      </footer>
    </div>
  );
}