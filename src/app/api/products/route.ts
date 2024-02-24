import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// fetch all products
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);// if i am on the homePAGE THEN THE URL WILL BE http://localhost:3000/api/products AND IF I AM ON THE CATEGORY PAGE THEN THE URL WILL BE http://localhost:3000/api/products?cat=burgers
  const cat = searchParams.get("cat"); //http://localhost:3000/api/products?cat=burgers then cat=burgers

  try {
    const products = await prisma.product.findMany({
      where: { // here I have used the logic that if the cat is present in the url then I will fetch the products of that category and if the cat is not present then I will fetch the featured products
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
// export const POST = async (req: NextRequest) => {
//   try {
//     const body = await req.json();
//     const product = await prisma.product.create({
//       data: body,
//     });
//     return new NextResponse(JSON.stringify(product), { status: 201 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };
