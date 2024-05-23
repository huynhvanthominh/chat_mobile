export interface IMessages {
    id: number,
    name: string,
    avatar: string
}

export interface IMessage {
    id: number,
    userId: string,
    message: string,
    avatar: string,
    createdAt: string,
    messageGroupId: number
}

export interface ISendMessageBody {
    content: string,
    to: number,
}