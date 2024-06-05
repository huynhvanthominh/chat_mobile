export interface IFriend {
    userId: number;
    username: string;
    displayName: string;
    avatar: string;
    messageGroupId: number;
}
export interface IAddFriendRequest {
    userId: number;
}