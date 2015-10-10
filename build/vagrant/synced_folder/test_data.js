db.users.insert([{
    "_id": ObjectId("54ba1391f59d198d09bfe58b"),
    "username": "lergotest",
    "email": "lergotest@yopmail.com",
    "password": "65baa7f7641dbb138f9e3e3c0b11a5f01a2dc456",
    "fullName": "lergotest",
    "validated": true,
    "isAdmin": false
}, {
    "_id": ObjectId("54ba1391f59d198d09bfe58c"),
    "username": "lergotestadmin",
    "email": "lergotestadmin@yopmail.com",
    "password": "8ff5b889f0cdea0474c5a826b6ebc31f11733932",
    "fullName": "lergotestadmin",
    "validated": true,
    "isAdmin": true
}, {
    "_id": ObjectId("54ba1391f59d198d09bfe58d"),
    "username": "simple_user",
    "email": "simple_user@yopmail.com",
    "password": "ab89f0030d8e2e1989110714b3921ab415023298",
    "fullName": "simple_user",
    "validated": true,
    "isAdmin": false
}, {
    "_id": ObjectId("54ba1391f59d198d09bfe58e"),
    "username": "lergotesteditor",
    "email": "lergotesteditor@yopmail.com",
    "password": "d9a73d1fa3b7478b11a28feaca5b7c95b1125024",
    "fullName": "lergotesteditor",
    "validated": true,
    "roles" : ["56129324428b4bc12c76197g"],
    "isAdmin": false
}]);


db.lessons.insert({
        "_id" : ObjectId("5585adbfddc5c9862231bc4d"),
        "age" : 8,
        "createdAt" : "2015-06-20T18:15:27.842Z",
        "description" : "test_continue_lesson",
        "language" : "english",
        "lastUpdate" : 1434824173575,
        "name" : "test_continue_lesson",
        "public" : 1434824313687,
        "steps" : [
            {
                "testMode" : "False",
                "type" : "quiz",
                "quizItems" : [
                    "5585a617dd163ea327bbfe69",
                    "5585a63add163ea327bbfe6a",
                    "5585a648dd163ea327bbfe6b",
                    "5585a653dd163ea327bbfe6c",
                    "5585a65edd163ea327bbfe6d"
                ],
                "title" : "my quiz"
            }
        ],
        "subject" : "english",
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 2
    }
);

db.questions.insert([{
    "_id": ObjectId("5585a617dd163ea327bbfe69"),
    "age": 8,
    "answer": "True",
    "helpText": "question_1",
    "language": "english",
    "lastUpdate": 1434822196998,
    "question": "question_1",
    "subject": "english",
    "tags": [],
    "type": "trueFalse",
    "userId": ObjectId("54ba1391f59d198d09bfe58b"),
    "views": 1
},
    {
        "_id": ObjectId("5585a63add163ea327bbfe6a"),
        "age": 8,
        "answer": "True",
        "helpText": "question_2",
        "language": "english",
        "lastUpdate": 1434822214074,
        "question": "question_2",
        "subject": "english",
        "tags": [],
        "type": "trueFalse",
        "userId": ObjectId("54ba1391f59d198d09bfe58b"),
        "views": 1
    },
    {
        "_id": ObjectId("5585a648dd163ea327bbfe6b"),
        "age": 8,
        "answer": "True",
        "helpText": "question_3",
        "language": "english",
        "lastUpdate": 1434822224706,
        "question": "question_3",
        "subject": "english",
        "tags": [],
        "type": "trueFalse",
        "userId": ObjectId("54ba1391f59d198d09bfe58b"),
        "views": 1
    },
    {
        "_id": ObjectId("5585a653dd163ea327bbfe6c"),
        "age": 8,
        "answer": "True",
        "helpText": "question_4",
        "language": "english",
        "lastUpdate": 1434822237291,
        "question": "question_4",
        "subject": "english",
        "tags": [],
        "type": "trueFalse",
        "userId": ObjectId("54ba1391f59d198d09bfe58b"),
        "views": 1
    },
    {
        "_id": ObjectId("5585a65edd163ea327bbfe6d"),
        "age": 8,
        "answer": "True",
        "helpText": "question_5",
        "language": "english",
        "lastUpdate": 1434822249122,
        "question": "question_5",
        "subject": "english",
        "tags": [],
        "type": "trueFalse",
        "userId": ObjectId("54ba1391f59d198d09bfe58b"),
        "views": 1
    }
]);

db.roles.insert([
    {
        "name" : "role_to_assign",
        "createdAt" : "2015-10-05T15:11:32.051Z",
        "_id" : ObjectId("56129324428b4bc12c76197f"),
        "permissions" : [
            "lessons.userCanEdit",
            "lessons.userCanCopy",
            "lessons.userCanDelete",
            "lessons.userCanPublish",
            "lessons.userCanSeePrivateLessons",
            "lessons.userCanPreview"
        ],
        "lastUpdate" : 1444057912947
    },
    {
        "name" : "lesson_editor_role",
        "createdAt" : "2015-10-05T15:11:32.051Z",
        "_id" : ObjectId("56129324428b4bc12c76198a"),
        "permissions" : [
            "lessons.userCanEdit",
            "lessons.userCanCopy",
            "lessons.userCanDelete",
            "lessons.userCanPublish",
            "lessons.userCanSeePrivateLessons",
            "lessons.userCanPreview"
        ],
        "lastUpdate" : 1444057912947
    }

]);

