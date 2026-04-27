import { getPublishedBlogs } from "../services/blogService.js";
import { getPublishedPages } from "../services/pageService.js";
import { getApprovedReviews } from "../services/reviewService.js";
import { getApprovedStudentResults } from "../services/studentResultService.js";
import { getPublicTutors } from "../services/tutorService.js";
import { sendOk } from "../utils/response.js";
export async function getPublicBootstrapController(_req, res) {
    const [tutors, blogs, reviews, results, pages] = await Promise.all([
        getPublicTutors(),
        getPublishedBlogs(),
        getApprovedReviews(),
        getApprovedStudentResults(),
        getPublishedPages(),
    ]);
    return sendOk(res, {
        tutors,
        blogs,
        reviews,
        results,
        pages,
    });
}
export async function listPublicTutorsController(_req, res) {
    return sendOk(res, await getPublicTutors());
}
export async function listPublicBlogsController(_req, res) {
    return sendOk(res, await getPublishedBlogs());
}
export async function listPublicReviewsController(_req, res) {
    return sendOk(res, await getApprovedReviews());
}
//# sourceMappingURL=publicController.js.map