export interface IFriend {
    userId: number;
    username: string;
    displayName: string;
    messageGroupId: number;
}
export interface IAddFriendRequest {
    userId: number;
}