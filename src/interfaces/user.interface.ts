export interface IUser {
    id: number,
    username: string,
    displayName: string,
    avatar: string,
}

export interface IRecieveRequestAddFriend extends IUser {
    makeFriendId: number,
    isRead: boolean
}