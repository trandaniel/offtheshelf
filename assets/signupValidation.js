var app = angular.module('signUp', []) ;
app.controller('signUpCtrl', function($scope) {
  $scope.checkPw = function() {
    if($scope.signup.password.$viewValue === undefined) {
      return false ;
    }
    if(($scope.signup.password.$viewValue.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) === -1)) {
      return true ;
    }
    else {
      return false ;
    }
  } ;
  $scope.checkMatch = function () {
    if(!$scope.signup.confirmpass.$viewValue === undefined) {
      return false ;
    }
    if(!($scope.signup.password.$viewValue === $scope.signup.confirmpass.$viewValue)) {
      return true ;
    }
    else {
      return false ;
    }
  }
  $scope.checkStNum = function() {
    if($scope.signup.stNum.$viewValue === undefined) {
      return false ;
    }
    console.log(isNaN($scope.signup.stNum.$viewValue)) ;
    if(isNaN($scope.signup.stNum.$viewValue)) {
      return true ;
    }
    else {
      return false ;
    }
  } ;
}) ;
