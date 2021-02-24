import { Resource } from "./Resource";
import { User } from "./User";
import { Version } from "./Version";

export interface Review {
    _id: string,
    author: User["_id"],
    message: string,
    rating: number,
    timestamp: Date,
    version: Version["_id"],
    resource: Resource["_id"]   
}