sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("br.com.northwind.fioriappnorthwind.controller.Produtos", {
        onInit() {
            let oConfiguration = sap.ui.getCore().getConfiguration();
            oConfiguration.setLanguage("PT");

            this.onLoad('');
        },

        onLoad: function (value) {
            // debugger;
            let oFilter = new Filter({
                filters: [
                    new Filter("Name", FilterOperator.Contains, value)
                ],
                and: false
            });

            this.getView().getModel()?.read("/Products", {
                urlParameters: {
                    "$top": 5
                },
                filters: [ oFilter ],
                success: function (OData, response) {
                    let oModel = new JSONModel(OData.results);
                    this.getView().setModel(oModel, "Products");
                    this.getView().getModel("Products").refresh();
                    // debugger;
                }.bind(this),
                error: (pError) => {
                    // debugger;
                    // arrow function ja herda o this
                    // ai, nao precisara usar o .bind(this)
                }//.bind(this)
            });
        },
        onAfterRendering: function (value) {

            this.onLoad('');

            // let oFilter = new Filter({
            //     filters: [
            //         new Filter("Name", FilterOperator.Contains, value)
            //     ],
            //     and: false
            // });

            // this.getView().getModel()?.read("/Products", {
            //     urlParameters: {
            //         "$top": 5
            //     },
            //     filters: [ oFilter ],
            //     success: function (OData, response) {
            //         let oModel = new JSONModel(OData.results);
            //         this.getView().setModel(oModel, "Products");
            //         this.getView().getModel("Products").refresh();
            //     }.bind(this),
            //     error: (pError) => {
            //         // arrow function ja herda o this
            //         // ai, nao precisara usar o .vind(this)
            //     }//.bind(this)
            // });
        },

        format: function(value){
            try {
                return ("R$ " + value.replace(".", ","));
            } catch (error) {
                return value;
            }
        },

        onSearch: function(oEvent){
            this.onLoad(oEvent.getSource().getValue());
            
        }
    });
});