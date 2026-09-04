import { prisma } from "@/lib/prisma";

/**
 * Converts a text string into a clean, URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_-]+/g, "-") // collapse whitespace and underscores to -
    .replace(/^-+|-+$/g, ""); // trim leading and trailing -
}

/**
 * Generates a unique package slug. If a package with the slug already exists,
 * appends -1, -2, etc. until a unique slug is found.
 *
 * @param title The package title or raw slug string.
 * @param currentPackageId Optional current package ID to exclude from collision check during update.
 */
export async function generateUniquePackageSlug(
  title: string,
  currentPackageId?: string
): Promise<string> {
  const baseSlug = slugify(title) || "package";
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await (prisma.package as any).findFirst({
      where: {
        slug: uniqueSlug,
        ...(currentPackageId ? { id: { not: currentPackageId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return uniqueSlug;
    }

    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Generates a unique category slug. If a category with the slug already exists,
 * appends -1, -2, etc. until a unique slug is found.
 */
export async function generateUniqueCategorySlug(
  name: string,
  currentCategoryId?: string
): Promise<string> {
  const baseSlug = slugify(name) || "category";
  let uniqueSlug = baseSlug;
  let counter = 1;

  const categories = await prisma.category.findMany();

  while (true) {
    const existing = categories.find(
      (c: any) => c.slug === uniqueSlug && (!currentCategoryId || c.id !== currentCategoryId)
    );

    if (!existing) {
      return uniqueSlug;
    }

    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
}

