// rhytune-backend/src/models/lyric.model.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Lyric as LyricInterface } from 'rhytune-shared-types'; // 确保这个路径匹配你的项目结构

interface LyricDocument extends LyricInterface, Document { }

const lyricSchema = new Schema({
    songId: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    },
    langCode: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    versionInfo: String, // Optional, to distinguish different versions
    editRecord: [{ // 更新为引用 EditRecord 模型
        type: Schema.Types.ObjectId,
        ref: 'EditRecord'
    }],
});

// Static methods for Lyric model
lyricSchema.statics.findBySongIdAndLangCode = function (songId: string, langCode: string): Promise<LyricDocument[]> {
    return this.find({ songId: songId, langCode: langCode }).exec();
};

// 可以根据需要添加更多方法，例如处理版本控制或添加新的编辑记录

const Lyric = mongoose.model<LyricDocument>('Lyric', lyricSchema);
export default Lyric;
