import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const getCurrency = async () => {
  try {
    const response = await axios.get(`https://api.monobank.ua/bank/currency`)
    return response.data.slice(0, 3)
  } catch (error: any) {
    console.error('Error fetching currency data:', error)
    throw new Error('Error fetching currency data:', error)
  }
}

export const useCurrency = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ['getCurrency'],
    queryFn: getCurrency,
  })

  return { data, isLoading, isError, error, isSuccess }
}
