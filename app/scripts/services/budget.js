'use strict';

/**
 * @ngdoc service
 * @name bamApp.Budget
 * @description
 * # Budget
 * Service in the bamApp.
 */
angular.module('bamApp')
  .service('Budget', function ( $http ) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    // parseData takes the next month that needs to be created and its corresponding year. Returns an object with fake budget data.
    parseData = function( month, year ) {
      var date;

      if ( month < 0 ) {
        month = 12 + month;
        year--;
      } else if ( month >= 12 ) {
        month = Math.abs( 12 - month );
        year++;
      }

      date = new Date ( year, month );

      return {
        date: date,
        budget: date < new Date() ? Math.floor( ( Math.random() * 100000 ) + 100 ) : null

      };
    },

    Budget = {
      // get fake budget data for the previous 12 months.
      getLastYrBudget: function ( today, month, year ) {
          var i = 12,
          yearsBudget = [];

        while ( i >= 0 ) {
          yearsBudget.push( parseData(  month - i, year ) );
          i--;
        }
        return yearsBudget;
      },
      // get fake budget data for next three months
      getFutureBudget: function( today, month, year ) {
        var i = 3,
          futureBudget = [];

        while( i > 0 ) {
          futureBudget.push( parseData( month + i, year ) );
          i--;
        }
        return futureBudget;
      },

      getBudget: function () {
        var today = new Date(),
          month = today.getUTCMonth(),
          year = today. getUTCFullYear(),
          lastYr = this.getLastYrBudget( today, month, year ),
          future = this.getFutureBudget( today, month, year ),
          data = lastYr.concat( future );
        // sort by date for UI purposes
        return data.sort( function ( a, b ) {
          return a.date - b.date;
        } ) ;
      },

      saveBudgetData: function ( data ) {
        var savedData = $http.post( 'http://127.0.0.1/budget/', { data: data } )
          .success( function ( status ) {
            return status;
          } )
          .error( function ( status ) {
            return status;
          } );
        return savedData;
      }

    };

    return Budget;

  } );
