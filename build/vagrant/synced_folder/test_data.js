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
    "roles" : ["56129324428b4bc12c76198a"],
    "isAdmin": false
}, {
    "_id": ObjectId("54ba1391f59d198d09bfe58f"),
    "username": "lergotestkitchensink",
    "email": "lergotestkitchensink@yopmail.com",
    "password": "ad23f4aaddb75b8a9c046a6c777a8aba0c054415",
    "fullName": "lergotestkitchensink",
    "validated": true,
    "roles" : ["56129324428b4bc12c76198b"],
    "isAdmin": false
}]);


db.lessons.insert([
    {
        "_id" : ObjectId("56877718740b13ca11c55ce4"),
        "age" : 8,
        "createdAt" : "2016-01-02T07:07:04.746Z",
        "language" : "english",
        "lastUpdate" : 1451722332581,
        "name" : "lesson_with_openQuestion_mediaExplanationOnly",
        "public" : 1451718523451,
        "steps" : [
            {
                "testMode" : "False",
                "type" : "quiz",
                "quizItems" : [
                    "568762fd740b13ca11c55cc3",
                    "5585a617dd163ea327bbfe69"
                ]
            }
        ],
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 27,
        "description" : "jk",
        "subject" : "english"
    },
    {
        "_id" : ObjectId("56878694740b13ca11c55d2b"),
        "age" : 8,
        "createdAt" : "2016-01-02T08:13:08.546Z",
        "language" : "english",
        "lastUpdate" : 1451722418688,
        "name" : "lesson_with_openQuestion_explanation_andRetry",
        "public" : 1451722432318,
        "steps" : [
            {
                "testMode" : "False",
                "type" : "quiz",
                "quizItems" : [
                    "568762fd740b13ca11c55cc3",
                    "5585a617dd163ea327bbfe69"
                ],
                "retryQuestion" : true,
                "title" : "my_quiz"
            }
        ],
        "subject" : "english",
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 6
    },
    {
        "_id" : ObjectId("5686aefb740b13ca11c55caf"),
        "age" : 8,
        "createdAt" : "2016-01-01T16:53:15.395Z",
        "language" : "english",
        "lastUpdate" : 1451667202355,
        "name" : "explanation_media_display_openQuestionQuizMode",
        "public" : 1451667221955,
        "steps" : [
            {
                "testMode" : "False",
                "type" : "quiz",
                "title" : "my_quiz",
                "quizItems" : [
                    "5686ade8740b13ca11c55ca8"
                ]
            }
        ],
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 3
    },
    {
        "_id" : ObjectId("5686addf740b13ca11c55ca7"),
        "age" : 8,
        "createdAt" : "2016-01-01T16:48:31.168Z",
        "language" : "english",
        "lastUpdate" : 1451667209445,
        "name" : "explanation_media_display_openQuestionTestMode",
        "steps" : [
            {
                "testMode" : "True",
                "type" : "quiz",
                "title" : "my_quiz",
                "quizItems" : [
                    "5686ade8740b13ca11c55ca8"
                ]
            }
        ],
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 5,
        "public" : 1451667221954
    },
    {
        "_id" : ObjectId("5686ac11740b13ca11c55c97"),
        "age" : 8,
        "createdAt" : "2016-01-01T16:40:49.545Z",
        "language" : "english",
        "lastUpdate" : 1451666465915,
        "name" : "explanation_media_display_showIffWrong",
        "public" : 1451666474151,
        "steps" : [
            {
                "testMode" : "False",
                "type" : "quiz",
                "quizItems" : [
                    "5686ab32740b13ca11c55c8c"
                ],
                "title" : "my_quiz"
            }
        ],
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 9
    },
    {
        "_id": ObjectId("5686aa8e740b13ca11c55c89"),
        "age": 8,
        "createdAt": "2016-01-01T16:34:22.466Z",
        "language": "english",
        "lastUpdate": 1451666344498,
        "name": "explanation_media_display_testMode",
        "public": 1451666120290,
        "steps": [
            {
                "testMode": "True",
                "type": "quiz",
                "title": "my quiz",
                "quizItems": [
                    "5686ab32740b13ca11c55c8c"
                ]
            }
        ],
        "tags": [],
        "userId": ObjectId("54ba1391f59d198d09bfe58b"),
        "views": 7

    },
    {
        "_id" : ObjectId("566bf859a2cadd571dc8a685"),
        "age" : 8,
        "createdAt" : "2015-12-12T10:35:05.844Z",
        "language" : "english",
        "lastUpdate" : 1449917968621,
        "name" : "my_practice",
        "public" : 1449916586259,
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
                "title" : "my_quiz"
            }
        ],
        "subject" : "english",
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 8
    },
    {
        "_id" : ObjectId("566bdf33a2cadd571dc8a67a"),
        "age" : 8,
        "createdAt" : "2015-12-12T08:47:47.892Z",
        "language" : "english",
        "lastUpdate" : 1449910096418,
        "name" : "my_test",
        "steps" : [
            {
                "testMode" : "True",
                "type" : "quiz",
                "quizItems" : [
                    "5585a617dd163ea327bbfe69",
                    "5585a63add163ea327bbfe6a",
                    "5585a648dd163ea327bbfe6b",
                    "5585a653dd163ea327bbfe6c",
                    "5585a65edd163ea327bbfe6d"
                ]
            }
        ],
        "subject" : "english",
        "tags" : [ ],
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 8,
        "public" : 1449914373747
    },
    {
        "_id": ObjectId("56619172084ff53a28efb649"),
        "age": 8,
        "createdAt": "2015-12-04T13:13:22.662Z",
        "language": "english",
        "lastUpdate": 1449234888771,
        "name": "lesson_with_openQuestion",
        "public": 1449234990257,
        "steps": [
            {
                "testMode": "False",
                "type": "quiz",
                "title": "My Quiz",
                "quizItems": [
                    "5661918d084ff53a28efb64a",
                    "566191b2084ff53a28efb64b"
                ]
            }
        ],
        "subject": "english",
        "tags": [],
        "userId": ObjectId("54ba1391f59d198d09bfe58c"),
        "views": 15
    },

    {
        "_id": ObjectId("5585adbfddc5c9862231bc4d"),
        "age": 8,
        "createdAt": "2015-06-20T18:15:27.842Z",
        "description": "test_continue_lesson",
        "language": "english",
        "lastUpdate": 1434824173575,
        "name": "test_continue_lesson",
        "public": 1434824313687,
        "steps": [
            {
                "testMode": "False",
                "type": "quiz",
                "quizItems": [
                    "5585a617dd163ea327bbfe69",
                    "5585a63add163ea327bbfe6a",
                    "5585a648dd163ea327bbfe6b",
                    "5585a653dd163ea327bbfe6c",
                    "5585a65edd163ea327bbfe6d"
                ],
                "title": "my quiz"
            }
        ],
        "subject": "english",
        "tags": [],
        "userId": ObjectId("54ba1391f59d198d09bfe58b"),
        "views": 2
    },
        {
            "userId": ObjectId("54ba1391f59d198d09bfe58b"),
            "createdAt": "2015-10-10T13:51:05.268Z",
            "age": 8,
            "_id": ObjectId("561917c9a4121eca2c8153d7"),
            "language": "english",
            "name": "lesson_with_edit_summary",
            "public": 1434824313687,
            "lastUpdate": 1444485120066,
            "steps": [
                {
                    "testMode": "False",
                    "type": "quiz",
                    "quizItems": [
                        "5619159ca4121eca2c8153d3",
                        "561917e6a4121eca2c8153d9"
                    ]
                }
            ],
            "subject": "english"
        },
        {
            "age": 8,
            "description": "This is a lesson with questions that you can copy. \nIn order for users to be able to copy and borrow questions, the questions need to be on a public lesson",
            "name": "lesson_to_copy_1",
            "public": 1434824313687,
            "steps": [
                {
                    "testMode": "False",
                    "type": "quiz",
                    "title": "my quiz",
                    "quizItems": [
                        "561915b7a4121eca2c8153d4",
                        "5619159ca4121eca2c8153d3"
                    ]
                }
            ],
            "language": "english",
            "subject": "english",
            "createdAt": "2015-10-10T14:26:16.252Z",
            "lastUpdate": 1444487176252,
            "userId": ObjectId("54ba1391f59d198d09bfe58c"),
            "_id": ObjectId("56191614a4121eca2c8153d5")
        },
        {
            "age": 8,
            "description": "This is a lesson with questions that you can copy. \nIn order for users to be able to copy and borrow questions, the questions need to be on a public lesson",
            "name": "Copy of : lesson_to_copy_1",
            "public": 1434824313687,
            "steps": [
                {
                    "testMode": "False",
                    "type": "quiz",
                    "title": "my quiz",
                    "quizItems": [
                        "561915b7a4121eca2c8153d4",
                        "5619159ca4121eca2c8153d3"
                    ]
                }
            ],
            "language": "english",
            "subject": "english",
            "copyOf": [
                ObjectId("56191614a4121eca2c8153d5")
            ],
            "createdAt": "2015-10-10T14:26:16.252Z",
            "lastUpdate": 1444487176252,
            "userId": ObjectId("54ba1391f59d198d09bfe58b"),
            "_id": ObjectId("56192008755baaa735bff6d0")
        },
        {
            "_id" : ObjectId("5634b2a4ae82354414addc04"),
            "age" : 8,
            "createdAt" : "2015-10-31T12:23:00.338Z",
            "language" : "english",
            "lastUpdate" : 1446294204441,
            "name" : "disable_trueFalse",
            "steps" : [
                {
                    "testMode" : "False",
                    "type" : "quiz",
                    "title" : "my quiz",
                    "quizItems" : [
                        "5634b2b4ae82354414addc05"
                    ]
                }
            ],
            "tags" : [ ],
            "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
            "views" : 3
        },
        {
            "_id" : ObjectId("56334026ae82354414addbb7"),
            "age" : 8,
            "createdAt" : "2015-10-30T10:02:14.518Z",
            "language" : "english",
            "lastUpdate" : 1446279264493,
            "name" : "disable_multichoice",
            "steps" : [
                {
                    "testMode" : "False",
                    "type" : "quiz",
                    "title" : "my quiz",
                    "quizItems" : [
                        "56334035ae82354414addbb8",
                        "56346378ae82354414addbed"
                    ],
                    "retryQuestion" : false
                }
            ],
            "tags" : [ ],
            "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
            "views" : 115
        }]);

db.questions.insert([
    {
        "_id" : ObjectId("568762fd740b13ca11c55cc3"),
        "age" : 8,
        "explanation" : "",
        "language" : "english",
        "lastUpdate" : 1451718451046,
        "question" : "open_with_media_explanation_only",
        "subType" : "long",
        "tags" : [ ],
        "type" : "openQuestion",
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 24,
        "explanationMedia" : {
            "type" : "image",
            "imageUrl" : "http://icowebsolutions.com/wp-content/uploads/2015/11/Ninja-Shadow-2.png"
        }
    },
    {
        "_id" : ObjectId("5686ade8740b13ca11c55ca8"),
        "age" : 8,
        "explanationMedia" : {
            "type" : "image",
            "imageUrl" : "http://pngimg.com/upload/plane_PNG5253.png"
        },
        "language" : "english",
        "lastUpdate" : 1451666953805,
        "question" : "explanation_media_display_openQuestion",
        "subType" : "long",
        "tags" : [ ],
        "type" : "openQuestion",
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 6
    },
    {
        "_id" : ObjectId("5686ab32740b13ca11c55c8c"),
        "age" : 8,
        "answer" : "True",
        "language" : "english",
        "lastUpdate" : 1451666324620,
        "question" : "explanation_media_true_false_question",
        "tags" : [ ],
        "type" : "trueFalse",
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 16,
        "explanationMedia" : {
            "type" : "image",
            "imageUrl" : "http://pngimg.com/upload/plane_PNG5253.png"
        },
        "explanation" : "nope!"
    },
    {
        "subject": "english",
        "age": 8,
        "language": "english",
        "tags": [],
        "userId": ObjectId("54ba1391f59d198d09bfe58c"),
        "_id": ObjectId("566191b2084ff53a28efb64b"),
        "question": "question_2",
        "lastUpdate": 1449234884035,
        "type": "openQuestion",
        "subType": "long",
        "explanation": "another explanation",
        "hint": ""
    },

    {
	"_id" : ObjectId("5661918d084ff53a28efb64a"),
	"age" : 8,
	"explanation" : "this is explanation",
	"hint" : "this is hint",
	"language" : "english",
	"lastUpdate" : 1449234856896,
	"question" : "question_1",
	"subType" : "long",
	"subject" : "english",
	"tags" : [ ],
	"type" : "openQuestion",
	"userId" : ObjectId("54ba1391f59d198d09bfe58c"),
	"views" : 6
},

    {
        "_id": ObjectId("5585a617dd164ea327bbfe69"),
        "age": 8,
        "answer": "True",
        "helpText": "private_question_1",
        "language": "english",
        "lastUpdate": 1434822196998,
        "question": "private_question_1",
        "subject": "english",
        "tags": [],
        "type": "trueFalse",
        "userId": ObjectId("54ba1391f59d198d09bfe58b"),
        "views": 1
    },
    {
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
    },
    {
        "language" : "english",
        "userId" : ObjectId("54ba1391f59d198d09bfe58c"),
        "_id" : ObjectId("5619159ca4121eca2c8153d3"),
        "lastUpdate" : 1444484529382,
        "type" : "trueFalse",
        "question" : "q_from_other_1",
        "helpText" : "",
        "subject" : "english",
        "age" : 4,
        "answer" : "True"
    },
    {
        "language" : "english",
        "userId" : ObjectId("54ba1391f59d198d09bfe58c"),
        "_id" : ObjectId("561915b7a4121eca2c8153d4"),
        "lastUpdate" : 1444484544701,
        "question" : "q_to_copy_1",
        "type" : "trueFalse",
        "subject" : "english",
        "answer" : "True"
    },
    {
        "language" : "english",
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "question" : "Copy of : q_to_copy_1",
        "type" : "trueFalse",
        "subject" : "english",
        "answer" : "True",
        "lastUpdate" : 1444485094708,
        "copyOf" : [
            "561915b7a4121eca2c8153d4"
        ],
        "_id" : ObjectId("561917e6a4121eca2c8153d9")
    },
    {
        "_id" : ObjectId("56334035ae82354414addbb8"),
        "age" : 8,
        "language" : "english",
        "lastUpdate" : 1446199365827,
        "options" : [
            {
                "label" : "option1",
                "checked" : true
            },
            {
                "label" : "option2"
            },
            {
                "label" : "option3"
            }
        ],
        "question" : "option1",
        "tags" : [ ],
        "type" : "multipleChoices",
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 35
    },
    {
        "_id" : ObjectId("56346378ae82354414addbed"),
        "age" : 8,
        "language" : "english",
        "lastUpdate" : 1446273940670,
        "options" : [
            {
                "label" : "option1",
                "checked" : true
            },
            {
                "label" : "option2",
                "checked" : true
            },
            {
                "label" : "option3"
            }
        ],
        "question" : "option1_and_option2",
        "tags" : [ ],
        "type" : "multipleChoices",
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 12
    },
    {
        "_id" : ObjectId("5634b2b4ae82354414addc05"),
        "age" : 8,
        "answer" : "True",
        "language" : "english",
        "lastUpdate" : 1446294202891,
        "question" : "true",
        "tags" : [ ],
        "type" : "trueFalse",
        "userId" : ObjectId("54ba1391f59d198d09bfe58b"),
        "views" : 3
    } ]);

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
            "lessons.userCanPublish",
            "lessons.userCanSeePrivateLessons",
            "lessons.userCanPreview",
            "questions.userCanEdit",
            "questions.userCanCopy",
            "abuseReports.userCanRead",
            "faqs.userCanCreate",
            "faqs.userCanEdit"
        ],
        "lastUpdate" : 1444057912947
    },
    {
        "name" : "kitchen_sink_role",
        "createdAt" : "2015-10-05T15:11:32.051Z",
        "_id" : ObjectId("56129324428b4bc12c76198b"),
        "permissions" : [
            "misc.userCanSeeKitchenSink",
        ],
        "lastUpdate" : 1444057912947
    }
]);

