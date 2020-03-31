import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/detail')
    async addDetail(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
        const newDetail = await this.userService.addDetail(CreateUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Detail has been submitted successfully!!',
            post: newDetail,
        });
    }

    @Get('detail/:userId')
    async getDetail(@Res() res, @Param('userId', new ValidateObjectId()) userId) {
        const detail = await this.userService.getDetail(userId);
        if(!detail) {
            throw new NotFoundException('User Detail does not exist!');
        }
        return res.status(HttpStatus.OK).json(detail);
    }

    @Get('detail')
    async getDetails(@Res() res) {
        const details = await this.userService.getDetails();
        return res.status(HttpStatus.OK).json(details);
    }

    @Put('/edit')
    async editDetail(
        @Res() res,
        @Query('userId', new ValidateObjectId()) userId,
        @Body() CreateUserDTO: CreateUserDTO,
    ) {
        const editedDetail = await this.userService.editDetail(userId, CreateUserDTO);
        if(!editedDetail) {
            throw new NotFoundException('User Detail does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Detail has been updated successfully!!',
            post: editedDetail,
        });
    }

    @Delete('/delete')
    async deleteDetail(@Res() res, @Query('userId', new ValidateObjectId()) userId) {
        const deleteDetail = await this.userService.deleteDetail(userId);
        if(!deleteDetail) {
            throw new NotFoundException('User Detail does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Detail has been deleted',
            post: deleteDetail,
        });
    }
}
