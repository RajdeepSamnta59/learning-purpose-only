    const User = require('../models/User');
    const Profile = require('../models/Profile');
    const {uploadImageToCloudinary} = require('../utils/imageUploader')
    const CourseProgress = require('../models/CourseProgress')
    exports.updateProfile = async(req, res) =>{
        try{
            const {dateOfBirth, about = "", gender, contactNumber } = req.body;
            const id = req.user.id;
            if(!contactNumber || !gender || !id){
                return res.status(401).json({
                    massage: "All filds are requird",
                })
            }
            const user = await User.findById(id);
            const profileId = user.additionalDetails;
            const profile = {
                dateOfBirth: dateOfBirth,
                about: about,
                gender: gender,
                contactNumber: contactNumber,
            }
            const updatingProfile = await Profile.findByIdAndUpdate(profileId, profile, {new: true});
            const userDetails = await User.findById(id).populate("additionalDetails").exec();
            res.status(200).json({
                success: true,
                massage: "Profile is updated successfully",
                updatingProfile:userDetails
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in updating profile",
            })
            console.log(error);
        }
    }
    exports.deleteAccount = async(req, res) =>{
        try{
            const id = req.user.id;
            const user = await User.findById(id);
            if(!user){
                return res.status(401).json({
                    massage: "User does not exist",
                })
            }
            await Profile.findByIdAndDelete({_id: user.additionalDetails});
            await User.findByIdAndDelete({_id:id});
            res.status(200).json({
                success: true, 
                massage: "User is deleted successfully",
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in deleting user",
            })
            console.log(error);
        }
    }

    exports.getAllUserDetails = async(req, res) =>{
        try{
            const id = req.user.id;
            const userDetails = await User.findById(id).populate("additionalDetails").exec();
            res.status(200).json({
                success: true,
                massage: "User details is fetched successfully",
                userDetails,
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in fetching user details",
            })
            console.log(error);
        }
    }

    exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    console.log("catch error" ,error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path:"courses",
        populate:{
          path:"courseContent",
          populate:{
            path:"subSection"
          }
        }
      })
      .exec()


      const userDetailsNew = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetailsNew.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetailsNew.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetailsNew.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetailsNew.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetailsNew.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideo.length
		if (SubsectionLength === 0) {
		  userDetailsNew.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetailsNew.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }





    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetailsNew.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

