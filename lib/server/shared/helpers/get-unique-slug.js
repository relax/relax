import slugify from 'slug';

async function check (Model, slug) {
  const exists = await Model.count({slug});
  return {
    exists,
    slug
  };
}

export default async (Model, str) => {
  const generatedSlug = slugify(str).toLowerCase();
  let result = await check(Model, generatedSlug);

  if (result.exists) {
    let counter = 1;
    do {
      result = await check(Model, `${generatedSlug}-${counter}`);
      counter++;
    } while (result.exists);
  }

  return result.slug;
};
