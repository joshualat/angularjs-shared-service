angularjs-shared-service
========================

$shared service to avoid using $rootScope


Basic usage
-----------

Get / Set

~~~ js
$shared.set('someKey', 'hello!')
$shared.get('someKey')
~~~

Watch

~~~ js
$shared.watch('someKey', function(newVal) {
  alert(newVal);
});
~~~

Emit / On

~~~ js
$shared.on($scope, "someSignal", function(event, data) {
  alert(data)
});

$shared.emit("someSignal", "someMessage");
~~~