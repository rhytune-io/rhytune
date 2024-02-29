// artistsong.model.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ArtistSongDocument extends Document {
    artistId: typeof Schema.Types.ObjectId;
    songId: typeof Schema.Types.ObjectId;
    role: string; // 示例额外字段，表示艺术家在歌曲中的角色
}

const artistSongSchema = new Schema({
    artistId: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    songId: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    },
    role: {
        type: String,
        required: false // 根据实际情况，这个字段可以是可选的
    }
}, {
    timestamps: true // 如果需要记录创建和更新时间
});

// 这里可以添加静态方法或实例方法
// 例如，根据艺术家ID和歌曲ID查找ArtistSong关系
artistSongSchema.statics.findByArtistAndSong = function (artistId: string, songId: string): Promise<ArtistSongDocument | null> {
    return this.findOne({ artistId, songId }).exec();
};

// 创建模型
const ArtistSong = mongoose.model<ArtistSongDocument>('ArtistSong', artistSongSchema);

export default ArtistSong;
