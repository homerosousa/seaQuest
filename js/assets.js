(function() {
    Assets = {
        loaded: {},
        callbacks: [],
        loading: function(arr) {
            for (var i = 0; i < arr.length; i++) {
                Assets.loadImages(arr[i]);
            }
        },
        loadImages: function(url) {
            // preload images
            if (Assets.loaded[url]) {
                return Assets.loaded[url];
            } else {
                var imagen = new Image();
                imagen.onload = function() {
                    Assets.loaded[url] = imagen;
                    if (Assets.ready()) {
                        Assets.callbacks.forEach(function(fn) {
                            fn();
                        });
                    }
                };
                Assets.loaded[url] = false;
                imagen.src = url;
            }
        },
        get: function(url) {
            // method to get image
            return Assets.loaded[url];
        },
        ready: function() {
            // image ready?
            var ready = true;
            for (var p in this.loaded) {
                if (this.loaded.hasOwnProperty(p) && !this.loaded[p]) {
                    ready = false;
                }
            }
            return ready;
        },
        onFinish: function(fn) {
            Assets.callbacks.push(fn);
        }
    };
})();