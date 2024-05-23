export interface IPaginate<T>{
    currentPage: number,
    totalPage: number,
    countPerPage: number,
    totalCount: number,
    data: T[]
}