import { Global, Module } from "@nestjs/common";
import FirebaseService from "./services/firebase.service";

@Global()
@Module({
    imports: [],
    providers: [FirebaseService],
    exports: [FirebaseService],
})
export default class SharedModule { }