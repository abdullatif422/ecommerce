import { baseApi } from "@/lib/store/api/api";


export interface DashboardData {
    data: any[];
}
interface GetDashboardDataArgs {
    startDate: string;
    endDate: string;
}

export const dashboardApiWithEndpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query<DashboardData, GetDashboardDataArgs | void>({
            query: () => {
                return `/dashboard`; 
            },
        }),
    })
});

export const {
    useGetDashboardDataQuery
} = dashboardApiWithEndpoints;