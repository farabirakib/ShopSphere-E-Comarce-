const PromoSection = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden my-12">

      {/* YOUTUBE VIDEO FULL COVER */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-0 left-0 w-[300%] h-[300%] -translate-x-1/3 -translate-y-1/3"
          src="https://youtu.be/nIJKzG14avU?si=lUmnphkxc7cvScUI"
          title="Promo Video"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Discover Premium Quality
        </h2>

        <p className="text-white/90 max-w-xl md:text-lg">
          Shop the latest trends with superior comfort & unbeatable style.
        </p>

        <p className="text-xs text-white/70 mt-4">
          🔊 Tap the YouTube sound icon to enable audio
        </p>
      </div>

    </section>
  );
};

export default PromoSection;
