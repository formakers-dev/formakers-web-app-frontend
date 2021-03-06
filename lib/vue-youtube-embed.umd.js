'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Vue YouTube Embed version 2.2.0
 * under MIT License copyright 2018 kaorun343
 */
(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.VueYouTubeEmbed = {});
})(undefined, function (exports) {
  'use strict';

  // fork from https://github.com/brandly/angular-youtube-embed

  if (!String.prototype.includes) {
    String.prototype.includes = function () {
      return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
  }

  var youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
  var timeRegexp = /t=(\d+)[ms]?(\d+)?s?/;

  /**
   * get id from url
   * @param  {string} url url
   * @return {string}     id
   */
  function getIdFromURL(url) {
    var id = url.replace(youtubeRegexp, '$1');

    if (id.includes(';')) {
      var pieces = id.split(';');

      if (pieces[1].includes('%')) {
        var uriComponent = decodeURIComponent(pieces[1]);
        id = ('http://youtube.com' + uriComponent).replace(youtubeRegexp, '$1');
      } else {
        id = pieces[0];
      }
    } else if (id.includes('#')) {
      id = id.split('#')[0];
    }

    return id;
  }

  /**
   * get time from url
   * @param  {string} url url
   * @return {number}     time
   */
  function getTimeFromURL() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var times = url.match(timeRegexp);

    if (!times) {
      return 0;
    }

    var _times = (0, _slicedToArray3.default)(times, 1),
      full = _times[0];

    var _times2 = (0, _slicedToArray3.default)(times, 3),
      minutes = _times2[1],
      seconds = _times2[2];

    if (typeof seconds !== 'undefined') {
      seconds = parseInt(seconds, 10);
      minutes = parseInt(minutes, 10);
    } else if (full.includes('m')) {
      minutes = parseInt(minutes, 10);
      seconds = 0;
    } else {
      seconds = parseInt(minutes, 10);
      minutes = 0;
    }

    return seconds + minutes * 60;
  }

  var container = {
    scripts: [],
    events: {},

    run: function run() {
      var _this = this;

      this.scripts.forEach(function (callback) {
        callback(_this.YT);
      });
      this.scripts = [];
    },
    register: function register(callback) {
      var _this2 = this;

      if (this.YT) {
        this.Vue.nextTick(function () {
          callback(_this2.YT);
        });
      } else {
        this.scripts.push(callback);
      }
    }
  };

  var pid = 0;

  var YouTubePlayer = {
    props: {
      playerHeight: {
        type: [String, Number],
        default: '390'
      },
      playerWidth: {
        type: [String, Number],
        default: '640'
      },
      playerVars: {
        type: Object,
        default: function _default() {
          return { autoplay: 0, time: 0 };
        }
      },
      videoId: {
        type: String
      },
      mute: {
        type: Boolean,
        default: false
      }
    },
    render: function render(h) {
      return h('div', [h('div', { attrs: { id: this.elementId } })]);
    },

    template: '<div><div :id="elementId"></div></div>',
    watch: {
      playerWidth: 'setSize',
      playerHeight: 'setSize',
      videoId: 'update',
      mute: 'setMute'
    },
    data: function data() {
      pid += 1;
      return {
        elementId: 'youtube-player-' + pid,
        player: {}
      };
    },

    methods: {
      setSize: function setSize() {
        this.player.setSize(this.playerWidth, this.playerHeight);
      },
      setMute: function setMute(value) {
        if (value) {
          this.player.mute();
        } else {
          this.player.unMute();
        }
      },
      update: function update(videoId) {
        var name = (this.playerVars.autoplay ? 'load' : 'cue') + 'VideoById';
        if (this.player.hasOwnProperty(name)) {
          this.player[name](videoId);
        } else {
          setTimeout(function () {
            this.update(videoId);
          }.bind(this), 100);
        }
      }
    },
    mounted: function mounted() {
      var _this3 = this;

      container.register(function (YouTube) {
        var playerHeight = _this3.playerHeight,
          playerWidth = _this3.playerWidth,
          playerVars = _this3.playerVars,
          videoId = _this3.videoId;


        _this3.player = new YouTube.Player(_this3.elementId, {
          height: playerHeight,
          width: playerWidth,
          playerVars: playerVars,
          videoId: videoId,
          events: {
            onReady: function onReady(event) {
              _this3.setMute(_this3.mute);
              _this3.$emit('ready', event);
            },
            onStateChange: function onStateChange(event) {
              if (event.data !== -1) {
                _this3.$emit(container.events[event.data], event);
              }
            },
            onError: function onError(event) {
              _this3.$emit('error', event);
            }
          }
        });
      });
    },
    beforeDestroy: function beforeDestroy() {
      if (this.player !== null && this.player.destroy) {
        this.player.destroy();
      }
      delete this.player;
    }
  };

  var index = {
    install: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      container.Vue = Vue;
      YouTubePlayer.ready = YouTubePlayer.mounted;
      var _options$global = options.global,
        global = _options$global === undefined ? true : _options$global,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? 'youtube' : _options$componentId;


      if (global) {
        // if there is a global component with "youtube" identifier already taken
        // then we should let user to pass a new identifier.
        Vue.component(componentId, YouTubePlayer);
      }
      Vue.prototype.$youtube = { getIdFromURL: getIdFromURL, getTimeFromURL: getTimeFromURL };

      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function () {
          container.YT = YT;
          var _YT = YT,
            PlayerState = _YT.PlayerState;


          container.events[PlayerState.ENDED] = 'ended';
          container.events[PlayerState.PLAYING] = 'playing';
          container.events[PlayerState.PAUSED] = 'paused';
          container.events[PlayerState.BUFFERING] = 'buffering';
          container.events[PlayerState.CUED] = 'cued';

          container.Vue.nextTick(function () {
            container.run();
          });
        };
      }
    }
  };

  exports.YouTubePlayer = YouTubePlayer;
  exports.getIdFromURL = getIdFromURL;
  exports.getTimeFromURL = getTimeFromURL;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });
});
