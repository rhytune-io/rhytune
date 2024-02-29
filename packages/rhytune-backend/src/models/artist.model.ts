// rhytune-backend/src/models/artist.model.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Artist as ArtistInterface } from 'rhytune-shared-types'; // Adjust the path to match your project structure

interface ArtistDocument extends ArtistInterface, Document { }

const artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    editRecord: [{ // Adjusted to array format to reference EditRecord model
        type: Schema.Types.ObjectId,
        ref: 'EditRecord'
    }],
}, {
    timestamps: true, // Optionally add schema options such as timestamps
});

// Static methods for the Artist model
artistSchema.statics.findById = function (id: string): Promise<ArtistDocument | null> {
    return this.findOne({ _id: id }).populate('songs').populate('editRecord').exec();
};

// Instance methods
artistSchema.methods.addEditRecord = function (editRecordId: typeof Schema.Types.ObjectId) {
    this.editRecord.push(editRecordId);
    return this.save();
};

artistSchema.methods.removeEditRecord = function (editRecordId: typeof Schema.Types.ObjectId) {
    this.editRecord = this.editRecord.filter((recordId: typeof Schema.Types.ObjectId) => !recordId.equals(editRecordId));
    return this.save();
};

const Artist = mongoose.model<ArtistDocument>('Artist', artistSchema);
export default Artist;
