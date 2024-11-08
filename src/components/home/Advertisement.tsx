import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

function Advertisement() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-10 shadow-lg overflow-hidden text-white my-12">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover opacity-30 bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=800&q=80')]"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">End of Season Sale</h2>
          <p className="text-lg mb-6">
            Enjoy up to{" "}
            <span className="font-bold text-yellow-400">50% OFF</span> on
            selected items. Hurry, offer ends soon!
          </p>
          <button className="flex items-center gap-2 bg-yellow-400 text-indigo-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300 ease-in-out">
            Shop Now <FaArrowRight />
          </button>
        </div>
        {/* Featured Product Image */}
        <div className="mt-8 md:mt-0 md:ml-6">
          <Image
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fit=crop&w=400&q=80"
            alt="Featured Sale Item"
            width={300}
            height={300}
            className="w-full max-w-xs rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Advertisement;
