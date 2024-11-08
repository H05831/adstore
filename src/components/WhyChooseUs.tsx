import { FaShippingFast, FaThumbsUp, FaLock, FaHeadset } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaShippingFast className="text-black text-3xl" />,
      title: "Fast & Free Shipping",
      description:
        "Get your order delivered at lightning speed with no extra shipping cost.",
    },
    {
      icon: <FaThumbsUp className="text-black text-3xl" />,
      title: "Quality Assurance",
      description:
        "Our products go through strict quality checks to ensure you receive the best.",
    },
    {
      icon: <FaLock className="text-black text-3xl" />,
      title: "Secure Payments",
      description:
        "We use advanced encryption to keep your payments safe and secure.",
    },
    {
      icon: <FaHeadset className="text-black text-3xl" />,
      title: "24/7 Customer Support",
      description:
        "Our support team is here to assist you any time, day or night.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 mt-8 mb-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
