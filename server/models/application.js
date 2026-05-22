import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "birth_certificate",
        "death_certificate",
        "marriage_registration",
        "business_registration",
        "tax_clearance",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "additional_info_required",
        "approved",
        "rejected",
      ],
      default: "submitted",
    },

    formData: {
      type: Object,
      required: true,
    },

    documents: [
      {
        name: String,
        url: String,
        public_id: String,
      },
    ],

    remarks: [
      {
        message: String,
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);