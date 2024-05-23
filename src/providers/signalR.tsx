import { createContext, useState } from "react";
import * as signalR from '@microsoft/signalr';
interface ISignalRContext {
    connection: signalR.HubConnection | undefined;
    startConnection: (hubUrl: string, token: string) => void;
    stopConnection: () => void;
    on: (eventName: string, callback: any) => void;
    off: (eventName: string, callback: any) => void;
    send: (methodName: any, ...args: any) => void;
}
const initialState: ISignalRContext = {
    connection: undefined,
    startConnection: () => { },
    stopConnection: () => { },
    on: () => { },
    off: () => { },
    send: () => { }
};
export const signalRContext = createContext(initialState);

interface ISignalRProviderProps {
    children: React.ReactNode;
}
export default function SignalRProvider({ children }: ISignalRProviderProps) {
    const [connection, setConnection] = useState<signalR.HubConnection | undefined>();
    const startConnection = async (hubUrl: string, token: string) => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                accessTokenFactory: () => token
            })
            .build();

        try {
            await connection.start();
        } catch (error) {
            setTimeout(() => startConnection(hubUrl, token), 5000); // Retry after 5 seconds
        }

        connection.onclose(async () => {
            await startConnection(hubUrl, token);
        });
        setConnection(connection);
    };

    const stopConnection = async () => {
        if (connection) {
            await connection.stop();
        }
    };

    const on = (eventName: string, callback: any) => {
        if (connection) {
            connection.on(eventName, callback);
        }
    };

    const off = (eventName: string, callback: any) => {
        if (connection) {
            connection.off(eventName, callback);
        }
    };

    const send = async (methodName: any, ...args: any) => {
        if (connection) {
            try {
                await connection.invoke(methodName, ...args);
            } catch (error) {
                console.error('Error sending SignalR message: ', error);
            }
        }
    };
    return (
        <signalRContext.Provider value={{
            connection,
            startConnection,
            stopConnection,
            on,
            off,
            send
        }
        }>{children}</signalRContext.Provider>
    );
}