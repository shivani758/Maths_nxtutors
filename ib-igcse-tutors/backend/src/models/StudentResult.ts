import mongoose, { Schema, model } from "mongoose";

const studentResultSchema = new Schema(
  {
    sourceId: { type: String, default: null, index: { unique: true, sparse: true } },
    studentLabel: { type: String, required: true, trim: true },
    board: { type: String, default: "", index: true },
    classLevel: { type: String, default: "" },
    resultSummary: { type: String, default: "" },
    story: { type: String, required: true },
    linkedTutor: { type: Schema.Types.ObjectId, ref: "Tutor", default: null, index: true },
    linkedPage: { type: String, default: "" },
    city: { type: String, default: "gurugram" },
    locality: { type: String, default: "" },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["draft", "approved"],
      default: "draft",
      index: true,
    },
    beforeResult: { type: String, default: "" },
    afterResult: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

studentResultSchema.index({ status: 1, featured: 1 });

export const StudentResultModel =
  mongoose.models.StudentResult || model("StudentResult", studentResultSchema);
