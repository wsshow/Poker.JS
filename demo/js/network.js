var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

var network = (function () {
  var instance = null;
  function getNetworkInstance() {
    var networkInstance = {
      socket: null,
      hadInit: false,
      init: function (host) {
        this.socket = new WebSocket(host);
        this.socket.onopen = () => {
          this.hadInit = true;
        };
        this.socket.onerror = (e) => {
          console.error(e);
        };
        this.socket.onclose = () => {
          this.hadInit = false;
        };
      },
      send: function (data) {
        if (!this.hadInit) {
          console.log("network hadn't been initialized yet");
        } else if (this.socket.readyState == WebSocket.OPEN) {
          this.socket.send(data);
        } else {
          console.log("network WebSocket readState:" + this.socket.readyState);
        }
      },
      onmessage: function (fn) {
        this.socket.onmessage = fn;
      },
      close: function () {
        if (this.socket) {
          this.socket.close();
          this.socket = null;
          console.log("network close");
        }
      },
    };
    return networkInstance;
  }

  return {
    getInstance: function () {
      if (instance === null) {
        instance = getNetworkInstance();
      }
      return instance;
    },
  };
})();
