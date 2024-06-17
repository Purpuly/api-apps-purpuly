import { Injectable } from "@nestjs/common";

@Injectable()
export default class Core {
    public static isProductionEnv: boolean = process.env.NODE_ENV === 'production';
}