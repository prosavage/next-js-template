import { Category } from "./Category";
import { Review } from "./Review";
import { User } from "./User";

export enum ResourceType {
    PLUGIN = "plugin", MOD = "mod", SOFTWARE = "software"
}


export interface Resource {
    _id: string,
    name: string,
    description: string,
    hasIcon: boolean,
    price: number,
    rating: number,
    category: Category["_id"],
    thread: string,
    owner: User["_id"],
    updated: Date,
    type: ResourceType,
    downloads: number,
    reviewCount: number
}


export interface DirectoryResource {
    _id: string,
    name: string,
    description: string,
    price: number,
    hasIcon: boolean,
    rating: number,
    category: Category["_id"],
    thread: string,
    owner: User,
    updated: Date,
    type: ResourceType,
    downloads: number,
    reviews: Review[],
    reviewCount: number
}

export interface DirectoryPayment {
    _id: string,
    timestamp: Date,
    amount: number,
    recipient: User
    status: PaymentStatus
    resource: Resource
    user: User,
    payment_intent: string
}

export enum PaymentStatus {
    STARTED = "STARTED",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
}
