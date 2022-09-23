import mysql from "mysql2/promise";
import { getDatabaseUrl } from "./utils/db.mjs";

const conn = await mysql.createConnection(getDatabaseUrl());

const data = {
  product: [
    {
      product_id: "1",
      name: "Earthen Bottle",
      description:
        "Crafted to inspire a healthier lifestyle, reviving the traditional use of earthenware, designed with a contemporary outlook.",
      price: 48,
      image_src: "/images/product-01.jpeg",
    },
    {
      product_id: "2",
      name: "Nomad Tumbler",
      description:
        "Meet the Kinto Travel Tumbler, a must have for people on-the-go! This vacuum insulated tumbler will keep your beverage hot or cold for up to 6 hours (hot above 65°C / cold below 8°C). For maximum insulation efficiency preheat or precool your tumbler before use by filling with a bit of hot or cold water for 1 - 2 mins.",
      price: 35,
      image_src: "/images/product-02.jpeg",
    },
    {
      product_id: "3",
      name: "Focus Paper Refill",
      description: "Refill for the Focus notebook. 80gsm paper.",
      price: 89,
      image_src: "/images/product-03.jpeg",
    },
    {
      product_id: "4",
      name: "Machined Mechanical Pencil",
      description:
        "This may be the last mechanical pencil you'll ever need. Made from Grade 5 titanium, it's case is rustproof, corrosion resistant and durable, with great metallic luster made by high precision CNC machining, its utility and beauty will last forever.",
      price: 35,
      image_src: "/images/product-04.jpeg",
    },
  ],
  review: [
    {
      review_id: "1",
      product_id: "1",
      stars: 5,
      review_count: 1337,
    },
    {
      review_id: "2",
      product_id: "2",
      stars: 4,
      review_count: 543,
    },
    {
      review_id: "3",
      product_id: "3",
      stars: 3,
      review_count: 103,
    },
    {
      review_id: "4",
      product_id: "4",
      stars: 5,
      review_count: 13432,
    },
  ],
};

console.info("Seeding database");

for (const tableName in data) {
  console.log(`Processing ${tableName} data...`);
  const records = data[tableName];
  const primaryKey = `${tableName}_id`;

  for (const record of records) {
    const fields = Object.entries(record);

    const exists = await conn.query(
      `SELECT COUNT(*) as count FROM ${tableName} WHERE ${primaryKey} = ?`,
      [record[primaryKey]]
    );

    if (exists[0][0].count > 0) {
      await conn.query(
        `
          UPDATE ${tableName}
            SET ${fields.map(([key]) => `${key} = ?`).join(", ")}
            WHERE ${primaryKey} = ?
        `,
        [...fields.map(([, value]) => value), record[primaryKey]]
      );
      console.info(`Updated ${tableName} "${record[primaryKey]}"`);
    } else {
      await conn.query(
        `
        INSERT INTO ${tableName} (${fields.map(([key]) => key).join(", ")})
        VALUES (${fields.map(() => "?").join(", ")})
        `,
        fields.map(([, value]) => value)
      );
      console.info(`Inserted ${tableName} "${record[primaryKey]}"`);
    }
  }
}

console.info("Finished seeding");

conn.end();
