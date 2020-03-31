import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Detail } from './interfaces/detail.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('Detail') private readonly detailModel: Model<Detail>) {}
    
    async addDetail(CreateUserDTO: CreateUserDTO): Promise<Detail> {
        const newdetail = await this.detailModel(CreateUserDTO);
        return newdetail.save();
    }

    async getDetail(userId): Promise<Detail> {
        const detail = await this.detailModel
        .findById(userId)
        .exec();
        return detail;
    }

    async getDetails(): Promise<Detail[]> {
        const details = await this.detailModel.find().exec();
        return details;
    }

    async editDetail(userId, CreateUserDTO: CreateUserDTO): Promise<Detail> {
        const editedDetail = await this.detailModel
        .findByIdAndUpdate(userId, CreateUserDTO, { new: true });
        return editedDetail;
    }

    async deleteDetail(userId): Promise<any> {
        const deletedDetail = await this.detailModel
        .findByIdAndRemove(userId);
        return deletedDetail;
    }
}
