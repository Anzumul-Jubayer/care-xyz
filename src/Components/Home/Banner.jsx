export default function Banner() {
  return (
    <section
      className="relative text-white bg-cover bg-center min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/baby.jpg')",
      }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>

      
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Trusted Care for Your <br /> Loved Ones
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-semibold">
          Care.IO helps you find reliable caregivers for children,
          elderly, and sick family members — safe, secure, and easy.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="btn btn-accent">Explore Services</button>
          <button className="btn btn-outline btn-white">Learn More</button>
        </div>
      </div>
    </section>
  );
}
