sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("TestNav.controller.Home", {
		onInit: function() {
			var oModel = new JSONModel(jQuery.sap.getModulePath("TestNav", "/employees.json"));
			this.getView().setModel(oModel);
		
		},
		onListItemPressed: function(evt) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var empId = evt.getSource().getBindingContext().getPath().substr(11);

			oRouter.navTo("Detail", {
				empID: empId

			});

		}

	});
});