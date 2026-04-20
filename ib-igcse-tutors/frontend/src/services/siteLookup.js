function normalizeSlug(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function getSubjectPage(siteData, slug) {
  return siteData.subjectPages.find((item) => item.slug === normalizeSlug(slug)) ?? null;
}

export function getCityPage(siteData, city) {
  const normalizedCity = normalizeSlug(city);

  return (
    siteData.cityPages.find(
      (item) =>
        item.slug === normalizedCity || item.aliases?.some((alias) => alias === normalizedCity),
    ) ?? null
  );
}

export function getSectorPage(siteData, city, sector) {
  const normalizedCity = normalizeSlug(city);
  const normalizedSector = normalizeSlug(sector);

  return (
    siteData.sectorPages.find(
      (item) =>
        item.slug === normalizedSector &&
        (item.citySlug === normalizedCity ||
          item.cityAliases?.some((alias) => alias === normalizedCity)),
    ) ?? null
  );
}

export function getTutorById(siteData, id) {
  return siteData.tutors.find((tutor) => tutor.id === id) ?? null;
}

