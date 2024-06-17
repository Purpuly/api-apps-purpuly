import { IsNotEmpty, IsString, Length } from "class-validator";

export default class PostMutationDto {
    @IsString()
    @IsNotEmpty()
    public recordId: string;

    @IsString()
    @IsNotEmpty()
    public resetPasswordToken: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 64)
    public newPassword: string;
}