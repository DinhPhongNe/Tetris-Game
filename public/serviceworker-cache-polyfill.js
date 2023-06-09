Cache.prototype.add ||
  (Cache.prototype.add = function (t) {
    return this.addAll([t]);
  }),
  Cache.prototype.addAll ||
    (Cache.prototype.addAll = function (t) {
      function e(t) {
        (this.name = "NetworkError"), (this.code = 19), (this.message = t);
      }
      var r = this;
      return (
        (e.prototype = Object.create(Error.prototype)),
        Promise.resolve()
          .then(function () {
            if (arguments.length < 1) throw new TypeError();
            return (
              (t = t.map(function (t) {
                return t instanceof Request ? t : String(t);
              })),
              Promise.all(
                t.map(function (t) {
                  "string" == typeof t && (t = new Request(t));
                  var r = new URL(t.url).protocol;
                  if ("http:" !== r && "https:" !== r)
                    throw new e("Invalid scheme");
                  return fetch(t.clone());
                })
              )
            );
          })
          .then(function (e) {
            return Promise.all(
              e.map(function (e, n) {
                return r.put(t[n], e);
              })
            );
          })
          .then(function () {})
      );
    }),
  CacheStorage.prototype.match ||
    (CacheStorage.prototype.match = function (t, e) {
      var r = this;
      return this.keys().then(function (n) {
        var o;
        return n.reduce(function (n, c) {
          return n.then(function () {
            return (
              o ||
              r
                .open(c)
                .then(function (r) {
                  return r.match(t, e);
                })
                .then(function (t) {
                  return (o = t);
                })
            );
          });
        }, Promise.resolve());
      });
    });
