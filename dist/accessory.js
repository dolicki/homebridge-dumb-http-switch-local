"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomebridgeDumbHTTPSwitchAccessory = void 0;
const axios_1 = __importDefault(require("axios"));
const settings_1 = require("./settings");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require('../package.json');
const getBody = (body) => {
    try {
        return JSON.parse(body) || {};
    }
    catch (e) {
        return {};
    }
};
class HomebridgeDumbHTTPSwitchAccessory {
    constructor(log, config, api) {
        this.log = log;
        this.api = api;
        this.Characteristic = this.api.hap.Characteristic;
        this.isRequestInProgress = false;
        this.config = config;
        this.switchService = new this.api.hap.Service.Switch(this.config.name);
        this.switchService.getCharacteristic(this.Characteristic.On)
            .onGet(() => this.isRequestInProgress)
            .onSet(async () => {
            const url = this.config.url;
            const bodyOrParams = getBody(this.config.body);
            try {
                this.isRequestInProgress = true;
                const request = this.config.method === 'POST'
                    ? axios_1.default.post(url, bodyOrParams)
                    : axios_1.default.get(url, { params: bodyOrParams });
                await request;
                this.isRequestInProgress = false;
                return true;
            }
            catch (error) {
                this.log.error(String(error));
                this.isRequestInProgress = false;
                return false;
            }
        });
        this.informationService = new this.api.hap.Service.AccessoryInformation()
            .setCharacteristic(this.Characteristic.Manufacturer, 'Egor Rudinsky')
            .setCharacteristic(this.Characteristic.Model, settings_1.ACCESSORY_NAME)
            .setCharacteristic(this.Characteristic.FirmwareRevision, packageJSON.version);
        log.info('Switch finished initializing!');
    }
    getServices() {
        return [
            this.informationService,
            this.switchService,
        ];
    }
}
exports.HomebridgeDumbHTTPSwitchAccessory = HomebridgeDumbHTTPSwitchAccessory;
//# sourceMappingURL=accessory.js.map