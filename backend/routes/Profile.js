    const express = require('express');
    const router = express.Router();

    const {auth} = require('../middlewares/Authorization');
    const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} = require('../controlers/Profile');

    router.put('/updateProfile', auth, updateProfile);
    router.delete('/deleteAccount', auth, deleteAccount);
    router.get('/getAllUserDetails', auth, getAllUserDetails);
    router.put("/updateDisplayPicture", auth, updateDisplayPicture);
    router.get("/getEnrolledCourses",auth, getEnrolledCourses);

    module.exports = router;