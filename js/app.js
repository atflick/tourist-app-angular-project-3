let locations = [
  {id: 1, city: "Washington", state: "DC", country: "USA", img_url: "", area: ""},
  {id: 2, city: "New York City", state: "NY", country: "USA", img_url: "", area: ""},
  {id: 3, city: "Boston", state: "MA", country: "USA", img_url: "", area: ""}
]



angular
  .module("touristapp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  // For when we have Rails setup
  // .factory("LocationFactory", [
  //   "$resource",
  //   LocationFactoryFunction
  // ])
  .controller("LocationIndexController", [
    "$stateParams",
    "$state",
    // Needed for rails
    // "LocationFactory",
    LocationIndexControllerFunction
  ])
  .controller("LocationNewController", [
    "$stateParams",
    "$state",
    // Needed for rails
    // "LocationFactory",
    LocationNewControllerFunction
  ])
  .controller("LocationEditController", [
    "$stateParams",
    "$state",
    // Needed for rails
    // "LocationFactory",
    LocationEditControllerFunction
  ])
  .controller("LocationShowController", [
    "$stateParams",
    "$state",
    // Needed for rails
    // "LocationFactory",
    LocationShowControllerFunction
  ])

function RouterFunction($stateProvider){
  $stateProvider
    .state("locationIndex", {
      url: "/locations",
      templateUrl: "js/ng-views/locations/index.html",
      controller: "LocationIndexController",
      controllerAs: "vm"
    })
    .state("locationNew", {
      url: "/locations/new",
      templateUrl: "js/ng-views/locations/new.html",
      controller: "LocationNewController",
      controllerAs: "vm"
    })
    .state("locationEdit", {
      url: "/locations/:id/edit",
      templateUrl: "js/ng-views/locations/edit.html",
      controller: "LocationEditController",
      controllerAs: "vm"
    })
    .state("locationShow", {
      url: "/locations/:id",
      templateUrl: "js/ng-views/locations/show.html",
      controller: "LocationShowController",
      controllerAs: "vm"
    })
}

// Needed for rails
// function LocationFactoryFunction($resource) {
//   return $resource("http://localhost:3000/locations/:id", {}, {
//     update: { method: "PUT" }
//   })
// }


function LocationIndexControllerFunction($stateParams, $state) {
  this.locations = locations;

  // Rails
  // this.locations = LocationFactory.query();
}

function LocationNewControllerFunction($stateParams, $state) {
  this.newLocation = {};
  this.addLocation = function() {
    locations.push(this.newLocation);
    $state.go("locationIndex");
    console.log(locations);
  }

  // Rails
  // this.location = new LocationFactory();
  // this.addLocation = function(){
  //   this.location.$save(function(location){
  //     $state.go("locationShow", {id: location.id});
  //   })
  // }
}

function LocationEditControllerFunction($stateParams, $state) {
  this.location = locations[$stateParams.id - 1];

  // Rails
  // this.location = LocationFactory.get({id: $stateParams.id});
  // this.updateLocation = function(){
  //   this.location.$update({id: $stateParams.id})
  // }
  // this.deleteLocation = function(){
  //   this.location.$delete({id: $stateParams.id}, function(){
  //     $state.go("locationIndex");
  //   })
  // }
}

function LocationShowControllerFunction($stateParams, $state) {
  this.location = locations[$stateParams.id - 1];

  // Rails
  // this.location = LocationFactory.get({id: $stateParams.id});
}
