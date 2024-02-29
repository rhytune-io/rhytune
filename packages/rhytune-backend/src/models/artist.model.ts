import mongoose, { Schema, Document } from 'mongoose';
import { Artist as ArtistInterface } from 'rhytune-shared-types';
import { v4 as uuidv4 } from 'uuid';

// 如果ArtistInterface中有id属性，确保它是可选的或类型为string
interface ArtistDocument extends Omit<ArtistInterface, 'id'>, Document { }

const artistSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4, // 自动生成UUID
        unique: true // 确保UUID的唯一性
    },
    name: {
        type: String,
        required: true
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    editRecord: [{
        type: Schema.Types.ObjectId,
        ref: 'EditRecord'
    }],
}, {
    timestamps: true,
});

// Static methods
artistSchema.statics.findById = function (id: string): Promise<ArtistDocument | null> {
    return this.findOne({ _id: id }).populate('songs').populate('editRecord').exec();
};

// Instance methods
artistSchema.methods.addEditRecord = function (editRecordId: Schema.Types.ObjectId) {
    this.editRecord.push(editRecordId);
    return this.save();
};

artistSchema.methods.removeEditRecord = function (editRecordId: Schema.Types.ObjectId) {
    // 正确地使用Schema.Types.ObjectId实例
    this.editRecord = this.editRecord.filter((recordId: string) => recordId !== editRecordId.toString());
    return this.save();
};

const Artist = mongoose.model<ArtistDocument>('Artist', artistSchema);
export default Artist;
