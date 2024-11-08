import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } }).input(z.object({ productId: z.string().optional() }))

        .middleware(async ({ input }) => {

            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { productId } = metadata.input;

            if (productId) {
                const existingProduct = await db.product.findUnique({
                    where: { id: productId },
                    select: { images: true }
                });

                if (!existingProduct) {
                    throw new Error("Product does not exist!");
                }

                const images = [...existingProduct.images, file.url];

                const product = await db.product.update({
                    where: { id: productId },
                    data: {
                        images
                    }
                });

                return { productId: product.id };
            } else {
                const product = await db.product.create({
                    data: {
                        images: [file.url],
                    }
                });

                return { productId: product.id };
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;