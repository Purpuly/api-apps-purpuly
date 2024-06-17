import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class GetRequestDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string;
}