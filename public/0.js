(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Attendance/view.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Attendance/view.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Table_Grid_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Table/Grid.vue */ "./resources/js/components/Table/Grid.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var d = new Date(),
        month = d.getMonth(),
        year = d.getYear();
    return {
      columns: [{
        label: 'Users',
        prop: 'name',
        sort: true
      }],
      month: month,
      year: year,
      no_of_days: new Date(year, month + 1, 0),
      data: {
        data: []
      }
    };
  },
  components: {
    GridView: _Table_Grid_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get("/api/users", {
      params: to.query
    }).then(function (response) {
      next(function (vm) {
        return vm.setData(response.data);
      });
    });
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var vm = this;
    axios.get("/api/users", {
      params: to.query
    }).then(function (response) {
      vm.setData(response.data);
      next();
    });
  },
  methods: {
    setData: function setData(response) {
      var vm = this;
      var index = 0;

      while (index < vm.no_of_days.getDate()) {
        var dataIndex = index + 1;
        vm.columns.push({
          label: "".concat(dataIndex),
          prop: "".concat(dataIndex),
          sort: false
        });
        index++;
      }

      vm.data = response;

      if (vm.data.data.length) {
        var add_days = _.map(vm.data.data, function (data) {
          var index = 0;

          while (index < vm.no_of_days.getDate()) {
            data[index + 1] = '🔴';
            index++;
          }

          index = 0; //back to 0

          if (data.attendances ? data.attendances.length : false) {
            while (index < data.attendances.length) {
              var d = new Date(data.attendances[index].started_at.split(" ")[0]).addDays(1);

              if (d.getDate()) {
                data[d.getDate()] = '🔵';
              }

              index++;
            }
          }

          return data;
        });

        vm.data.data = add_days;
        add_days = [];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Grid.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/Grid.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    canDelete: String,
    canUpdate: String,
    createName: String,
    onCreateName: String,
    onEditName: {
      type: String,
      required: true
    },
    onDelete: {
      type: String,
      required: true
    },
    data: {},
    columns: Array,
    showEdit: {
      "default": true,
      type: Boolean
    },
    showCreate: {
      "default": true,
      type: Boolean
    },
    showDelete: {
      "default": true,
      type: Boolean
    }
  },
  computed: {
    can: function can() {
      return this.$store.getters.CAN;
    }
  },
  data: function data() {
    var vm = this;
    return {
      search: vm.$route.query.search ? vm.$route.query.search : '',
      loading: false
    };
  },
  methods: {
    handleSortChange: function handleSortChange(val) {
      var vm = this;

      var option = _.clone(vm.$route.query);

      option.column = val.prop;
      option.direction = val.order == 'ascending' ? 'asc' : 'desc';
      vm.onRouteChange(option);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var vm = this;

      var option = _.clone(vm.$route.query);

      option.page = val;
      vm.onRouteChange(option);
    },
    onRouteChange: function onRouteChange(option) {
      var vm = this;
      vm.loading = true;
      vm.$router.push({
        path: "".concat(vm.$route.path),
        query: option
      }, function () {
        vm.loading = false;
      }, function () {
        vm.loading = false;
      });
    },
    search_: function search_() {
      var vm = this;
      vm.onSearch(vm.search, vm);
    },
    onSearch: _.debounce(function (query, vm) {
      var vm = this;
      vm.loading = true;
      vm.$router.push({
        path: "".concat(vm.$route.path),
        query: {
          search: query
        }
      }, function () {
        vm.loading = false;
      }, function () {
        vm.loading = false;
      });
    }, 500),
    handleEdit: function handleEdit(index, row) {
      var vm = this;
      vm.$router.push({
        name: vm.onEditName,
        params: {
          id: row.id
        }
      });
    },
    handleDelete: function handleDelete(index, row) {
      var _this = this;

      var vm = this;
      vm.loading = true;
      vm.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(function () {
        axios["delete"]("".concat(vm.onDelete ? vm.onDelete : '/api/agencies', "/").concat(row.id));
        vm.$emit('delete', index);

        _this.$message({
          type: 'success',
          message: 'Delete completed'
        });

        vm.loading = false;
      })["catch"](function () {
        _this.$message({
          type: 'info',
          message: 'Delete canceled'
        });

        vm.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Attendance/view.vue?vue&type=template&id=34ca20f0&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Attendance/view.vue?vue&type=template&id=34ca20f0& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("grid-view", {
        attrs: {
          columns: _vm.columns,
          data: _vm.data,
          "create-name": "",
          "can-delete": "delete-user",
          "can-update": "update-user",
          "on-delete": "/api/user",
          "on-edit-name": "edit-user",
          "on-create-name": "create-user",
          "show-create": false,
          "show-delete": false,
          "show-edit": false
        },
        on: {
          delete: function($event) {
            return _vm.data.data.splice($event, 1)
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Grid.vue?vue&type=template&id=92c5d39c&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/Grid.vue?vue&type=template&id=92c5d39c& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-row",
        [
          _vm.onCreateName && _vm.showCreate
            ? _c(
                "el-col",
                { attrs: { span: 6 } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.$router.push({ name: _vm.onCreateName })
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.createName))]
                  )
                ],
                1
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-table",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.loading,
              expression: "loading"
            }
          ],
          staticStyle: { width: "100%" },
          attrs: { data: _vm.data.data },
          on: { "sort-change": _vm.handleSortChange }
        },
        [
          _vm._t("default"),
          _vm._v(" "),
          _vm._l(_vm.columns, function(column, index, key) {
            return _c("el-table-column", {
              key: index + "-" + key + "-" + column.prop + "-" + column.label,
              attrs: {
                sortable: column.sort ? true : false,
                width: "30px",
                label: column.label,
                prop: column.prop
              }
            })
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { align: "right" },
            scopedSlots: _vm._u(
              [
                {
                  key: "header",
                  fn: function(scope) {
                    return [
                      _c("el-input", {
                        attrs: { size: "mini", placeholder: "Type to search" },
                        on: { input: _vm.search_ },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      })
                    ]
                  }
                },
                {
                  key: "default",
                  fn: function(scope) {
                    return _vm.can[_vm.canUpdate] || _vm.can[_vm.canDelete]
                      ? [
                          (_vm.showEdit || _vm.can[_vm.canUpdate]
                          ? _vm.can[_vm.canUpdate]
                          : false)
                            ? _c(
                                "el-button",
                                {
                                  attrs: { size: "mini" },
                                  on: {
                                    click: function($event) {
                                      return _vm.handleEdit(
                                        scope.$index,
                                        scope.row
                                      )
                                    }
                                  }
                                },
                                [_vm._v("Edit\n                ")]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          (_vm.showDelete || _vm.can[_vm.canDelete]
                          ? _vm.can[_vm.canDelete]
                          : false)
                            ? _c(
                                "el-button",
                                {
                                  attrs: { size: "mini", type: "danger" },
                                  on: {
                                    click: function($event) {
                                      return _vm.handleDelete(
                                        scope.$index,
                                        scope.row
                                      )
                                    }
                                  }
                                },
                                [_vm._v("Delete\n                ")]
                              )
                            : _vm._e()
                        ]
                      : undefined
                  }
                }
              ],
              null,
              true
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      _c("el-pagination", {
        attrs: {
          "current-page": _vm.data.current_page,
          "page-size": _vm.data.per_page,
          layout: "total, prev, pager, next, jumper",
          total: _vm.data.total
        },
        on: { "current-change": _vm.handleCurrentChange }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Attendance/view.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/Attendance/view.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_vue_vue_type_template_id_34ca20f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.vue?vue&type=template&id=34ca20f0& */ "./resources/js/components/Attendance/view.vue?vue&type=template&id=34ca20f0&");
/* harmony import */ var _view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.vue?vue&type=script&lang=js& */ "./resources/js/components/Attendance/view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _view_vue_vue_type_template_id_34ca20f0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _view_vue_vue_type_template_id_34ca20f0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Attendance/view.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Attendance/view.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Attendance/view.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./view.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Attendance/view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Attendance/view.vue?vue&type=template&id=34ca20f0&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Attendance/view.vue?vue&type=template&id=34ca20f0& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_template_id_34ca20f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./view.vue?vue&type=template&id=34ca20f0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Attendance/view.vue?vue&type=template&id=34ca20f0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_template_id_34ca20f0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_template_id_34ca20f0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Table/Grid.vue":
/*!************************************************!*\
  !*** ./resources/js/components/Table/Grid.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Grid_vue_vue_type_template_id_92c5d39c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grid.vue?vue&type=template&id=92c5d39c& */ "./resources/js/components/Table/Grid.vue?vue&type=template&id=92c5d39c&");
/* harmony import */ var _Grid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Grid.vue?vue&type=script&lang=js& */ "./resources/js/components/Table/Grid.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Grid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Grid_vue_vue_type_template_id_92c5d39c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Grid_vue_vue_type_template_id_92c5d39c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Table/Grid.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Table/Grid.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Table/Grid.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Grid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Grid.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Grid.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Grid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Table/Grid.vue?vue&type=template&id=92c5d39c&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Table/Grid.vue?vue&type=template&id=92c5d39c& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Grid_vue_vue_type_template_id_92c5d39c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Grid.vue?vue&type=template&id=92c5d39c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/Grid.vue?vue&type=template&id=92c5d39c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Grid_vue_vue_type_template_id_92c5d39c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Grid_vue_vue_type_template_id_92c5d39c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);