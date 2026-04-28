import { Link } from 'react-router-dom';

export default function System() {
  return (
    <>
      <div className="absolute w-40 h-40 bg-sg/20 blur-3xl rounded-full" />

      {/* HERO */}
      <section className="relative px-5 md:px-10 py-10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/gambar1.jpeg"
            className="w-full h-60 opacity-20 object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mt-10 tracking-widest">SYSTEM</h1>
          <h2 className="text-lg sm:text-xl text-gray-400">Cara kami belajar</h2>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative mt-10 max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="absolute w-40 h-40 bg-sg/20 blur-3xl rounded-full" />
        <div className="relative space-y-10">
          <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sg via-sg-light to-transparent hidden md:block" />

          {/* ITEM 1 */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center relative">
            <div className="z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-sg to-sg-dark flex items-center justify-center shadow-lg shadow-sg/30 border-4 border-darkbg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="flex-1 bg-darkbg-card rounded-2xl border border-white/5 p-6 sm:p-8 shadow-lg hover:border-sg/40 transition">
              <h2 className="text-sg font-bold text-lg sm:text-xl mb-2">MANDOR METHOD</h2>
              <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet</p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center relative">
            <div className="z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-sg to-sg-dark flex items-center justify-center shadow-lg shadow-sg/30 border-4 border-darkbg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M3 4h18v4l-7 7v5l-4 4v-9L3 8z" />
                </svg>
              </div>
            </div>

            <div className="flex-1 bg-darkbg-card rounded-2xl border border-white/5 p-6 sm:p-8 shadow-lg hover:border-sg/40 transition">
              <h2 className="text-sg font-bold text-lg sm:text-xl mb-2">PROBLEM THREAD</h2>
              <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet</p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center relative">
            <div className="z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-sg to-sg-dark flex items-center justify-center shadow-lg shadow-sg/30 border-4 border-darkbg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M4 4v5h5M20 20v-5h-5" />
                </svg>
              </div>
            </div>

            <div className="flex-1 bg-darkbg-card rounded-2xl border border-white/5 p-6 sm:p-8 shadow-lg hover:border-sg/40 transition">
              <h2 className="text-sg font-bold text-lg sm:text-xl mb-2">ITERASI & DELIVER</h2>
              <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>

        <div className="absolute w-80 h-80 bg-sg/20 blur-3xl rounded-full" />

        {/* SOP */}
        <div className="mt-16 bg-darkbg-card rounded-2xl border border-white/5 p-6 sm:p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-sg/20 blur-[80px]" />

          <div className="items-center relative z-10 text-center md:text-left">
            <h2 className="text-center text-5xl sm:text-4xl font-extrabold mb-2">SOP</h2>
            <p className="text-center text-gray-400 mb-8">(RULE DASAR)</p>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="hidden md:block w-px bg-white/10 h-40" />

              <ol className="space-y-3 text-sm text-gray-300 text-left">
                <li><span className="text-sg font-bold">1.</span> Tidak ada paksaan dalam project</li>
                <li><span className="text-sg font-bold">2.</span> Komitmen terhadap project</li>
                <li><span className="text-sg font-bold">3.</span> Diskusi harus membawa solusi</li>
                <li><span className="text-sg font-bold">4.</span> Menghargai kontribusi</li>
                <li><span className="text-sg font-bold">5.</span> Konsistensi lebih penting</li>
              </ol>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col mt-12 text-center space-y-6">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Kami mencari orang yang siap bertanggung jawab dan berkembang.
          </p>

          <Link to="/form-pendaftaran">
            <button className="bg-sg hover:bg-sg-dark px-10 sm:px-12 py-3 sm:py-4 rounded-full font-bold transition shadow-lg shadow-sg/30">
              JOIN US
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

