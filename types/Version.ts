import { Resource } from "./Resource";
import { User } from "./User";

export interface Version {
    _id: string
    version: string,
    title: string,
    description: string,
    timestamp: Date,
    resource: Resource["_id"],
    author: User["_id"]
}