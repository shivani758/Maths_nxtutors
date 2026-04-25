import { getTutorProfilePath } from "../utils/tutorRoutes";
import {
  getFeaturedTutors,
  getRelatedBlogs,
  getStudentResultsByBoard,
  listMathsTutors,
} from "../services/mathsContentService";
import {
  listCanonicalTutorsSnapshot,
  listPublishedBlogsSnapshot,
  listResultsSnapshot,
} from "../services/publicSiteService";

function normalizeToken(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeValues(values = []) {
  return (Array.isArray(values) ? values : [values])
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .map((value) => normalizeToken(value))
    .filter(Boolean);
}

function tokenize(values = []) {
  return [
    ...new Set(
      normalizeValues(values).flatMap((value) => value.split(" ").filter(Boolean)),
    ),
  ];
}

function hasNormalizedValue(values = [], expectedValues = []) {
  const normalizedValues = normalizeValues(values);
  const normalizedExpectedValues = normalizeValues(expectedValues);

  if (!normalizedExpectedValues.length) {
    return false;
  }

  return normalizedExpectedValues.some((value) => normalizedValues.includes(value));
}

function matchesTokens(values = [], queryTokens = []) {
  const normalizedQueryTokens = tokenize(queryTokens);

  if (!normalizedQueryTokens.length) {
    return true;
  }

  return tokenize(values).some((token) => normalizedQueryTokens.includes(token));
}

function matchesTutorCityScope(tutor, query = {}) {
  if (!query.citySlug && !query.cityLabel) {
    return true;
  }

  const matchesExplicitCity = hasNormalizedValue(
    [tutor.cities, tutor.location],
    [query.citySlug, query.cityLabel],
  );

  if (matchesExplicitCity) {
    return true;
  }

  const normalizedQueryValues = normalizeValues([query.citySlug, query.cityLabel]);
  const hasGurugramCoverage = normalizeValues([
    tutor.sectors,
    tutor.localityTags,
    tutor.schoolFocus,
  ]).length > 0;

  return hasGurugramCoverage && normalizedQueryValues.some((value) => value === "gurugram" || value === "gurgaon");
}

function toGuideCard(blog) {
  return {
    id: blog.id,
    title: blog.title,
    summary: blog.summary,
    category: blog.category,
    tags: blog.tags ?? [],
    author: blog.author,
    publishDate: blog.publishDate,
    slug: blog.slug,
    to: blog.slug ? `/blogs/${blog.slug}` : "",
  };
}

function createTutorLookup() {
  return listCanonicalTutorsSnapshot().reduce((map, tutor) => {
    map[tutor.id] = tutor;
    if (tutor.sourceId) {
      map[tutor.sourceId] = tutor;
    }
    return map;
  }, {});
}

function toResultCard(result, tutorLookup) {
  const tutor = tutorLookup[result.linkedTutorId];
  return {
    id: result.id,
    studentLabel: result.studentLabel,
    classBoard: result.classBoard,
    beforeResult: result.beforeResult,
    afterResult: result.afterResult,
    story: result.story,
    tutorName: tutor?.name ?? "",
    tutorPath: tutor ? getTutorProfilePath(tutor) : "",
  };
}

function sortByDate(items = [], fieldName) {
  return [...items].sort(
    (first, second) =>
      new Date(second[fieldName] ?? 0).getTime() - new Date(first[fieldName] ?? 0).getTime(),
  );
}

function sortResults(results = []) {
  return [...results].sort((first, second) => {
    if (Boolean(first.featured) !== Boolean(second.featured)) {
      return first.featured ? -1 : 1;
    }

    return new Date(second.updatedAt ?? second.createdAt ?? 0).getTime() -
      new Date(first.updatedAt ?? first.createdAt ?? 0).getTime();
  });
}

function limitItems(items = [], limit = 3) {
  return items.slice(0, limit);
}

function filterBlogsByTokens(tokens = [], limit = 3) {
  return limitItems(
    sortByDate(listPublishedBlogsSnapshot(), "publishDate")
      .filter((blog) =>
        matchesTokens([blog.category, ...(blog.tags ?? []), ...(blog.relatedBoards ?? [])], tokens),
      )
      .map((blog) => toGuideCard(blog)),
    limit,
  );
}

function filterTutorsByPredicate(predicate, limit = 6) {
  return limitItems(listMathsTutors().filter(predicate), limit);
}

function filterResultsByPredicate(predicate, limit = 3) {
  const tutorLookup = createTutorLookup();

  return limitItems(
    sortResults(listResultsSnapshot().filter((result) => result.status === "approved").filter(predicate)).map(
      (result) => toResultCard(result, tutorLookup),
    ),
    limit,
  );
}

function resolveTutorQuery(query = {}) {
  switch (query.kind) {
    case "board":
      return getFeaturedTutors(query.pageKey, {
        featuredTutorIds: query.featuredTutorIds,
        limit: query.limit,
      });
    case "city":
      return filterTutorsByPredicate(
        (tutor) =>
          matchesTutorCityScope(tutor, query) ||
          hasNormalizedValue([tutor.sectors, tutor.schoolFocus], [query.cityLabel]),
        query.limit,
      );
    case "sector":
      return filterTutorsByPredicate(
        (tutor) =>
          hasNormalizedValue(
            [tutor.sectors, tutor.localityTags, tutor.schoolFocus],
            [query.sectorSlug, query.sectorLabel],
          ),
        query.limit,
      );
    case "board-city":
      return filterTutorsByPredicate(
        (tutor) => {
          const matchesBoard = matchesTokens(
            [
              tutor.board,
              tutor.title,
              tutor.boardTags,
              tutor.topicTags,
              tutor.examSupport,
              tutor.summary,
            ],
            query.tokens,
          );
          const matchesCity = matchesTutorCityScope(tutor, query);

          return matchesBoard && matchesCity;
        },
        query.limit,
      );
    case "locality-cluster":
      return filterTutorsByPredicate(
        (tutor) => {
          const matchesLocality = hasNormalizedValue(
            [tutor.sectors, tutor.localityTags],
            query.localityLabels ?? query.localitySlugs,
          );
          const matchesSchool = hasNormalizedValue(tutor.schoolFocus, query.schoolTokens);
          const matchesExtraTokens = !query.tokens?.length
            ? true
            : matchesTokens(
                [tutor.board, tutor.title, tutor.boardTags, tutor.topicTags, tutor.summary],
                query.tokens,
              );

          return (matchesLocality || matchesSchool) && matchesExtraTokens;
        },
        query.limit,
      );
    case "tokens":
      return filterTutorsByPredicate(
        (tutor) => {
          const matchesQueryTokens = matchesTokens(
            [
              tutor.board,
              tutor.title,
              tutor.boardTags,
              tutor.topicTags,
              tutor.examSupport,
              tutor.summary,
              tutor.classLevel,
              tutor.classesSupported,
              tutor.serviceModes,
              tutor.localityTags,
              tutor.schoolFocus,
            ],
            query.tokens,
          );
          const matchesCity = matchesTutorCityScope(tutor, query);
          const matchesLocality =
            !(query.localityLabels?.length || query.localitySlugs?.length) ||
            hasNormalizedValue(
              [tutor.sectors, tutor.localityTags, tutor.schoolFocus],
              [...(query.localityLabels ?? []), ...(query.localitySlugs ?? [])],
            );

          return matchesQueryTokens && matchesCity && matchesLocality;
        },
        query.limit,
      );
    default:
      return [];
  }
}

function resolveBlogQuery(query = {}) {
  switch (query.kind) {
    case "board":
      return getRelatedBlogs(query.pageKey, {
        limit: query.limit,
      });
    case "city":
      return filterBlogsByTokens([query.cityLabel, ...(query.boardLabels ?? [])], query.limit);
    case "sector":
      return filterBlogsByTokens(
        [query.sectorLabel, query.cityLabel, ...(query.boardLabels ?? [])],
        query.limit,
      );
    case "tokens":
    case "board-city":
      return filterBlogsByTokens(query.tokens ?? [], query.limit);
    case "recent":
      return limitItems(
        sortByDate(listPublishedBlogsSnapshot(), "publishDate").map((blog) => toGuideCard(blog)),
        query.limit ?? 3,
      );
    default:
      return [];
  }
}

function resolveResultQuery(query = {}) {
  switch (query.kind) {
    case "board":
      return getStudentResultsByBoard(query.pageKey, {
        limit: query.limit,
      });
    case "city":
      return filterResultsByPredicate(
        (result) =>
          hasNormalizedValue(result.linkedCitySlug, [query.citySlug, query.cityLabel]),
        query.limit,
      );
    case "sector":
      return filterResultsByPredicate(
        (result) =>
          hasNormalizedValue(result.linkedLocalitySlug, [query.sectorSlug, query.sectorLabel]),
        query.limit,
      );
    case "board-city":
      return filterResultsByPredicate(
        (result) => {
          const matchesCity =
            !query.citySlug ||
            hasNormalizedValue(result.linkedCitySlug, [query.citySlug, query.cityLabel]);
          const matchesBoard = matchesTokens(
            [result.classBoard, result.studentLabel, result.story],
            query.tokens,
          );

          return matchesCity && matchesBoard;
        },
        query.limit,
      );
    case "locality-cluster":
      return filterResultsByPredicate(
        (result) => {
          const matchesLocality = hasNormalizedValue(
            result.linkedLocalitySlug,
            query.localitySlugs ?? query.localityLabels,
          );
          const matchesTokensForResult = !query.tokens?.length
            ? true
            : matchesTokens([result.classBoard, result.studentLabel, result.story], query.tokens);

          return matchesLocality && matchesTokensForResult;
        },
        query.limit,
      );
    case "tokens":
      return filterResultsByPredicate(
        (result) => {
          const matchesQueryTokens = matchesTokens(
            [result.classBoard, result.studentLabel, result.story],
            query.tokens,
          );
          const matchesCity =
            !query.citySlug ||
            hasNormalizedValue(result.linkedCitySlug, [query.citySlug, query.cityLabel]);
          const matchesLocality =
            !(query.localityLabels?.length || query.localitySlugs?.length) ||
            hasNormalizedValue(
              result.linkedLocalitySlug,
              [...(query.localityLabels ?? []), ...(query.localitySlugs ?? [])],
            );

          return matchesQueryTokens && matchesCity && matchesLocality;
        },
        query.limit,
      );
    default:
      return [];
  }
}

export function resolveConfigPageData(config) {
  if (!config) {
    return {
      relatedTutors: [],
      relatedBlogs: [],
      studentResults: [],
    };
  }

  return {
    relatedTutors: resolveTutorQuery(config.relatedTutorQuery),
    relatedBlogs: resolveBlogQuery(config.relatedBlogQuery),
    studentResults: resolveResultQuery(config.relatedResultQuery),
  };
}
