export interface User {
    _id: string,
    username: string,
    discordServerId: number | undefined,
    hasIcon: boolean
    // role: Role,
    // email: string,
    // this is a hash, not the actual password.
    // password: string
}

export enum Role {
    USER, MODERATOR, ADMIN
}

export interface UserStats {
    downloads: number,
    resourceCount: number,
    avgReviewScore: number
}