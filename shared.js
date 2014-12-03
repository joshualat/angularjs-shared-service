app.factory('$shared', function ($rootScope) {
  $rootScope.$shared = {};

  var build = function (message) {
    return "$shared:" + message;
  };

  return {
    emit: function (message, object) {
      $rootScope.$emit(build(message), object);
    },

    on: function (scope, message, callbackFxn) {
      var cleanUpFxn = $rootScope.$on(build(message), callbackFxn);

      scope.$on('$destroy', function () {
        cleanUpFxn();
      });
    },

    set: function (key, value) {
      $rootScope.$shared[key] = value;
      $rootScope.$apply();
    },

    get: function (key) {
      return $rootScope.$shared[key];
    },

    watch: function (key, listener) {
      $rootScope.$watch('$shared.' + key, function (newVal, oldVal) {
        if (!newVal) return;

        listener(newVal, oldVal);
      });
    }
  }
});