import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "road",
        "water",
        "electricity",
        "garbage",
        "drainage",
        "street_light",
        "construction",
        "safety",
        "other",
      ],
      required: true,
    },

    location: {
      ward: String,
      addressText: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "assigned",
        "in_progress",
        "resolved",
        "closed",
      ],
      default: "submitted",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

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
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);