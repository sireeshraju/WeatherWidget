var weatherShowcaseApp = angular.module('weatherShowcaseApp',[]);

        weatherShowcaseApp.factory('forecastBG', ['$http', function ($http) {
            return {
                getWeatherForTown: function (town) {
                    return $http.get('http://api.openweathermap.org/data/2.5/find?q=' + town + '&units=metric&appid=e50b28944e109bf675a44925d275d4ce')
                        .then(function (result) {
                            return result.data;
                        })
                }
            }
        }]);

        weatherShowcaseApp.controller('weatherWidgetController', ['$scope','$http', '$templateCache', 'forecastBG', function($scope,$http, $templateCache, forecastBG){
            $scope.degreeSymbol = "°";
			// change this as per the requirement to show no off days to display in the widget
            $scope.minimaldaysToShowInWidget = 5;

            //on App load, loads Charlotte city weather by default.
            if ($scope.weatherResults === undefined) {
                forecastBG.getWeatherForTown('charlotte').then(function (data) {
                    $scope.temperatureInDegree = data.list[0].main.temp;
                    $scope.temperaturecondition = data.list[0].weather[0].main;
                    $scope.searchedCity = data.list[0].name;
                });
            }

            //When user enters a city and clicks on "GetWeather" Button, the below function will be called.
            $scope.getWeather = function(town) {
                forecastBG.getWeatherForTown(town).then(function(data) {
                    //$scope.weatherResults = data;
                    $scope.weatherResults = data.list;
                    $scope.temperatureInDegree = data.list[0].main.temp;
                    $scope.temperaturecondition = data.list[0].weather[0].main;
                    $scope.searchedCity = data.list[0].name;

                    //sets dynamically the position of the weather image for different conditions of weather
                    switch($scope.temperaturecondition) {
                        case "Cloudy":
                            $scope.position1 = "50% 50%";
                            break;
                        case "Showers":
                            $scope.position1 = "0% 100%";
                            break;
                        case "Partly Cloudy":
                            $scope.position1 = "0% 50%";
                        case "Mostly Sunny":
                            $scope.position1 = "0% 0%";
                        default :
                            $scope.position1 = "0% 0%";
                    }
                });
            }
        }]);
