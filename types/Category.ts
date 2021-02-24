import {ResourceType} from "./Resource"

export interface Category {
    _id: string,
    type: ResourceType,
    name: string
}