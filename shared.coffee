app.factory "$shared", ($rootScope) ->
  $rootScope.$shared = {}
  build = (message) ->
    "$shared:" + message

  emit: (message, object) ->
    $rootScope.$emit build(message), object
    return

  on: (scope, message, callbackFxn) ->
    cleanUpFxn = $rootScope.$on(build(message), callbackFxn)
    scope.$on "$destroy", ->
      cleanUpFxn()
      return

    return

  set: (key, value) ->
    $rootScope.$shared[key] = value
    $rootScope.$apply()
    return

  get: (key) ->
    $rootScope.$shared[key]

  watch: (key, listener) ->
    $rootScope.$watch "$shared." + key, (newVal, oldVal) ->
      return  unless newVal
      listener newVal, oldVal
      return

    return
