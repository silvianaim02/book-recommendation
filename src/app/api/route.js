import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allBooks = await prisma.bookRecommendation.findMany(); // Await the query
    return NextResponse.json(
      { data: allBooks, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req) {
  const { title, author, genre } = await req.json();

  try {
    const newEntry = await prisma.bookRecommendation.create({
      data: {
        bookTitle: title, // Correct the spelling here
        bookAuthor: author,
        bookGenre: genre,
      },
    });
    return NextResponse.json(
      { data: newEntry, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: 'Error add book', success: false },
      { status: 500 }
    );
  }
}
