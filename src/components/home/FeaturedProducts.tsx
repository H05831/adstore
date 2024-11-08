import { db } from "@/lib/db";
import Card from "../Card";
import Description from "../Description";
import Heading from "../Heading";

const FeaturedProducts = async () => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
    take: 4,
  });

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20 xl:mt-20 lg:mt-20 2xl:mt-20 mb-10">
      <Heading title="Featured Collection" />
      <Description
        description=" Trending in fashion are sustainable pieces, incorporating eco-friendly
        materials and designs that prioritize both style and environmental
        consciousness."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mx-2 my-5">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
