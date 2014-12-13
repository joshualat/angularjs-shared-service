app.factory "$shared", [
  "$rootScope"
  "$location"
  ($rootScope, $location) ->
    $rootScope.$shared = {}

    build = (message) ->
      "$shared:" + message

    goTo: (url, apply = false) ->
      $location.path(url)
      $rootScope.$apply() if apply

    emit: (message, object) ->
      $rootScope.$emit build(message), object
      return

    on: (scope, message, callbackFxn) ->
      cleanUpFxn = $rootScope.$on(build(message), callbackFxn)
      scope.$on "$destroy", ->
        cleanUpFxn()
        return

      return

    set: (key, value, apply = false) ->
      $rootScope.$shared[key] = value
      $rootScope.$apply() if apply
      return

    get: (key) ->
      $rootScope.$shared[key]

    watch: (key, listener) ->
      $rootScope.$watch "$shared." + key, (newVal, oldVal) ->
        return  unless newVal
        listener newVal, oldVal
        return

      return
]