import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchTransferHistories } from "./fetchTransferHistories"

export interface TransferHistory {
    id: number
    from: string
    to: string
    blockNumber: number
    timestamp: number
}

interface TransferHistoriesResponse {
    histories: TransferHistory[]
}

export interface MarketplaceData {
    histories: TransferHistory[]
    status: 'idle' | 'loading' | 'fulfilled' | 'failed'
}

const initialState: MarketplaceData = {
    histories: [],
    status: 'idle',
}

export const fetchTransferHistoriesAsync = createAsyncThunk<TransferHistoriesResponse>(
    'transferhistories/fetchTransferHistories',
    async () => {
      const histories = await fetchTransferHistories()
      return {
        histories: histories,
      }
    }
)

export const transferHistoriesSlice = createSlice({
    name: "marketplace",
    initialState,
    reducers: {
        // updateOwner: (state, action) => {
        //   state.owners[action.payload.id].owner = action.payload.owner;
        // },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchTransferHistoriesAsync.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchTransferHistoriesAsync.fulfilled, (state, action) => {
            state.histories = action.payload.histories
            state.status = 'fulfilled'
          })
          .addCase(fetchTransferHistoriesAsync.rejected, (state) => {
            state.status = 'failed'
          })
      },
})


export const { } = transferHistoriesSlice.actions

export default transferHistoriesSlice.reducer
