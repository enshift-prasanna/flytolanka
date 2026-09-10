const { PrismaClient } = require("./../lib/generated/prisma");
const prisma = new PrismaClient();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function migrate() {
  console.log("Migrating Blog slugs...");
  const blogs = await prisma.blog.findMany();
  const blogSlugs = new Set();

  for (const blog of blogs) {
    let baseSlug = slugify(blog.title) || "blog";
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (blogSlugs.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    blogSlugs.add(uniqueSlug);

    await prisma.blog.update({
      where: { id: blog.id },
      data: { slug: uniqueSlug },
    });
    console.log(`Updated Blog '${blog.title}' -> '${uniqueSlug}'`);
  }

  console.log("\nMigrating ThingsToDo slugs...");
  const things = await prisma.thingsToDo.findMany();
  const thingsSlugs = new Set();

  for (const item of things) {
    let baseSlug = slugify(item.title) || "activity";
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (thingsSlugs.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    thingsSlugs.add(uniqueSlug);

    await prisma.thingsToDo.update({
      where: { id: item.id },
      data: { slug: uniqueSlug },
    });
    console.log(`Updated ThingsToDo '${item.title}' -> '${uniqueSlug}'`);
  }

  console.log("\nMigration completed successfully!");
  await prisma.$disconnect();
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  prisma.$disconnect();
  process.exit(1);
});
