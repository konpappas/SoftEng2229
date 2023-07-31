"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const axios_1 = tslib_1.__importDefault(require("axios"));
const https = tslib_1.__importStar(require("https"));
axios_1.default.defaults.httpsAgent = new https.Agent();
class Healthcheck extends core_1.Command {
    async run() {
        let data; // type annotation to specify the type of the variable
        try {
            const { flags } = await this.parse(Healthcheck);
            if (flags.format === 'csv') {
                const response = await axios_1.default.get('http://localhost:9103/intelliq_api/admin/healthcheck?format=csv');
                data = response.data;
            }
            else {
                const response = await axios_1.default.get('http://localhost:9103/intelliq_api/admin/healthcheck');
                data = response.data;
            }
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = Healthcheck;
Healthcheck.description = 'tests live server for errors';
Healthcheck.flags = {
    // flag with a value (-n, --name=VALUE)
    format: core_1.Flags.string({
        options: ['json', 'csv'],
        required: true,
        default: 'json',
    }),
};
