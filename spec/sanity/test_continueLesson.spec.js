'use strict';

var logger = require('log4js').getLogger('example_spec');
var components = require('../../source/components/index');
var _ = require('lodash');
//
describe('lergo continue lesson', function() {




  /**
   *
   *
   *
   * This test expects a public lesson named "test-continueWithShuffle"
   *
   * It should have 5 true/false questions with shuffle enabled.
   * It will:
   *    1. Log in as user X
   *    2. Search the lesson on homepage - expects only 1
   *    3. Start the lesson
   *    4. Do one question (Q1)
   *    5. Go to reports
   *    6. See that lesson is incomplete and "continue" option is available
   *    7. Continue the lesson
   *    8. Make sure Q1 does not repeat itself
   *
   */
  it('should continue lesson', function( done ) {

    //browser.ignoresynchronisation = true;
    logger.info('starting test');
    browser.get('/');


    // 1. login as user X
    components.loginPage.load().login( components.conf.continueLesson.username, components.conf.continueLesson.password);
    // 2. search lesson on homepage
    components.homepage.startLesson({'name' : 'test_continue_lesson'});

    components.lessonIntro.startLesson();

    components.lessonView.questions.trueFalse.answer({ answer : true });


    components.layout.goToMySection();
    components.mySection.goToMyReports();
    components.mySection.reports.seeLessonsDoneByMe();
    components.mySection.reports.goToFirstReport();

    components.lessonReport.getIdFromUrl().then(function(_reportId){
      components.conf.reportId = _reportId;

    });
    components.lessonReport.continueLesson();

    components.lessonView.questions.trueFalse.answer({ answer : false });
    components.lessonView.questions.nextQuestion();
    components.lessonView.questions.trueFalse.answer({ answer : true });
    components.lessonView.questions.trueFalse.answer({ answer : true });
    components.lessonView.questions.trueFalse.answer({ answer : true });

    components.lessonView.nextStep();
    components.lessonView.showReport();

    components.lessonReport.get( components.conf ).then(function( report ){
      expect(_.filter( report.answers, {'checkAnswer' : { 'correct' : true } }).length).toBe(4);
      expect(_.filter( report.answers, {'checkAnswer' : { 'correct' : false} }).length).toBe(1);

    });

    components.layout.logout().then(function(){ done(); });
    browser.sleep(1000);

  });

  //describe('todo list', function() {
  //  var todoList;
  //
  //  beforeEach(function() {
  //    browser.get('http://www.angularjs.org');
  //
  //    todoList = element.all(by.repeater('todo in todos'));
  //  });
  //
  //  it('should list todos', function() {
  //    expect(todoList.count()).toEqual(2);
  //    expect(todoList.get(1).getText()).toEqual('build an angular app');
  //  });
  //
  //  it('should add a todo', function() {
  //    var addTodo = element(by.model('todoText'));
  //    var addButton = element(by.css('[value="add"]'));
  //
  //    addTodo.sendKeys('write a protractor test');
  //    addButton.click();
  //
  //    expect(todoList.count()).toEqual(3);
  //    expect(todoList.get(2).getText()).toEqual('write a protractor test');
  //  });
  //});
});
