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
//# sourceMappingURL=publicController.js.map