const expressAsyncHandler = require("express-async-handler");
const Joi = require("joi");

// Define the validation schema for the CV data
const cvValidationSchema = Joi.object({
  title: Joi.string().min(1).max(50),
  template: Joi.string(),
  personal: Joi.object({
    name: Joi.string().min(2).max(100),
    phone: Joi.number().min(10),
    email: Joi.string().email(),
    address: Joi.string().min(1).max(255),
    city: Joi.string().min(1).max(255),
    state: Joi.string().min(1).max(255),
    pincode: Joi.string().min(1).max(255),
    photo: Joi.string(),
    selfIntroduction: Joi.string().min(1).max(255),
  }),
  education: Joi.array().items(
    Joi.object({
      university: Joi.string().min(1).max(100),
      degree: Joi.string().min(2).max(100),
      startDate: Joi.string().min(1).max(50),
      endDate: Joi.string().min(1).max(50),
      percentage: Joi.string().min(1).max(5),
    })
  ),
  experience: Joi.array().items(
    Joi.object({
      position: Joi.string().min(1).max(100),
      organizationName: Joi.string().min(1).max(100),
      startDate: Joi.string().min(1).max(50),
      endDate: Joi.string().min(1).max(50),
      ctc: Joi.string().min(1).max(50),
      onNoticePeriod: Joi.boolean(),
      techStack: Joi.array().items(Joi.string().min(1).max(100)),
      joiningLocation: Joi.string().min(1).max(100),
    })
  ),
  projects: Joi.array().items(
    Joi.object({
      projectTitle: Joi.string().min(1).max(100),
      projectDescription: Joi.string().min(1).max(500),
      techStack: Joi.array().items(Joi.string().min(2).max(100)),
      duration: Joi.string().min(1).max(255),
      teamSize: Joi.string().min(1).max(255),
    })
  ),
  skills: Joi.array().items(
    Joi.object({
      skillName: Joi.string().min(1).max(255),
      keywords: Joi.array().items(Joi.string().min(1).max(50)),
      rating: Joi.string(),
    })
  ),
  socialProfiles: Joi.array().items(
    Joi.object({
      title: Joi.string().min(2).max(100),
      link: Joi.string(),
    })
  ),
});

// Using the validation schema in the updateOne function
const updateOne = (model) =>
  expressAsyncHandler(async (req, res) => {
    try {
      const cvId = req.params.id; // Extracting the CV ID from req.params

      // Validate the req.body against the defined schema
      const { error, value } = cvValidationSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const updateData = value; // Use the validated data for update

      const updatedDoc = await model.findByIdAndUpdate(
        cvId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedDoc) {
        return res.status(404).json({ message: "CV not found" });
      }

      res.status(200).json({ data: updatedDoc });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  });

const createOne = (model) =>
  expressAsyncHandler(async (req, res) => {
    try {
      const {
        title,
        template,
        personal,
        education,
        experience,
        skills,
        projects,
        socialProfiles,
      } = req.body; // Destructuring the request body

      const cvData = {
        // Creating the CV data object
        title,
        template,
        personal,
        education,
        experience,
        skills,
        projects,
        socialProfiles,
        createdBy: req.user._id, // Setting the createdBy field
      };

      const doc = await model.create(cvData); // Creating a new document using the model

      res.status(201).json({ data: doc }); // Sending the response with the created document
    } catch (error) {
      console.error(error);
      res.status(400).json(error).end();
    }
  });

const getOne = (model) =>
  expressAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const doc = await model
        .findOne({ createdBy: req.user._id, _id: id })
        .lean()
        .exec();
      if (!doc) {
        res.status(400).json({
          message: "Document Not found",
        });
      } else {
        res.status(200).json({ data: doc });
      }
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({
          message: "Error fetching the data",
        })
        .end();
    }
  });

const getMany = (model) =>
  expressAsyncHandler(async (req, res) => {
    try {
      const docs = await model.find({ createdBy: req.user._id }).lean().exec();
      if (!docs) {
        res.status(404).json({
          message: "Document not found",
        });
      } else {
        res.status(200).json({ data: docs });
      }
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({
          message: "Error Fetching the data",
        })
        .end();
    }
  });

const removeOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    });

    if (!removed) {
      return res.status(400).json({ message: "Document not found" }).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).json(error).end();
  }
};

const crudControllers = (model) => ({
  createOne: createOne(model),
  getOne: getOne(model),
  getMany: getMany(model),
  removeOne: removeOne(model),
  updateOne: updateOne(model),
});
module.exports = { crudControllers };
