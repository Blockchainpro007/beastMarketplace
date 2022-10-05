import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "state/hooks"
import { fetchTransferHistoriesAsync } from "."

export const useTransferHistories = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchTransferHistoriesAsync())
  }, [dispatch])
}


export function useTransferHistoriesById(id: number) {
  const allHistories = useSelector((state: any) => state.transferHistories.histories)
  return allHistories.filter((item: any) => item.id === id)
}
