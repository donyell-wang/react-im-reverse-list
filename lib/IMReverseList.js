'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _findIndex3 = require('lodash/findIndex');

var _findIndex4 = _interopRequireDefault(_findIndex3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

;


var isSameKeys = function isSameKeys(arraySource, arrayTarget, keyName) {
  var result = true;
  if (arraySource.length !== arrayTarget.length) {
    return false;
  }
  for (var i = 0, len = arraySource.length; i < len; i++) {
    if (arraySource[i][keyName] !== undefined && arraySource[i][keyName] !== arrayTarget[i][keyName]) {
      result = false;
      break;
    }
  }
  return result;
};

var IMMessageList = function (_Component) {
  _inherits(IMMessageList, _Component);

  function IMMessageList(props) {
    _classCallCheck(this, IMMessageList);

    var _this = _possibleConstructorReturn(this, (IMMessageList.__proto__ || Object.getPrototypeOf(IMMessageList)).call(this, props));

    var _props$data = props.data,
        data = _props$data === undefined ? [] : _props$data,
        itemKey = props.itemKey;

    _this.state = {
      keyScrollTo: data.length > 0 ? data[data.length - 1][itemKey] : null
    };

    _this.$listRef = null;
    _this.$itemRef = null;

    _this.lastDataKeys = data.map(function (item) {
      return item[itemKey];
    });
    _this.lastHeadKey = null;
    _this.lastEndKey = null;

    _this.listRefHanlder = _this.listRefHanlder.bind(_this);
    return _this;
  }

  _createClass(IMMessageList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$data = nextProps.data,
          data = _nextProps$data === undefined ? [] : _nextProps$data,
          itemKey = nextProps.itemKey;


      if (data.length > 0) {
        var headIdx = (0, _findIndex4.default)(data, _defineProperty({}, itemKey, this.lastHeadKey));
        var endIdx = (0, _findIndex4.default)(data, _defineProperty({}, itemKey, this.lastEndKey));

        if (this.lastHeadKey !== null && this.lastEndKey !== null) {
          if (headIdx > 0 && endIdx === data.length - 1) {
            //load upward
            this.setState({
              keyScrollTo: data[headIdx][itemKey]
            });
          } else if (headIdx === 0 && endIdx < data.length - 1) {
            //load downward
            this.setState({
              keyScrollTo: data[endIdx + 1][itemKey]
            });
          } else if (headIdx > 0 && endIdx < data.length - 1) {
            // load bothside
            this.setState({
              keyScrollTo: data[endIdx + 1][itemKey]
            });
          }
        }

        this.lastHeadKey = data[0][itemKey];
        this.lastEndKey = data[data.length - 1][itemKey];
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _nextProps$data2 = nextProps.data,
          data = _nextProps$data2 === undefined ? [] : _nextProps$data2,
          itemKey = nextProps.itemKey;

      if (isSameKeys(this.lastDataKeys, data, itemKey)) {
        return false;
      } else {
        this.lastDataKeys = data.map(function (item) {
          return item[itemKey];
        });
        return true;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$itemRef && this.$itemRef.scrollIntoView();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.$itemRef && this.$itemRef.scrollIntoView();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var keyScrollTo = this.state.keyScrollTo;
      var _props = this.props,
          data = _props.data,
          renderItem = _props.renderItem,
          itemKey = _props.itemKey,
          style = _props.style;

      var styleCombine = Object.assign({}, style, { overflowY: 'auto' });
      return _react2.default.createElement(
        'ul',
        { className: 'im-message-list', ref: this.listRefHanlder, style: styleCombine },
        data.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            {
              key: item[itemKey],
              ref: function ref(element) {
                if (item[itemKey] + '' === keyScrollTo + '') {
                  _this2.$itemRef = element;
                }
              }
            },
            renderItem(item)
          );
        })
      );
    }
  }, {
    key: 'listRefHanlder',
    value: function listRefHanlder(element) {
      var _this3 = this;

      var _props2 = this.props,
          onScrollTop = _props2.onScrollTop,
          onScrollEnd = _props2.onScrollEnd;


      if (element && this.$listRef !== element) {
        this.$listRef = element;
        this.$listRef.addEventListener('scroll', function () {
          var _$listRef = _this3.$listRef,
              scrollTop = _$listRef.scrollTop,
              scrollHeight = _$listRef.scrollHeight,
              offsetHeight = _$listRef.offsetHeight;

          if (scrollTop === 0) {
            onScrollTop && onScrollTop();
            // console.log('load upward');
          } else if (scrollTop + offsetHeight === scrollHeight) {
            onScrollEnd && onScrollEnd();
            // console.log('load downward');
          }
        });
      }
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return IMMessageList;
}(_react.Component);

IMMessageList.propTypes = {
  data: _propTypes2.default.array,
  style: _propTypes2.default.object,
  itemKey: _propTypes2.default.string.isRequired,

  onScrollTop: _propTypes2.default.func,
  onScrollEnd: _propTypes2.default.func,
  renderItem: _propTypes2.default.func.isRequired
};

IMMessageList.defaultProps = {
  data: [],
  style: {
    width: 400,
    height: 300
  },
  onScrollTop: null,
  onScrollEnd: null
};

var _default = IMMessageList;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(isSameKeys, 'isSameKeys', 'src/IMReverseList.js');
  reactHotLoader.register(IMMessageList, 'IMMessageList', 'src/IMReverseList.js');
  reactHotLoader.register(_default, 'default', 'src/IMReverseList.js');
  leaveModule(module);
})();

;