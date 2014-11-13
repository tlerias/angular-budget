'use strict';

/**
 * @ngdoc function
 * @name bamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bamApp
 */
angular.module('bamApp')
  .controller('MainCtrl', function ($scope, Budget) {

    $scope.budget = Budget.getBudget();
    $scope.formSubmitted = false;

    //is the month that is being rendered today? if so, add a highlight class.
    $scope.isToday = function ( item ) {
      var today = new Date();
      return item.date.getUTCMonth() === today.getUTCMonth() && item.date.getUTCFullYear() === today.getUTCFullYear();
    };

    $scope.isPastDate = function ( date ) {
      var today = new Date();
      today.setMonth( today.getMonth() - 1 );
      return date < today;
    };

    $scope.saveData = function ( updatedForm ) {
      Budget.saveBudgetData( updatedForm ).then( function ( data ) {
        console.log( data );
        $scope.formSubmitted = true;
      } );
    };



  });
