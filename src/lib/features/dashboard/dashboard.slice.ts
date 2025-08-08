
import { dashboardApiWithEndpoints, type DashboardData } from './dashboard.api';

const initialState: { dashboardData: DashboardData | null } = {
    dashboardData: null,
}

import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardData: (state, action) => {          
            state.dashboardData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            dashboardApiWithEndpoints.endpoints.getDashboardData.matchFulfilled,
            (state, action) => {
                state.dashboardData = action.payload;
            }
        );
    }
});