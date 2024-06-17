import { Injectable } from "@nestjs/common";
import PostMutationDto from "../dto/post-mutation.dto";

@Injectable()
export default class MutationResetPasswordService {
    public async handle(
        postMutationDto: PostMutationDto,
    ): Promise<void> {
        const { recordId, resetPasswordToken, newPassword } = postMutationDto;

        console.log("recordId", recordId);
        console.log("resetPasswordToken", resetPasswordToken);
        console.log("newPassword", newPassword);

        return;
    }
}