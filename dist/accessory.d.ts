import { API, AccessoryPlugin, Logger, AccessoryConfig, Service, Characteristic } from 'homebridge';
interface IHomebridgeDumbHTTPSwitchAccessoryConfig extends AccessoryConfig {
    url: string;
    method: 'GET' | 'POST';
    body: string;
}
export declare class HomebridgeDumbHTTPSwitchAccessory implements AccessoryPlugin {
    readonly log: Logger;
    readonly api: API;
    readonly config: IHomebridgeDumbHTTPSwitchAccessoryConfig;
    readonly Characteristic: typeof Characteristic;
    private isRequestInProgress;
    private readonly switchService;
    private readonly informationService;
    constructor(log: Logger, config: AccessoryConfig, api: API);
    getServices(): Service[];
}
export {};
//# sourceMappingURL=accessory.d.ts.map