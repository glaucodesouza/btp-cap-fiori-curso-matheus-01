sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("br.com.northwind.fioriappnorthwind.controller.Produtos", {
        onInit() {
            let oConfiguration = sap.ui.getCore().getConfiguration();
            oConfiguration.setLanguage("PT");

            this.onLoad('');
        },

        onLoad: function (value) {
            // this.getView().getModel().read("/Products", {
            //     success: function (OData, response) {
            //         debugger;
            //     },
            //     error: function (pError) {
            //         debugger;
            //     }
            // });
        },
        onAfterRendering: function () {
            this.getView().getModel().read("/Products", {
                urlParameters: {
                    "$top": 5
                },
                success: function (OData, response) {
                    let oModel = new JSONModel(OData.results);
                    this.getView().setModel(oModel, "Products");
                    this.getView().getModel("Products").refresh();
                    debugger;
                }.bind(this),
                error: (pError) => {
                    //arrow function ja herda o this
                    // ai, nao precisara usar o .vind(this)
                    debugger;
                }//.bind(this)
            });
        },
    });
});