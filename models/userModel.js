const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);

/**
 * Basic details :
 * image
 * name email
 * phone
 * address
 * city
 * state
 * pincode
 * intro para
 * made by
 * template
 * title
 *
 *
 * Educational :
 * Degree Name
 * Institution
 * percentage
 *
 * Experience :
 * org name
 * joining location
 * position
 * CTC
 * joining date
 * leaving date
 * technologies worked on
 * check box onNoticePeriod
 *
 * Projects :
 * Project Title
 * small description
 * team size
 * duration
 * tech stack
 *
 * Skills :
 * List to select from technical and interpersonal skills
 * rate in terms of percentage
 *
 * Social Profiles:
 * Linkedin
 * Twitter
 * Github
 * Skype
 *
 * One input would be shown by default, multiple can be added/ edited/deleted
 *
 * Each download/Share will require a payment to be made
 *
 * Layout Models
 * name of the layout
 * full cv model ref
 * style
 * template number
 * timestamps
 */
