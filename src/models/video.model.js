import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({},{timestamps});

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = model("Video", videoSchema)