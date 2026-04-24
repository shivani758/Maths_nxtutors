import { getDashboardSnapshot } from "../services/dashboardService.js";
import { sendOk } from "../utils/response.js";
export async function getDashboardController(_req, res) {
    return sendOk(res, await getDashboardSnapshot());
}
//# sourceMappingURL=dashboardController.js.map