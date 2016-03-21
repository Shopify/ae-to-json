module.exports = function(item) {
  var rVal = {};
  var type;

  for(var i in item) {

    if(item[ i ]) {
      // for some reason typeof was failing in ae so using this
      // method instead
      type = getTypeOf(item[ i ]);

      if(type === Object) {
        rVal[ i ] = item[ i ];
      } else if(type === Array) {
        type = getTypeOf(item[ i ][ 0 ]);

        // null is number or string or boolean
        if(type === null) {
          rVal[ i ] = item[ i ].slice();
        }
      // the type is a number string or boolean
      } else if(type === null) {
        rVal[ i ] = item[ i ];
      }
    } else if(item[ i ] === null) {
      rVal[ i ] = item[ i ];
    }
  }

  return rVal;
};

// for some reason typeof is breaking in AE
function getTypeOf(item) {
  var type = null;

  if(item) {
    var strValue = item.toString();
    var isObject = /\[object/.test(strValue);
    var isFunction = /function/.test(strValue);
    var isArray = Array.isArray(item);

    if(isArray) {
      type = Array;
    } else if(isFunction) {
      type = Function;
    } else if(isObject) {
      type = Object;
    } else {
      type = null;
    }
  } else {
    type = null;
  }

  return type;
}