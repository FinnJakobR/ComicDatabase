export interface AnimeListStatisticsStatusInterface {
    watching: number,
    complete: number,
    on_hold: number,
    dropped: number, 
    plan_to_watch: number
}

export default interface AnimeListStatisticsInterface {
    num_list_users: number,
    status: AnimeListStatisticsStatusInterface
}