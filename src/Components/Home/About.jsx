export default function About() {
  return (
    <section className="relative bg-linear-to-r from-secondary to-primary text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Choose Care.IO?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
          Care.IO makes caregiving easy, secure, and accessible for everyone. 
          Whether you need babysitting, elderly care, or special care at home, 
          our platform connects you with trusted caregivers quickly and safely.
        </p>
        <div className="mt-8">
          <button className="btn btn-accent">Book a Caregiver</button>
        </div>
      </div>

     
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="bg-white/10 w-full h-full rounded-tr-[150px] rounded-bl-[150px]"></div>
      </div>
    </section>
  );
}
