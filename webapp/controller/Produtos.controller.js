sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("br.com.northwind.fioriappnorthwind.controller.Produtos", {
        onInit() {
            let oConfiguration = sap.ui.getCore().getConfiguration();
            oConfiguration.setLanguage("PT");
        }
    });
});