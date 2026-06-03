import vision from "@/assets/vision.jpg";

const pillars = [
  { k: "01", t: "Biblical Truth",      d: "Scripture as the ultimate source of meaning, morality, and beauty." },
  { k: "02", t: "Apologetic Rigor",    d: "Loving, reasoned defense of the historic Christian faith." },
  { k: "03", t: "Brotherhood",         d: "Men sharpening men in the long tradition of the church." },
  { k: "04", t: "Courageous Inquiry",  d: "Probing every corner of life without fear or compromise." },
];

export function Vision() {
  return (
    <section id="vision" className="relative">
      {/* Image hero */}
      <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={vision}
          alt="Heavenly light over distant mountains"
          width={1920}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow text-gold">Our Vision</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Heaven-minded.
            <span className="italic text-gold"> Earth-engaged.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/90">
            We exist to give men a place to be men — to bounce heavy ideas off
            their brothers and their pastors, and to pursue Biblical theology
            with reverence and resolve.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.k} className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <p className="font-display text-3xl text-gold">{p.k}</p>
                <h3 className="mt-4 font-display text-xl text-navy">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.d}</p>
                <div className="mt-5 h-px w-8 bg-gold/30 transition-all group-hover:w-16 group-hover:bg-gold" />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-20 pt-4 text-center lg:pb-24 lg:pt-8">
          <p className="eyebrow">Jude 3</p>
          <blockquote className="mt-5 font-display text-3xl font-light italic leading-tight text-navy sm:text-4xl lg:text-5xl">
            "Contend earnestly for the faith
            <br />
            which was once for all delivered
            <span className="text-gold"> to the saints."</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
