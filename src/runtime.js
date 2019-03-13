"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _iconsReact = _interopRequireDefault(require("@ant-design/icons-react"));

var _utils = require("@ant-design/icons-react/es/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 原始获取图标函数 
var originalGetIcon = _iconsReact.default.get.bind(_iconsReact.default); // 覆盖get函数，在图标未加载前，返回一个渲染AutoReloadIcon来控制自动刷新 


_iconsReact.default.get = function (key) {
  var target = originalGetIcon(key);

  if (target) {
    return target;
  }

  return {
    icon: function icon(primaryColor, secondaryColor) {
      return {
        tag: function AutoReloadIconWrapper(props) {
          return _react.default.createElement(AutoReloadIcon, {
            originalType: key,
            rootProps: props,
            primaryColor: primaryColor,
            secondaryColor: secondaryColor
          });
        }
      };
    }
  };
};

var AutoReloadIcon =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AutoReloadIcon, _React$Component);

  _createClass(AutoReloadIcon, null, [{
    key: "addInstance",
    // 属性定义   
    // 新增实例   
    value: function addInstance(instance) {
      this.instances.push(instance);
    } // 删除实例  

  }, {
    key: "removeInstance",
    value: function removeInstance(instance) {
      var index = this.instances.indexOf(instance);
      this.instances.splice(index, 1);
    } // 刷新所有实例   

  }, {
    key: "load",
    value: function load(allIcons) {
      // 注册所有图标     
      _iconsReact.default.add.apply(_iconsReact.default, _toConsumableArray(Object.keys(allIcons).map(function (key) {
        return allIcons[key];
      }))); // 还原get函数    


      _iconsReact.default.get = originalGetIcon; // 通过强制刷新来，显示异步加载的图标    

      this.instances.forEach(function (instance) {
        return instance.forceUpdate();
      }); // 移除所有队列     

      this.instances.length = 0;
    }
  }]);

  function AutoReloadIcon(props) {
    var _this;

    _classCallCheck(this, AutoReloadIcon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoReloadIcon).call(this, props));
    AutoReloadIcon.addInstance(_assertThisInitialized(_this));
    return _this;
  } // 组件销毁时，从监听的延迟实例中移除   


  _createClass(AutoReloadIcon, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      AutoReloadIcon.removeInstance(this);
    } // 获取字体组件   

  }, {
    key: "getIcon",
    value: function getIcon() {
      var _this$props = this.props,
          originalType = _this$props.originalType,
          primaryColor = _this$props.primaryColor,
          secondaryColor = _this$props.secondaryColor;
      var target = originalGetIcon(originalType);

      if (typeof target === 'function') {
        return target(primaryColor, secondaryColor);
      } else {
        return target;
      }
    } // 渲染图标   

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          originalType = _this$props2.originalType,
          rootProps = _this$props2.rootProps;
      var target = this.getIcon(originalType);

      if (target) {
        return _react.default.Children.only((0, _utils.generate)(target.icon, 'svg-' + target.name, rootProps));
      } else {
        return _react.default.createElement("svg", rootProps);
      }
    }
  }]);

  return AutoReloadIcon;
}(_react.default.Component);

exports.default = AutoReloadIcon;

_defineProperty(AutoReloadIcon, "propTypes", {
  // 原始图标名称     
  originalType: _propTypes.default.string,
  // 图标原始root属性     
  rootProps: _propTypes.default.object // 默认属性   

});

_defineProperty(AutoReloadIcon, "defaultProps", {
  originalType: '',
  rootProps: {} // 所有延迟加载的图标实例   

});

_defineProperty(AutoReloadIcon, "instances", []);