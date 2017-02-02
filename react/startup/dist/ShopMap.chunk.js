webpackJsonp([4,9,10,11],{

/***/ 764:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var horizontal = _react.PropTypes.oneOf(['left', 'middle', 'right']);
	var vertical = _react.PropTypes.oneOf(['top', 'center', 'bottom']);

	exports.default = {

	  corners: _react.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),

	  horizontal: horizontal,

	  vertical: vertical,

	  origin: _react.PropTypes.shape({
	    horizontal: horizontal,
	    vertical: vertical
	  }),

	  cornersAndCenter: _react.PropTypes.oneOf(['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right']),

	  stringOrNumber: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),

	  zDepth: _react.PropTypes.oneOf([0, 1, 2, 3, 4, 5])

	};

/***/ },

/***/ 772:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _Paper = __webpack_require__(773);

	var _Paper2 = _interopRequireDefault(_Paper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Paper2.default;

/***/ },

/***/ 773:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _simpleAssign = __webpack_require__(692);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(764);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _transitions = __webpack_require__(693);

	var _transitions2 = _interopRequireDefault(_transitions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getStyles(props, context) {
	  var circle = props.circle;
	  var rounded = props.rounded;
	  var transitionEnabled = props.transitionEnabled;
	  var zDepth = props.zDepth;
	  var _context$muiTheme = context.muiTheme;
	  var baseTheme = _context$muiTheme.baseTheme;
	  var paper = _context$muiTheme.paper;


	  return {
	    root: {
	      color: paper.color,
	      backgroundColor: paper.backgroundColor,
	      transition: transitionEnabled && _transitions2.default.easeOut(),
	      boxSizing: 'border-box',
	      fontFamily: baseTheme.fontFamily,
	      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
	      boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
	      borderRadius: circle ? '50%' : rounded ? '2px' : '0px'
	    }
	  };
	}

	var Paper = function (_Component) {
	  _inherits(Paper, _Component);

	  function Paper() {
	    _classCallCheck(this, Paper);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).apply(this, arguments));
	  }

	  _createClass(Paper, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	      var style = _props.style;

	      var other = _objectWithoutProperties(_props, ['children', 'style']);

	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context);

	      return _react2.default.createElement(
	        'div',
	        _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
	        children
	      );
	    }
	  }]);

	  return Paper;
	}(_react.Component);

	Paper.propTypes = {
	  /**
	   * Children passed into the paper element.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * Set to true to generate a circlular paper container.
	   */
	  circle: _react.PropTypes.bool,
	  /**
	   * By default, the paper container will have a border radius.
	   * Set this to false to generate a container with sharp corners.
	   */
	  rounded: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Set to false to disable CSS transitions for the paper element.
	   */
	  transitionEnabled: _react.PropTypes.bool,
	  /**
	   * This number represents the zDepth of the paper shadow.
	   */
	  zDepth: _propTypes2.default.zDepth
	};
	Paper.defaultProps = {
	  circle: false,
	  rounded: true,
	  transitionEnabled: true,
	  zDepth: 1
	};
	Paper.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	exports.default = Paper;

/***/ },

/***/ 782:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _FontIcon = __webpack_require__(783);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _FontIcon2.default;

/***/ },

/***/ 783:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _simpleAssign = __webpack_require__(692);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _transitions = __webpack_require__(693);

	var _transitions2 = _interopRequireDefault(_transitions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getStyles(props, context, state) {
	  var color = props.color;
	  var hoverColor = props.hoverColor;
	  var baseTheme = context.muiTheme.baseTheme;

	  var offColor = color || baseTheme.palette.textColor;
	  var onColor = hoverColor || offColor;

	  return {
	    root: {
	      color: state.hovered ? onColor : offColor,
	      position: 'relative',
	      fontSize: baseTheme.spacing.iconSize,
	      display: 'inline-block',
	      userSelect: 'none',
	      transition: _transitions2.default.easeOut()
	    }
	  };
	}

	var FontIcon = function (_Component) {
	  _inherits(FontIcon, _Component);

	  function FontIcon() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, FontIcon);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FontIcon)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	      hovered: false
	    }, _this.handleMouseLeave = function (event) {
	      // hover is needed only when a hoverColor is defined
	      if (_this.props.hoverColor !== undefined) _this.setState({ hovered: false });
	      if (_this.props.onMouseLeave) {
	        _this.props.onMouseLeave(event);
	      }
	    }, _this.handleMouseEnter = function (event) {
	      // hover is needed only when a hoverColor is defined
	      if (_this.props.hoverColor !== undefined) _this.setState({ hovered: true });
	      if (_this.props.onMouseEnter) {
	        _this.props.onMouseEnter(event);
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(FontIcon, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var onMouseLeave = _props.onMouseLeave;
	      var // eslint-disable-line no-unused-vars
	      onMouseEnter = _props.onMouseEnter;
	      var // eslint-disable-line no-unused-vars
	      style = _props.style;

	      var other = _objectWithoutProperties(_props, ['onMouseLeave', 'onMouseEnter', 'style']);

	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context, this.state);

	      return _react2.default.createElement('span', _extends({}, other, {
	        onMouseLeave: this.handleMouseLeave,
	        onMouseEnter: this.handleMouseEnter,
	        style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
	      }));
	    }
	  }]);

	  return FontIcon;
	}(_react.Component);

	FontIcon.muiName = 'FontIcon';
	FontIcon.propTypes = {
	  /**
	   * This is the font color of the font icon. If not specified,
	   * this component will default to muiTheme.palette.textColor.
	   */
	  color: _react.PropTypes.string,
	  /**
	   * This is the icon color when the mouse hovers over the icon.
	   */
	  hoverColor: _react.PropTypes.string,
	  /**
	   * Callback function fired when the mouse enters the element.
	   *
	   * @param {object} event `mouseenter` event targeting the element.
	   */
	  onMouseEnter: _react.PropTypes.func,
	  /**
	   * Callback function fired when the mouse leaves the element.
	   *
	   * @param {object} event `mouseleave` event targeting the element.
	   */
	  onMouseLeave: _react.PropTypes.func,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	};
	FontIcon.defaultProps = {
	  onMouseEnter: function onMouseEnter() {},
	  onMouseLeave: function onMouseLeave() {}
	};
	FontIcon.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	exports.default = FontIcon;

/***/ },

/***/ 795:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by jack on 2016/10/19.
	 */

	var Util = function () {
		function Util() {
			_classCallCheck(this, Util);
		}

		_createClass(Util, [{
			key: 'importJs',
			value: function importJs(jsUri, cb) {
				var scriptElement = document.createElement('script');
				scriptElement.src = jsUri;
				scriptElement.type = 'text/javascript';
				// scriptElement.async = true;
				if (typeof cb === 'function') {
					scriptElement.onload = function () {
						cb();
					};
				}
				document.body.appendChild(scriptElement);
			}
		}, {
			key: 'importCss',
			value: function importCss(cssUri) {
				var styleElement = document.createElement('link');
				styleElement.href = cssUri;
				styleElement.rel = 'stylesheet';
				document.head.appendChild(styleElement);
			}
		}]);

		return Util;
	}();

	exports.default = Util;

/***/ },

/***/ 801:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _store = __webpack_require__(549);

	var _FloatingActionButton = __webpack_require__(802);

	var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

	var _config = __webpack_require__(576);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jack on 2016/10/25.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var RedirectButton = function (_Component) {
		_inherits(RedirectButton, _Component);

		function RedirectButton(props) {
			_classCallCheck(this, RedirectButton);

			var _this = _possibleConstructorReturn(this, (RedirectButton.__proto__ || Object.getPrototypeOf(RedirectButton)).call(this, props));

			_this.handleRedirect = function () {
				var path = _this.props.path;

				path = path || '/Home';
				// if (path == '/Home') {
				// 	window.location.href = `${config.root_path}/Home`;
				// 	return false;
				// }
				_store.history.push(path);
				return false;
			};

			return _this;
		}

		_createClass(RedirectButton, [{
			key: 'render',
			value: function render() {
				var name = this.props.name;

				var directBtnStyle = {
					fontSize: '1.5rem',
					position: 'fixed',
					bottom: '2rem',
					left: '2rem',
					zIndex: '3'
				};

				return _react2.default.createElement(
					_FloatingActionButton2.default,
					{ secondary: true, onClick: this.handleRedirect, style: directBtnStyle },
					_react2.default.createElement(
						'span',
						{ style: { color: '#ffffff', fontSize: '2rem' } },
						name
					)
				);
			}
		}]);

		return RedirectButton;
	}(_react.Component);

	RedirectButton.propTypes = {
		name: _react2.default.PropTypes.string,
		path: _react2.default.PropTypes.string
	};

	exports.default = RedirectButton;

/***/ },

/***/ 802:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _FloatingActionButton = __webpack_require__(803);

	var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _FloatingActionButton2.default;

/***/ },

/***/ 803:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _simpleAssign = __webpack_require__(692);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _transitions = __webpack_require__(693);

	var _transitions2 = _interopRequireDefault(_transitions);

	var _colorManipulator = __webpack_require__(605);

	var _EnhancedButton = __webpack_require__(704);

	var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

	var _FontIcon = __webpack_require__(782);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Paper = __webpack_require__(772);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _childUtils = __webpack_require__(701);

	var _warning = __webpack_require__(467);

	var _warning2 = _interopRequireDefault(_warning);

	var _propTypes = __webpack_require__(764);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getStyles(props, context) {
	  var floatingActionButton = context.muiTheme.floatingActionButton;


	  var backgroundColor = props.backgroundColor || floatingActionButton.color;
	  var iconColor = floatingActionButton.iconColor;

	  if (props.disabled) {
	    backgroundColor = props.disabledColor || floatingActionButton.disabledColor;
	    iconColor = floatingActionButton.disabledTextColor;
	  } else if (props.secondary) {
	    backgroundColor = floatingActionButton.secondaryColor;
	    iconColor = floatingActionButton.secondaryIconColor;
	  }

	  return {
	    root: {
	      transition: _transitions2.default.easeOut(),
	      display: 'inline-block'
	    },
	    container: {
	      backgroundColor: backgroundColor,
	      transition: _transitions2.default.easeOut(),
	      position: 'relative',
	      height: floatingActionButton.buttonSize,
	      width: floatingActionButton.buttonSize,
	      padding: 0,
	      overflow: 'hidden',
	      borderRadius: '50%',
	      textAlign: 'center',
	      verticalAlign: 'bottom'
	    },
	    containerWhenMini: {
	      height: floatingActionButton.miniSize,
	      width: floatingActionButton.miniSize
	    },
	    overlay: {
	      transition: _transitions2.default.easeOut(),
	      top: 0
	    },
	    overlayWhenHovered: {
	      backgroundColor: (0, _colorManipulator.fade)(iconColor, 0.4)
	    },
	    icon: {
	      height: floatingActionButton.buttonSize,
	      lineHeight: floatingActionButton.buttonSize + 'px',
	      fill: floatingActionButton.iconColor,
	      color: iconColor
	    },
	    iconWhenMini: {
	      height: floatingActionButton.miniSize,
	      lineHeight: floatingActionButton.miniSize + 'px'
	    }
	  };
	}

	var FloatingActionButton = function (_Component) {
	  _inherits(FloatingActionButton, _Component);

	  function FloatingActionButton() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, FloatingActionButton);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FloatingActionButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	      hovered: false,
	      touch: false,
	      zDepth: undefined
	    }, _this.handleMouseDown = function (event) {
	      // only listen to left clicks
	      if (event.button === 0) {
	        _this.setState({ zDepth: _this.props.zDepth + 1 });
	      }
	      if (_this.props.onMouseDown) _this.props.onMouseDown(event);
	    }, _this.handleMouseUp = function (event) {
	      _this.setState({ zDepth: _this.props.zDepth });
	      if (_this.props.onMouseUp) _this.props.onMouseUp(event);
	    }, _this.handleMouseLeave = function (event) {
	      if (!_this.refs.container.isKeyboardFocused()) _this.setState({ zDepth: _this.props.zDepth, hovered: false });
	      if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
	    }, _this.handleMouseEnter = function (event) {
	      if (!_this.refs.container.isKeyboardFocused() && !_this.state.touch) {
	        _this.setState({ hovered: true });
	      }
	      if (_this.props.onMouseEnter) _this.props.onMouseEnter(event);
	    }, _this.handleTouchStart = function (event) {
	      _this.setState({
	        touch: true,
	        zDepth: _this.props.zDepth + 1
	      });
	      if (_this.props.onTouchStart) _this.props.onTouchStart(event);
	    }, _this.handleTouchEnd = function (event) {
	      _this.setState({ zDepth: _this.props.zDepth });
	      if (_this.props.onTouchEnd) _this.props.onTouchEnd(event);
	    }, _this.handleKeyboardFocus = function (event, keyboardFocused) {
	      if (keyboardFocused && !_this.props.disabled) {
	        _this.setState({ zDepth: _this.props.zDepth + 1 });
	        _this.refs.overlay.style.backgroundColor = (0, _colorManipulator.fade)(getStyles(_this.props, _this.context).icon.color, 0.4);
	      } else if (!_this.state.hovered) {
	        _this.setState({ zDepth: _this.props.zDepth });
	        _this.refs.overlay.style.backgroundColor = 'transparent';
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(FloatingActionButton, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        zDepth: this.props.disabled ? 0 : this.props.zDepth
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	       true ? (0, _warning2.default)(!this.props.iconClassName || !this.props.children, 'You have set both an iconClassName and a child icon. ' + 'It is recommended you use only one method when adding ' + 'icons to FloatingActionButtons.') : void 0;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.disabled !== this.props.disabled) {
	        this.setState({
	          zDepth: nextProps.disabled ? 0 : this.props.zDepth
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var className = _props.className;
	      var disabled = _props.disabled;
	      var mini = _props.mini;
	      var secondary = _props.secondary;
	      var // eslint-disable-line no-unused-vars
	      iconStyle = _props.iconStyle;
	      var iconClassName = _props.iconClassName;

	      var other = _objectWithoutProperties(_props, ['className', 'disabled', 'mini', 'secondary', 'iconStyle', 'iconClassName']);

	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context);

	      var iconElement = void 0;
	      if (iconClassName) {
	        iconElement = _react2.default.createElement(_FontIcon2.default, {
	          className: iconClassName,
	          style: (0, _simpleAssign2.default)({}, styles.icon, mini && styles.iconWhenMini, iconStyle)
	        });
	      }

	      var children = (0, _childUtils.extendChildren)(this.props.children, {
	        style: (0, _simpleAssign2.default)({}, styles.icon, mini && styles.iconWhenMini, iconStyle)
	      });

	      var buttonEventHandlers = disabled ? null : {
	        onMouseDown: this.handleMouseDown,
	        onMouseUp: this.handleMouseUp,
	        onMouseLeave: this.handleMouseLeave,
	        onMouseEnter: this.handleMouseEnter,
	        onTouchStart: this.handleTouchStart,
	        onTouchEnd: this.handleTouchEnd,
	        onKeyboardFocus: this.handleKeyboardFocus
	      };

	      return _react2.default.createElement(
	        _Paper2.default,
	        {
	          className: className,
	          style: (0, _simpleAssign2.default)(styles.root, this.props.style),
	          zDepth: this.state.zDepth,
	          circle: true
	        },
	        _react2.default.createElement(
	          _EnhancedButton2.default,
	          _extends({}, other, buttonEventHandlers, {
	            ref: 'container',
	            disabled: disabled,
	            style: (0, _simpleAssign2.default)(styles.container, this.props.mini && styles.containerWhenMini, iconStyle),
	            focusRippleColor: styles.icon.color,
	            touchRippleColor: styles.icon.color
	          }),
	          _react2.default.createElement(
	            'div',
	            {
	              ref: 'overlay',
	              style: prepareStyles((0, _simpleAssign2.default)(styles.overlay, this.state.hovered && !this.props.disabled && styles.overlayWhenHovered))
	            },
	            iconElement,
	            children
	          )
	        )
	      );
	    }
	  }]);

	  return FloatingActionButton;
	}(_react.Component);

	FloatingActionButton.propTypes = {
	  /**
	   * This value will override the default background color for the button.
	   * However it will not override the default disabled background color.
	   * This has to be set separately using the disabledColor attribute.
	   */
	  backgroundColor: _react.PropTypes.string,
	  /**
	   * This is what displayed inside the floating action button; for example, a SVG Icon.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * The css class name of the root element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * Disables the button if set to true.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * This value will override the default background color for the button when it is disabled.
	   */
	  disabledColor: _react.PropTypes.string,
	  /**
	   * URL to link to when button clicked if `linkButton` is set to true.
	   */
	  href: _react.PropTypes.string,
	  /**
	   * The icon within the FloatingActionButton is a FontIcon component.
	   * This property is the classname of the icon to be displayed inside the button.
	   * An alternative to adding an iconClassName would be to manually insert a
	   * FontIcon component or custom SvgIcon component or as a child of FloatingActionButton.
	   */
	  iconClassName: _react.PropTypes.string,
	  /**
	   * This is the equivalent to iconClassName except that it is used for
	   * overriding the inline-styles of the FontIcon component.
	   */
	  iconStyle: _react.PropTypes.object,
	  /**
	   * Enables use of `href` property to provide a URL to link to if set to true.
	   */
	  linkButton: _react.PropTypes.bool,
	  /**
	   * If true, the button will be a small floating action button.
	   */
	  mini: _react.PropTypes.bool,
	  /**
	   * Callback function fired when a mouse button is pressed down on the elmeent.
	   *
	   * @param {object} event `mousedown` event targeting the element.
	   */
	  onMouseDown: _react.PropTypes.func,
	  /**
	   * Callback function fired when the mouse enters the element.
	   *
	   * @param {object} event `mouseenter` event targeting the element.
	   */
	  onMouseEnter: _react.PropTypes.func,
	  /**
	   * Callback function fired when the mouse leaves the element.
	   *
	   * @param {object} event `mouseleave` event targeting the element.
	   */
	  onMouseLeave: _react.PropTypes.func,
	  /**
	   * Callback function fired when a mouse button is released on the element.
	   *
	   * @param {object} event `mouseup` event targeting the element.
	   */
	  onMouseUp: _react.PropTypes.func,
	  /**
	   * Callback function fired when a touch point is removed from the element.
	   *
	   * @param {object} event `touchend` event targeting the element.
	   */
	  onTouchEnd: _react.PropTypes.func,
	  /**
	   * Callback function fired when the element is touched.
	   *
	   * @param {object} event `touchstart` event targeting the element.
	   */
	  onTouchStart: _react.PropTypes.func,
	  /**
	   * If true, the button will use the secondary button colors.
	   */
	  secondary: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The zDepth of the underlying `Paper` component.
	   */
	  zDepth: _propTypes2.default.zDepth
	};
	FloatingActionButton.defaultProps = {
	  disabled: false,
	  mini: false,
	  secondary: false,
	  zDepth: 2
	};
	FloatingActionButton.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	exports.default = FloatingActionButton;

/***/ },

/***/ 822:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Util = __webpack_require__(795);

	var _Util2 = _interopRequireDefault(_Util);

	var _RedirectButton = __webpack_require__(801);

	var _RedirectButton2 = _interopRequireDefault(_RedirectButton);

	var _config = __webpack_require__(576);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jack on 2016/10/19.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var ShopMap = function (_Component) {
		_inherits(ShopMap, _Component);

		function ShopMap(props) {
			_classCallCheck(this, ShopMap);

			var _this = _possibleConstructorReturn(this, (ShopMap.__proto__ || Object.getPrototypeOf(ShopMap)).call(this, props));

			_this.addMarker = function (map, md) {
				// const opts = {
				// 	width: 50,     // 信息窗口宽度
				// 	height: 40,     // 信息窗口高度
				// 	title: "提货门店", // 信息窗口标题
				// 	enableMessage: true//设置允许信息窗发送短息
				// };

				var point = new BMap.Point(md.x1, md.y1);
				// 设置图标
				var icon = new BMap.Icon(_config2.default.root_path + '/public/img/marker.ico', { width: 16, height: 16 });
				var marker = new BMap.Marker(point, { icon: icon });
				map.addOverlay(marker);

				// 设置文字说明
				var labelOpts = {
					position: point,
					offset: { width: 16, height: -25 }
				};
				var label = new BMap.Label(md.name, labelOpts);
				label.setStyle({
					padding: "5px",
					border: "1px solid black",
					borderRadius: '5px',
					color: "red"
				});
				marker.setLabel(label);

				// 点击事件
				// addClickHandler(md.name, marker);
				// function addClickHandler(content, marker) {
				// 	marker.addEventListener("click", function (e) {
				// 			openInfo(content, e)
				// 		}
				// 	);
				// }

				// function openInfo(content, e) {
				// 	var p = e.target;
				// 	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				// 	var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
				// 	map.openInfoWindow(infoWindow, point); //开启信息窗口
				// }
			};

			_this.initBMap = function () {
				var shopMap = _this.props.shopMap;

				shopMap = shopMap.toJS();
				var _shopMap = shopMap,
				    mds = _shopMap.mds;


				if (window.BMap) {
					// 清除原来的地图信息
					var bMapDom = document.getElementById('bMap');
					bMapDom.innerHTML = '';
				}
				// 初始化
				try {
					(function () {
						var map = new BMap.Map('bMap');
						var point = new BMap.Point(120.761208, 31.672647);
						map.centerAndZoom(point, 15);
						mds.map(function (md) {
							_this.addMarker(map, md);
						});
					})();
				} catch (e) {
					// 由于是异步加载的，在js还未加载完成的情况下
					// 需要延时重新调用
					setTimeout(function () {
						// 递归调用自己
						_this.initBMap();
					}, 1000);
				}
			};

			_this.state = {
				title: '门店分布'
			};
			return _this;
		}

		// 百度地图创建标注


		_createClass(ShopMap, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				document.title = this.state.title;
				// 获取门店信息
				this.props.shopMapGetInitData();
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				document.title = this.state.title;
				var util = new _Util2.default();
				var jsPath = 'http://api.map.baidu.com/getscript?v=2.0&ak=7fae2c3df8297e4b7b6dcdfc502439f0';
				util.importJs(jsPath);
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				document.title = this.state.title;
				this.initBMap();
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				if (this.props.shopMap.equals(nextProps.shopMap)) {
					return false;
				}
				return true;
			}
		}, {
			key: 'render',
			value: function render() {
				var height = window.outerHeight + 'px';
				var mapStyle = {
					fontSize: '2rem',
					width: '100%',
					height: height
				};

				var directBtnStyle = {
					position: 'fixed',
					bottom: '2rem',
					left: '2rem'
				};

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('div', { id: 'bMap', style: mapStyle }),
					_react2.default.createElement(_RedirectButton2.default, { name: '\u9996\u9875', path: '/Home' })
				);
			}
		}]);

		return ShopMap;
	}(_react.Component);

	exports.default = ShopMap;

/***/ }

});