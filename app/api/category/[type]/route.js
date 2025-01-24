import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { type } = params; // Get the "type" parameter from the dynamic route
console.log("type is: ",params)
  try {
    // Fetch categories based on the "type" parameter
    const categories = await prisma.category.findMany({
      where: { type },
    });

    if (!categories || categories.length === 0) {
      return new Response(JSON.stringify({ message: 'No categories found for the specified type.' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
