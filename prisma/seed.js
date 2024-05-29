import { PrismaClient } from "@prisma/client";

// Import the seed data
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {}

const { properties } = propertiesData;
const { amenities } = amenitiesData;
const { bookings } = bookingsData;
const { reviews } = reviewsData;
const { users } = usersData;
const { hosts } = hostsData;

console.log("Seeding the database...");

for (const user of users) {
  await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: user,
  });
}

for (const amenity of amenities) {
  await prisma.amenity.upsert({
    where: { id: amenity.id },
    update: {},
    create: amenity,
  });
}
for (const host of hosts) {
  await prisma.host.upsert({
    where: { id: host.id },
    update: {},
    create: host,
  });
}

for (const property of properties) {
  const createData = { ...property };
  if (property.amenities) {
    createData.amenities = {
      connect: property.amenities.map((id) => ({ id })),
    };
  }

  await prisma.property.upsert({
    where: { id: property.id },
    update: {},
    create: createData,
  });
}

for (const booking of bookings) {
  await prisma.booking.upsert({
    where: { id: booking.id },
    update: {},
    create: booking,
  });
}

for (const review of reviews) {
  await prisma.review.upsert({
    where: { id: review.id },
    update: {},
    create: review,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
