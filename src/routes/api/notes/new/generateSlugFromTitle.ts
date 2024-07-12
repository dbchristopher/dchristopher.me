export const generateSlugFromTitle = (title: FormDataEntryValue | null) => {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}