import vision from "@/assets/vision.jpg";

const pillars = [
  { k: "01", t: "Biblical Truth", d: "Scripture as the ultimate source of meaning, morality, and beauty." },
  { k: "02", t: "Apologetic Rigor", d: "Loving, reasoned defense of the historic Christian faith." },
  { k: "03", t: "Brotherhood", d: "Men sharpening men in the long tradition of the church." },
  { k: "04", t: "Courageous Inquiry", d: "Probing every corner of life without fear or compromise." },
];

export function Vision() {
  return (
    <section id="vision" className="relative">
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={vision}
          alt="Heavenly light over distant mountains"
          width={1920}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cloud/60 via-cloud/20 to-cloud" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow">Our Vision</p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] text-navy sm:text-6xl lg:text-7xl">
            Heaven-minded.
            <span className="italic text-gold"> Earth-engaged.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-slate-ink">
            We exist to give men a place to be men — to bounce heavy ideas off
            their brothers and their pastors, and to pursue Biblical theology
            with reverence and resolve. The purpose of theology is doxology.
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-32 max-w-7xl px-6 lg:px-10">
        <div className="glass-card grid gap-8 rounded-3xl p-10 sm:grid-cols-2 lg:grid-cols-4 lg:p-14">
          {pillars.map((p) => (
            <div key={p.k} className="group">
              <p className="font-display text-3xl text-gold">{p.k}</p>
              <h3 className="mt-4 font-display text-xl text-navy">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-ink">{p.d}</p>
              <div className="mt-6 h-px w-10 bg-navy/15 transition-all group-hover:w-20 group-hover:bg-gold" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-32 text-center lg:py-40">
        <p className="eyebrow">Jude 3</p>
        <blockquote className="mt-6 font-display text-3xl font-light italic leading-tight text-navy sm:text-4xl lg:text-5xl">
          "Contend earnestly for the faith
          <br />
          which was once for all delivered
          <span className="text-gold"> to the saints."</span>
        </blockquote>
      </div>
    </section>
  );
}
