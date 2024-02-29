// rhytune-backend/src/models/editRecord.model.ts

import mongoose, { Schema, Document } from 'mongoose';
import { EditRecord } from 'rhytune-shared-types'; // 假设这是共享类型定义的路径

interface EditRecordDocument extends EditRecord, Document { }

const EditRecordSchema: Schema = new Schema({
    editedByUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    changeDescription: { type: String, required: true },
    // 如果EditRecord接口中包含更多字段，请在此处添加
});

export default mongoose.model<EditRecordDocument>('EditRecord', EditRecordSchema);
