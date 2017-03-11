// let locations = [
//   {id: 1, city: "Washington", state: "DC", country: "USA", img_url: "", area: ""},
//   {id: 2, city: "New York City", state: "NY", country: "USA", img_url: "", area: ""},
//   {id: 3, city: "Boston", state: "MA", country: "USA", img_url: "", area: ""}
// ]



angular
  .module("touristapp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("LocationFactory", [
    "$resource",
    LocationFactoryFunction
  ])
  .factory("EventFactory", [
    "$resource",
    EventFactoryFunction
  ])

// Routes
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

// Factory Functions

function LocationFactoryFunction($resource) {
  return $resource("http://localhost:3000/locations/:id", {}, {
    update: { method: "PUT" }
  })
}

function EventFactoryFunction($resource) {
  return $resource("http://localhost:3000/events/:id", {}, {
    update: { method: "PUT" }
  })
}

// Separating our controllers by data model since this might get long and ugly.
// Location Controllers
angular.module("touristapp")
  .controller("LocationIndexController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    LocationIndexControllerFunction
  ])
  .controller("LocationNewController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    LocationNewControllerFunction
  ])
  .controller("LocationEditController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    LocationEditControllerFunction
  ])
  .controller("LocationShowController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    "EventFactory",
    LocationShowControllerFunction
  ])




// Location Controller Functions
function LocationIndexControllerFunction($stateParams, $state, LocationFactory) {
  this.locations = LocationFactory.query();
}

function LocationNewControllerFunction($stateParams, $state, LocationFactory) {
  this.location = new LocationFactory();
  this.addLocation = function(){
    this.location.$save(function(location){
      $state.go("locationShow", {id: location.id});
    })
  }
}

function LocationEditControllerFunction($stateParams, $state, LocationFactory) {
  this.location = LocationFactory.get({id: $stateParams.id});
  this.updateLocation = function(){
    this.location.$update({id: $stateParams.id}, function(){
      $state.go("locationShow", {id: $stateParams.id});
    });
  }
  this.deleteLocation = function(){
    this.location.$delete({id: $stateParams.id}, function(){
      $state.go("locationIndex");
    })
  }
}

function LocationShowControllerFunction($stateParams, $state, LocationFactory, EventFactory) {
  this.location = LocationFactory.get({id: $stateParams.id});
  this.events = EventFactory.query();
}

// Event Controller Functions
