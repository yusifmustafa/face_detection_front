export interface IJwtModel {
    id: number,
    token: string,
    refreshToken: string,
    type: string,
    username: string,
    roles: string[]
    priviligies: string[]
    fileId: number,
    exp: any
}