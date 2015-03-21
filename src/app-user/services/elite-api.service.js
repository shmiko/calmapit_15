(function () {
    'use strict';

    angular.module('eliteApp').factory('eliteApi', eliteApi);

    eliteApi.$inject = ['$q', '$http', 'appSpinner'];

    function eliteApi($q, $http, appSpinner) {
        var mainPromise;

        var service = {
            getAllLeagueData: getAllLeagueData
        };

        var baseUrl = 'https://elite-schedule.azure-mobile.net/tables';
        var requestConfig = {
            headers: {
                'X-ZUMO-APPLICATION': 'GSECUHNQOOrCwgRHFFYLXWiViGnXNV88'
            }
        };

        return service;


        function getAllLeagueData(leagueId){
            if (mainPromise){
                return mainPromise;
            }
            console.log("results should be ",leagueId);
                
            mainPromise = $q.all([
                getTeams(leagueId),
                getGames(leagueId),
                getLeague(leagueId),
                getLocations()
            ]).then(function(results){
                return {
                    teams: results[0],
                    games: results[1],
                    league: results[2],
                    locations: results[3]
                };
            });
            return mainPromise;
        }

        function getLeagues() {
            return httpGet('/leagues');
        }


        function getGames(leagueId){
            var url = getUrlByLeagueId('/games', leagueId);
            return httpGet(url);
        }

        function getLeague(leagueId){
            return httpGet('/leagues/' + leagueId);
        }

        function getLocations() {
            return httpGet('/locations');
        }

        function getTeams(leagueId) {
            var url = getUrlByLeagueId('/teams', leagueId);
            return httpGet(url);
        }


        /** Private Methods **/

        function getUrlByLeagueId(url, leagueId){
            return url + '?$top=100&$filter=' + encodeURIComponent('leagueId eq \'' + leagueId + '\'');
        }

        function httpExecute(requestUrl, method, data){
            appSpinner.showSpinner();
            return $http({
                url: baseUrl + requestUrl,
                method: method,
                data: data,
                headers: requestConfig.headers }).then(function(response){

                appSpinner.hideSpinner();
                console.log('**response from url', response, requestUrl);
                return response.data;
            });
        }

        function httpGet(url){
            console.log('**request to ', url);
            return httpExecute(url, 'GET');
        }
    }
})();
