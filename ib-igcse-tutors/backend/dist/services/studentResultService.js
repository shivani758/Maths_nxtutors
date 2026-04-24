import { StudentResultModel } from "../models/StudentResult.js";
import { ApiError } from "../utils/ApiError.js";
import { toObjectIdOrNull } from "../utils/mongo.js";
function serializeResult(doc) {
    const classBoard = [doc.board, doc.classLevel].filter(Boolean).join(" | ");
    const resultSummary = doc.resultSummary || [doc.beforeResult, doc.afterResult].filter(Boolean).join(" to ");
    return {
        id: doc._id.toString(),
        sourceId: doc.sourceId ?? "",
        studentLabel: doc.studentLabel,
        board: doc.board ?? "",
        classLevel: doc.classLevel ?? "",
        classBoard,
        resultSummary,
        story: doc.story,
        linkedTutorId: doc.linkedTutor ? doc.linkedTutor.toString() : "",
        linkedPageId: doc.linkedPage ?? "",
        linkedPage: doc.linkedPage ?? "",
        linkedCitySlug: doc.city ?? "gurugram",
        linkedLocalitySlug: doc.locality ?? "",
        featured: Boolean(doc.featured),
        status: doc.status,
        beforeResult: doc.beforeResult ?? "",
        afterResult: doc.afterResult ?? "",
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
export async function listStudentResults() {
    const results = await StudentResultModel.find().sort({ updatedAt: -1 }).exec();
    return results.map((doc) => serializeResult(doc));
}
export async function getStudentResultById(id) {
    const result = await StudentResultModel.findById(id).exec();
    if (!result) {
        throw new ApiError(404, "Student result not found.", { code: "RESULT_NOT_FOUND" });
    }
    return serializeResult(result);
}
export async function getApprovedStudentResults() {
    const results = await StudentResultModel.find({ status: "approved" }).sort({ updatedAt: -1 }).exec();
    return results.map((doc) => serializeResult(doc));
}
export async function createStudentResult(payload) {
    const result = await StudentResultModel.create({
        ...payload,
        linkedTutor: toObjectIdOrNull(payload.linkedTutorId),
    });
    return serializeResult(result);
}
export async function updateStudentResult(id, payload) {
    const result = await StudentResultModel.findById(id).exec();
    if (!result) {
        throw new ApiError(404, "Student result not found.", { code: "RESULT_NOT_FOUND" });
    }
    Object.assign(result, {
        ...payload,
        linkedTutor: payload.linkedTutorId === undefined ? result.linkedTutor : toObjectIdOrNull(payload.linkedTutorId),
    });
    await result.save();
    return serializeResult(result);
}
export async function deleteStudentResult(id) {
    const result = await StudentResultModel.findByIdAndDelete(id).exec();
    if (!result) {
        throw new ApiError(404, "Student result not found.", { code: "RESULT_NOT_FOUND" });
    }
    return serializeResult(result);
}
//# sourceMappingURL=studentResultService.js.map