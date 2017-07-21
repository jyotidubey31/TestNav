sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	var _aValidTabKeys = ["Information", "Hobbies", "Notes"];
	return Controller.extend("TestNav.controller.Resume", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.getView().setModel(new JSONModel(), "view");
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
			var oArgs, oView, oQuery;
			oArgs = oEvent.getParameter("arguments");
			//alert(oArgs);
			oView = this.getView();
			var path = "/Employees/" + oArgs.empID;
			//	alert(path);
			oView.bindElement({
				path: path,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function(oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function(oEvent) {
						oView.setBusy(false);
					}
				}
			});

			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1) {
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				// the default query param should be visible at all time
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("employeeResume", {
					empID: oArgs.empID,
					query: {
						tab: _aValidTabKeys[0]
					}
				}, true /*no history*/ );
			}
		},

		onTabSelect: function(oEvent) {
			//	alert(oEvent.getSource().getBindingContext().getPath());
			var empID_v = oEvent.getSource().getBindingContext().getPath().substr(11,1);
			//var oCtx = oEvent.getSource().getBindingContext();
		//	alert(oCtx) ;
		//	var empID_v = oCtx.getProperty("empID");
			//alert(oEvent.getSource().getBindingContext().getPath());
			//alert(empID);
			var tab_v = oEvent.getParameter("selectedKey");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("employeeResume", {
				empID: empID_v,
				query: {
					tab: tab_v
				}
			}, true /*without history*/ );
		},
		_onBindingChange: function(oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});