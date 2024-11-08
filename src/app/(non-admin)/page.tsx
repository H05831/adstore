import Advertisement from "@/components/home/Advertisement";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrendingProducts from "@/components/home/TrendingProducts";
import WhyChooseUs from "@/components/WhyChooseUs";

const HomePage = async () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <section className="w-full">
        <Banner />
      </section>

      <section className="w-full">
        <TrendingProducts />
      </section>

      <section className="w-full">
        <Categories />
      </section>

      <section className="w-full">
        <FeaturedProducts />
      </section>

      <section className="w-full">
        <Advertisement />
      </section>
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
