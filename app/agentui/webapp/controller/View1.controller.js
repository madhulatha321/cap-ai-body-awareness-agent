sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("agentui.agentui.controller.View11", {

    onInit: function () {
      const oModel = new JSONModel({
        question: "",
        answer: ""
      });
      this.getView().setModel(oModel);
    },

    onAsk: async function () {
      const oModel = this.getView().getModel();
      const question = oModel.getProperty("/question");

      if (!question) {
        MessageToast.show("Enter a question");
        return;
      }

      oModel.setProperty("/answer", "Loading...");

      try {
        const response = await fetch("/odata/v4/agent/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ question })
        });

        const data = await response.json();

        oModel.setProperty("/answer", data.value);

      } catch (err) {
        oModel.setProperty("/answer", "Error calling backend");
        console.error(err);
      }
    }

  });
});