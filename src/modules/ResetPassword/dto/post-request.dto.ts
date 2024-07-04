import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class PostRequestDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string;
}