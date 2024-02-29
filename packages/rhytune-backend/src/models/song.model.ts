// rhytune-backend/src/models/song.model.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Song as SongInterface } from 'rhytune-shared-types'; // 确保这个路径匹配你的项目结构

interface SongDocument extends SongInterface, Document { }

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artists: [{
        artistId: {
            type: Schema.Types.ObjectId,
            ref: 'Artist'
        },
        // 如果需要额外字段，如 role
    }],
    albums: [{
        albumId: {
            type: Schema.Types.ObjectId,
            ref: 'Album'
        },
        // 如果需要额外字段，如 trackNumber
    }],
    lyrics: [{
        type: Schema.Types.ObjectId,
        ref: 'Lyric'
    }],
    relatedVersions: [{ // 更新为正确引用其他 Song 实例
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    editRecord: [{ // 更新为引用 EditRecord 模型
        type: Schema.Types.ObjectId,
        ref: 'EditRecord'
    }],
});

// Static methods for Song model
songSchema.statics.findById = function (id: string): Promise<SongDocument | null> {
    return this.findOne({ _id: id }).exec();
};

// 增加实例方法：为歌曲添加编辑记录
songSchema.methods.addEditRecord = function (editRecordId: typeof Schema.Types.ObjectId) {
    this.editRecord.push(editRecordId);
    return this.save();
};

// 增加静态方法：查找并返回包含相关版本的歌曲
songSchema.statics.findWithRelatedVersions = function (id: string): Promise<SongDocument | null> {
    return this.findById(id).populate('relatedVersions').exec();
};

// 如果有必要处理歌曲的版本控制，可以添加如下方法
songSchema.methods.addRelatedVersion = function (relatedVersionId: typeof Schema.Types.ObjectId) {
    if (!this.relatedVersions.includes(relatedVersionId)) {
        this.relatedVersions.push(relatedVersionId);
        return this.save();
    }
    return Promise.resolve(this); // 如果相关版本已存在，直接返回当前实例
};

// 可以根据需要添加更多方法，例如处理歌曲的版本控制或添加新的编辑记录

const Song = mongoose.model<SongDocument>('Song', songSchema);
export default Song;
