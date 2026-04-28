export default function Projects() {
  return (
    <>
      <section className="relative px-5 md:px-10 py-10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/gambar1.jpeg"
            className="w-full h-60 opacity-20 object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-10 tracking-widest">
            APA YANG KAMI BANGUN
          </h1>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mt-20">
          <h2 className="text-white text-2xl font-semibold">
            PORTOFOLIO DAN OUTPUT
          </h2>
          <p className="text-gray-400 text-sm tracking-wide">
            Hasil karya kolaborasi yang kami ciptakan
          </p>
        </div>
      </section>

      <section className="space-y-12 py-10">
        <div className="flex justify-center px-5">
          <div className="w-full max-w-5xl bg-darkbg-card rounded-[28px] border border-white/5 p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sg/20 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>

            <div className="mb-6 relative z-10">
              <h2 className="text-2xl font-bold mb-3">THE REST AREA</h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry...
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="w-full md:w-1/2">
                <p className="text-gray-300 text-sm leading-7 text-justify">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries...
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-5">
          <div className="w-full max-w-5xl bg-darkbg-card rounded-[28px] border border-white/5 p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sg/20 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>

            <div className="mb-6 relative z-10">
              <h2 className="text-2xl font-bold mb-3">PROJECT LAIN</h2>
              <p className="text-gray-400 text-sm">Deskripsi project...</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="w-full md:w-1/2">
                <p className="text-gray-300 text-sm leading-7 text-justify">
                  Detail project...
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                  <div className="aspect-[4/3] rounded-lg border border-sg/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

