// rhytune-backend/src/models/album.model.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Album as AlbumInterface } from 'rhytune-shared-types'; // 确保这个路径匹配你的项目结构
import { v4 as uuidv4 } from 'uuid';

interface AlbumDocument extends AlbumInterface, Document { }

const albumSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4, // 自动生成UUID
        unique: true // 确保UUID的唯一性
    },
    title: {
        type: String,
        required: true
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    releaseDate: {
        type: Date
    },
    editRecord: [{ // 更新为引用 EditRecord 模型
        type: Schema.Types.ObjectId,
        ref: 'EditRecord'
    }],
});

// Static methods for Album model
albumSchema.statics.findById = function (id: string): Promise<AlbumDocument | null> {
    return this.findOne({ _id: id }).exec();
};

// 可以根据需要添加更多方法，例如管理歌曲列表或编辑记录

const Album = mongoose.model<AlbumDocument>('Album', albumSchema);
export default Album;
