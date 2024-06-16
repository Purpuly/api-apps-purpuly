import {
    APPLICATION_LISTENING_PORT,
    PURPULY_ONLY_ENDPOINTS_REGEX,
    REQUIRED_CONFIGURATION,
} from './init.config';
import { ApplicationInitBaseConfig } from './init.interface';

export default class InitUtils {
    public readonly isProductionEnv: boolean =
        process.env.NODE_ENV === 'production';

    public static checkRequiredConfiguration(): void {
        InitUtils.log('Checking required configuration...');

        const missingConfiguration: string[] = REQUIRED_CONFIGURATION.filter(
            (config) => {
                return !process.env[config];
            },
        );

        if (missingConfiguration.length > 0) {
            InitUtils.log('One or more required configuration is missing !');
            throw new Error(
                `Missing required configuration: ${missingConfiguration.join(
                    ', ',
                )}, please check the provided .env file and make sure all required configuration is provided.`,
            );
        }

        InitUtils.log('Required configuration is initialized.');
    }

    private static getCorsAllowOrigin(): string {
        const allowOnlyPurpulyEndpoints: boolean =
            process.env.CORS_ALLOW_ONLY_PURPULY_ENDPOINTS === 'true' ?? true;

        if (allowOnlyPurpulyEndpoints) {
            return PURPULY_ONLY_ENDPOINTS_REGEX;
        } else {
            return '*';
        }
    }

    private static getListeningPort(): string {
        return String(APPLICATION_LISTENING_PORT);
    }

    public getApplicationInitConfig(): ApplicationInitBaseConfig {
        return {
            isProductionEnv: this.isProductionEnv,
            listeningPort: InitUtils.getListeningPort(),
            allowOrigin: InitUtils.getCorsAllowOrigin(),
            rawBody: true,
        };
    }

    public static log(message: string): void {
        console.log(`[vendor_api] ${message}`);
    }
}
