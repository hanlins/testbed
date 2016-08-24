/**
 * @description This function returns the cookie value with its name.
 * @param name name of the cookie.
 * @param d document (from child).
 * @return cookie value.
 */
function getCookie(name, doc) {
  var value = "; " + doc.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

var tracker_name = "tkc";
var tracker_id = getCookie("IDC", document);

/**
 * @description Create an iframe from domain "trackerc.com"
 * @param url Location of the iframe.
 * @param cookie_name Name of the cookie value we want to fetch.
 * @return 
 */
function createIframe(url, cookie_name) {
}

/**
 * @description Query and update model data of tracking information.
 * @param tracker_name Name of the tracker.
 * @param tracker_id Identifier of the current client associated with the tracker.
 * @return Void.
 */
function updateModel(tracker_name, tracker_id) {
  var app = angular.module('myApp', []);
  app.controller('customersCtrl', function($scope, $http) {
    var url = "http://api.testbed.com/test/record/";
    $http.jsonp(url+"?jsonp=JSON_CALLBACK"+"&filter_name="+tracker_name+"&filter_uid="+tracker_id).success(function(data) {
      $scope.records = data.rows;
    });
  });
}

/**
 * @description Message event handler.
 * @event Message event.
 * @return Void.
 */
function listener(event) {
  var origin = event.origin || event.originalEvent.origin;
  console.log(window.location+': msg received');
  if (origin !== "http://sub1.mylab.com") {
    console.log(window.location+': cannot bypassed domain check');
    //alert("not bypassed");
  } else {
    console.log(window.location+': bypassed domain check');
    //alert("bypassed");
  }
}

/**
 * @description Register an event handler and receive the trakcer from iframe.
 * @return Void.
 */
function registerMsgListener(){
  addEventListener("message", listener, false);
}

registerMsgListener();
