// import {beforeMethod, Advised, Metadata} from 'aspect.js';

// function Loogger(target, pattern) {
//   return new Proxy(target, {
//       get: function(obj, prop) {
//           var value, name;
//           if (!Reflect.has(obj, prop)) {
//               return;
//           }
//           name = target.name || target.constructor.name;
//           value = Reflect.get(obj, prop);
//           if (typeof value === 'function') {
//               value = function() {
//                   let result = Reflect.apply(obj[prop], obj, arguments);
//                   if (pattern.exec(prop)) {
//                       console.log(`Function ${String(prop)} retrieved result ${JSON.stringify(result)}`);
//                   }
//                   return result;
//               }.bind(obj);
//           }
//           return value;
//       }
//   });
// }

// function wove(pattern) {
//   return function (target) {
//       target.prototype = Loogger(target.prototype, pattern);
//   };
// }

// class CacheAspect {
//     @beforeMethod({
//       methodNamePattern: /^fiddlerLogger.*/,
//       classNamePattern: /^FiddlerLog$/
//     })
//     beforeGet(meta, args) {
//       console.log("ooooooooo",meta, args)
//     }
// }

// @Advised()