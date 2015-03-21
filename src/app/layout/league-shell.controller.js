(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LeagueShellCtrl', LeagueShellCtrl);

    LeagueShellCtrl.$inject = ['$state', '$stateParams'];

    function LeagueShellCtrl($state, $stateParams) {
        /* jshint validthis:true */
        var vm = this;
        vm.leagueId = $stateParams.leagueId;
        vm.tabs = [
            { text: 'Trips', state: 'league.teams' },
            { text: 'Events', state: 'league.games' },
            { text: 'Events Calendar', state: 'league.games-calendar' },
            { text: 'News', state: 'league.home' }
        ];

        activate();

        function activate() {
            _.each(vm.tabs, function (tab) {
                tab.active = ($state.current.name === tab.state);
            });
        }
    }
})();