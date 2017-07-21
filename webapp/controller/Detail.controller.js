sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("TestNav.controller.Detail", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
			//var oModel = new JSONModel(jQuery.sap.getModulePath("TestNav", "/Resumes.json"));
			//this.getView().setModel(oModel,"view");

		},
		_onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments").empID;

			oView = this.getView();
			var path = "/Employees" + "/" + oArgs;
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
		},
		_onBindingChange: function(oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("NotFound");
			}
		},
		goBack: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		},
		onShowResume: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var empID_v = oEvent.getSource().getBindingContext().getPath().substr(11);
			// /	alert(empID);
			oRouter.navTo("employeeResume", {
				empID: empID_v
			});
		}

	});
});