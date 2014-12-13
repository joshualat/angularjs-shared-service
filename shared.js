app.factory("$shared", [
  "$rootScope", "$location", function($rootScope, $location) {
    var build;
    $rootScope.$shared = {};
    build = function(message) {
      return "$shared:" + message;
    };
    return {
      goTo: function(url, apply) {
        if (apply == null) {
          apply = false;
        }
        $location.path(url);
        if (apply) {
          return $rootScope.$apply();
        }
      },
      emit: function(message, object) {
        $rootScope.$emit(build(message), object);
      },
      on: function(scope, message, callbackFxn) {
        var cleanUpFxn;
        cleanUpFxn = $rootScope.$on(build(message), callbackFxn);
        scope.$on("$destroy", function() {
          cleanUpFxn();
        });
      },
      set: function(key, value, apply) {
        if (apply == null) {
          apply = false;
        }
        $rootScope.$shared[key] = value;
        if (apply) {
          $rootScope.$apply();
        }
      },
      get: function(key) {
        return $rootScope.$shared[key];
      },
      watch: function(key, listener) {
        $rootScope.$watch("$shared." + key, function(newVal, oldVal) {
          if (!newVal) {
            return;
          }
          listener(newVal, oldVal);
        });
      }
    };
  }
]);