"use strict";
const settings_1 = require("./settings");
const accessory_1 = require("./accessory");
module.exports = (api) => {
    api.registerAccessory(settings_1.PLUGIN_NAME, settings_1.ACCESSORY_NAME, accessory_1.HomebridgeDumbHTTPSwitchAccessory);
};
//# sourceMappingURL=index.js.map