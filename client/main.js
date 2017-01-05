import Highcharts from 'highcharts';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

  Template.body.helpers({
    createChart: function () {
      // Gather data: 
      var allTasks = 43,
          incompleteTask = 28,
          task3 = 3,
          task4 = 10,
            tasksData = [{
                y: incompleteTask,
                name: "Incomplete"
             }, {
                y: task3,
                name: "Unknown"
             },{
                y: task4,
                name: "Pending"
             },{
                 y: allTasks - incompleteTask - task3 - task4,
                 name: "Complete"
             }];
      // Use Meteor.defer() to craete chart after DOM is ready:
      Meteor.defer(function() {
        // Create standard Highcharts chart with options:
        Highcharts.chart('chart', {
          series: [{
            type: 'pie',
            data: tasksData
          }]
        });
      });
    }
  });
