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

// 可以根据需要添加更多方法，例如处理歌曲的版本控制或添加新的编辑记录

const Song = mongoose.model<SongDocument>('Song', songSchema);
export default Song;
