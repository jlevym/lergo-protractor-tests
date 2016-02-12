'use strict';

/**
 * even though not strictly related to intro page, saw no need to put it in a different place.
 **/


exports.setStudentName = (name)=>{
    $m('classInvite.studentName').sendKeys(name);
};

exports.submit = () => {
    $click('createReportFromClassInvite()').click();
};
