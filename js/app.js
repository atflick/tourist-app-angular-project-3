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
  .factory("PhotoFactory", [
    "$resource",
    PhotoFactoryFunction
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
    .state("eventIndex", {
      url: "/events",
      templateUrl: "js/ng-views/events/index.html",
      controller: "EventIndexController",
      controllerAs: "vm"
    })
    .state("eventNew", {
      url: "/events/new",
      templateUrl: "js/ng-views/events/new.html",
      controller: "EventNewController",
      controllerAs: "vm"
    })
    .state("eventEdit", {
      url: "/events/:id/edit",
      templateUrl: "js/ng-views/events/edit.html",
      controller: "EventEditController",
      controllerAs: "vm"
    })
    .state("eventShow", {
      url: "/events/:id",
      templateUrl: "js/ng-views/events/show.html",
      controller: "EventShowController",
      controllerAs: "vm"
    })
    .state("photosIndex", {
      url: "/photos/:id",
      templateUrl: "js/ng-views/photos/index.html",
      controller: "PhotosIndexController",
      controllerAs: "vm"
    })
    .state("photosShow", {
      url: "/photos/show/:id",
      templateUrl: "js/ng-views/photos/show.html",
      controller: "PhotoShowontroller",
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

function PhotoFactoryFunction($resource) {
  return $resource("http://localhost:3000/photos/:id", {}, {
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
  ])  // Event Controllers
  .controller("EventIndexController", [
    "$stateParams",
    "$state",
    "EventFactory",
    EventIndexControllerFunction
  ])
  .controller("EventNewController", [
    "$stateParams",
    "$state",
    "EventFactory",
    EventNewControllerFunction
  ])
  .controller("EventEditController", [
    "$stateParams",
    "$state",
    "EventFactory",
    EventEditControllerFunction
  ])
  .controller("EventShowController", [
    "$stateParams",
    "$state",
    "LocationFactory",
    "EventFactory",
    EventShowControllerFunction
  ])


// Location Controller Functions
function LocationIndexControllerFunction($stateParams, $state, LocationFactory) {
  this.locations = LocationFactory.query();
  this.setUrl = function(url) {
    return `url("${url}")`
  }
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

function EventIndexControllerFunction($stateParams, $state, EventFactory) {
  this.events = EventFactory.query();
}

function EventNewControllerFunction($stateParams, $state, EventFactory) {
  this.event = new EventFactory();
  this.addEvent = function(){
    this.event.$save(function(event){
      $state.go("eventShow", {id: location.id});
    })
  }
}

function EventEditControllerFunction($stateParams, $state, EventFactory) {
  this.event = EventFactory.get({id: $stateParams.id});
  this.updateEvent = function(){
    this.event.$update({id: $stateParams.id}, function(){
      $state.go("eventShow", {id: $stateParams.id});
    });
  }
  this.deleteEvent = function(){
    this.event.$delete({id: $stateParams.id}, function(){
      $state.go("eventIndex");
    })
  }
}

function EventShowControllerFunction($stateParams, $state, LocationFactory, EventFactory) {
  this.location = LocationFactory.get({id: $stateParams.id});
  this.events = EventFactory.query();
}

// Photos Controllers
angular.module("touristapp")
  .controller("PhotosIndexController", [
    "$stateParams",
    "$state",
    "PhotoFactory",
    PhotosIndexControllerFunction
  ])
  .controller("PhotoShowController", [
    "$stateParams",
    "$state",
    "PhotoFactory",
    PhotoShowControllerFunction
  ])

// Photos Controller Functions
function PhotosIndexControllerFunction($stateParams, $state, PhotoFactory) {
  this.photos = PhotoFactory.query();
  this.event = $stateParams.id;
  this.currentImage = {};
  this.currentImageUrl = setUrl(this.currentImage.img_url)
  this.setCurrentImage = function(photo) {
    this.currentImage = photo;
    this.currentImageUrl = setUrl(photo.img_url)
    console.log(photo);
  }
  this.photo = new PhotoFactory();
  this.addPhoto = function(){
    this.photo.event_id = this.event;
    this.photo.$save(function(){
      $state.reload();
    })
  }
}

function PhotoShowControllerFunction($stateParams, $state, PhotoFactory) {
  this.photo = PhotoFactory.get({id: $stateParams.id})
}

function setUrl(url) {
  return `url("${url}")`
}
