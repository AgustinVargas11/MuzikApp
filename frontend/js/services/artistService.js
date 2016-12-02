(function () {
    'use strict';

    angular
        .module('MediaApp')
        .factory('artistservice', artistservice);

    function artistservice() {

        var artist = [
            'Drake', 'twenty one pilots', 'Rihanna', 'Adele', 'Kali Uchi', 'The Chainsmokers',
            'Ariana Grande', 'Shawn Mendez', 'Justin Beiber', 'Justin Moore', 'Meghan Trainor',
            'PARTYNEXTDOOR', 'Beyonce', 'Usher', 'Sia', 'Blake Shelton', 'Justin Timberlake',
            'Selene Gomez', 'Eminem', 'Major Lazer', 'Katy Perry', 'Michael Jackson', 'Daya',
            'Rae Sremmurd', 'Calvin Harris', 'Charlie Puth', 'Florida Georgia Line', 'Pink',
            'Fifth Harmony', 'Taylor Swift', 'Halsey', 'Kanye West', 'Luke Bryan', 'Future',
            'Lukas Graham', 'Desiigner', 'Chris Brown', 'Jay-Z', 'Nas', 'Lil Wayne', 'DNCE',
            'The Weekend', 'Fetty Wap', 'Bryson Tiller', 'Twenty One Pilots', 'Kevin Gates',
            'G-eazy', 'Tory Lanez', 'Sam Hunt', 'One Direction', 'Frank Ocean', 'Asap Rocky',
            'My Chemical Romance', 'Elvis Presley', 'Johnny Cash', 'Bruno Mars', 'Madonna',
            'Bruce Springsteen', 'Carrie Underwood', 'Britney Spears', 'Alicia Keys',
            'Ed Sheeran', 'Kelly Clarkson', 'Bob Marley'
        ];

        var artistService = {
            getRandomArtist: getRandomArtist
        };

        return artistService;

        function getRandomArtist() {
            var random = Math.floor(Math.random() * artist.length);
            return artist[random];
        }
    }
})();