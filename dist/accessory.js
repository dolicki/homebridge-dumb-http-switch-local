"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomebridgeDumbHTTPSwitchAccessory = void 0;
const axios_1 = __importDefault(require("axios"));
const settings_1 = require("./settings");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require("../package.json");
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
        this.config = config;
        this.switchService = new this.api.hap.Service.Switch(this.config.name);
        this.switchService
            .getCharacteristic(this.Characteristic.On)
            .onGet(async () => await this.checkStatus())
            .onSet(async (value) => {
            await this.turnOff;
            return false;
        });
        this.informationService = new this.api.hap.Service.AccessoryInformation()
            .setCharacteristic(this.Characteristic.Manufacturer, "Egor Rudinsky")
            .setCharacteristic(this.Characteristic.Model, settings_1.ACCESSORY_NAME)
            .setCharacteristic(this.Characteristic.FirmwareRevision, packageJSON.version);
        log.info("Switch finished initializing!");
    }
    async turnOff() {
        const url = this.config.url + "/turnOff";
        try {
            const request = axios_1.default.get(url, {
                timeout: 1000,
            });
            await request;
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async checkStatus() {
        const url = this.config.url + "/status";
        try {
            const request = axios_1.default.get(url, {
                timeout: 1000,
            });
            await request;
            return true;
        }
        catch (e) {
            return false;
        }
    }
    getServices() {
        return [this.informationService, this.switchService];
    }
}
exports.HomebridgeDumbHTTPSwitchAccessory = HomebridgeDumbHTTPSwitchAccessory;
//# sourceMappingURL=accessory.js.map