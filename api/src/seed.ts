import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/prisma/client';

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Camisa Real Madrid 24/25',
        description: 'Modelo titular adidas, tecido Aeroready',
        price: '399.90',
        imageUrl: 'https://images.unsplash.com/photo-1543326727-c9cb1a51795a?q=80&w=600',
        team: 'Real Madrid',
        league: 'La Liga',
        stock: 15,
      },
      {
        name: 'Camisa Brasil 2024',
        description: 'Oficial Nike seleção brasileira',
        price: '349.90',
        imageUrl: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=600',
        team: 'Brasil',
        league: 'Seleção',
        stock: 20,
      },
      {
        name: 'Camisa Manchester City 24/25',
        description: 'Modelo titular Puma',
        price: '379.90',
        imageUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?q=80&w=600',
        team: 'Manchester City',
        league: 'Premier League',
        stock: 10,
      },
    ],
  });

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});