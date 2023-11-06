const mongoose = require("mongoose");

// schema for cv

const cvSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      min: 3,
      max: 50,
    },
    template: {
      type: String,
    },
    personal: {
      name: {
        type: String,
        min: 2,
        max: 100,
      },
      photo: {
        type: String,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      phone: {
        type: Number,
        min: 10,
      },
      email: {
        type: String,
        min: 3,
        max: 255,
      },
      address: {
        type: String,
        min: 3,
        max: 255,
      },
      city: {
        type: String,
        min: 3,
        max: 255,
      },
      pincode: {
        type: String,
        min: 3,
        max: 255,
      },
      selfIntroduction: {
        type: String,
        min: 3,
        max: 255,
      },
      state: {
        type: String,
        min: 3,
        max: 255,
      },
    },
    education: [
      {
        university: {
          type: String,
          min: 3,
          max: 100,
        },
        degree: {
          type: String,
          min: 2,
          max: 100,
        },
        startDate: {
          type: String,
          min: 3,
          max: 50,
        },
        endDate: {
          type: String,
          min: 3,
          max: 50,
        },
        percentage: {
          type: String,
          min: 1,
          max: 5,
        },
      },
    ],
    experience: [
      {
        position: {
          type: String,
          min: 3,
          max: 100,
        },
        organizationName: {
          type: String,
          min: 3,
          max: 100,
        },
        startDate: {
          type: String,
          min: 3,
          max: 50,
        },
        endDate: {
          type: String,
          min: 3,
          max: 50,
        },
        ctc: {
          type: String,
          min: 3,
          max: 50,
        },
        onNoticePeriod: {
          type: Boolean,
          default: false,
        },
        techStack: [
          {
            type: String,
            min: 3,
            max: 100,
          },
        ],
        joiningLocation: {
          type: String,
          min: 3,
          max: 40,
        },
      },
    ],
    skills: [
      {
        skillName: {
          type: String,
          min: 3,
          max: 255,
        },
        rating: {
          type: String,
        },
      },
    ],
    projects: [
      /**
       * Projects :
       * Project Title
       * small description
       * team size
       * duration
       * tech stack
       */
      {
        projectTitle: {
          type: String,
          min: 3,
          max: 100,
        },
        projectDescription: {
          type: String,
          min: 3,
          max: 500,
        },
        techStack: [
          {
            type: String,
            min: 2,
            max: 50,
          },
        ],
        duration: {
          // inMonths
          type: String,
          min: 3,
          max: 255,
        },
        teamSize: {
          type: String,
          min: 3,
          max: 255,
        },
      },
    ],
    socialProfiles: [
      {
        title: {
          type: String,
          min: 2,
          max: 100,
        },
        link: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CV", cvSchema);
