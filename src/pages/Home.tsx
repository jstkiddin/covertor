import styled from '@emotion/styled'
import {
  Box,
  Card,
  IconButton,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material'
import { memo, useCallback, useEffect, useState } from 'react'
import { CompareArrows } from '@mui/icons-material'
import CurencyBar from './components/CurencyBar'
import CurencyBox from './components/CurencyBox'
import { CURRENCY_CODES } from '../constants'
import { CurencyType } from '../types/types'
import Loader from './components/Loader'
import axios from 'axios'

const Home = () => {
  const [currencyList, setCurrencyList] = useState([
    { currencyCodeA: 0, currencyCodeB: 0, date: 0, rateBuy: 0, rateSell: 0 },
  ])

  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('EUR')
  const [amount, setAmount] = useState<string>('0')
  const [conversionResult, setConversionResult] = useState<string>('0')

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://api.monobank.ua/bank/currency'
        )
        setCurrencyList(response.data)
      } catch (error) {
        console.error('Error fetching UAH rate:', error)
      }
    }

    fetchRates()
  }, [])

  useEffect(() => {
    const res = calculateFromTo(amount)
    setConversionResult(res)
  }, [fromCurrency, toCurrency])

  const handleReverseCurrencyClick = () => {
    const currencyFrom = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(currencyFrom)
  }

  const handleFromCurrencyChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setFromCurrency(event.target.value as string)
    },
    [fromCurrency]
  )

  const handleToCurrencyChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setToCurrency(event.target.value as string)
    },
    [toCurrency]
  )

  const calculateFromTo = useCallback(
    (value: string) => {
      console.log(currencyList)
      if (currencyList.length > 1) {
        const fromCode = CURRENCY_CODES[fromCurrency]
        const toCode = CURRENCY_CODES[toCurrency]

        const forwardExchange: CurencyType | undefined = currencyList.find(
          (currencyItem: CurencyType) =>
            currencyItem.currencyCodeA === fromCode &&
            currencyItem.currencyCodeB === toCode
        )
        const reverseExchage: CurencyType | undefined = currencyList.find(
          (currencyItem: CurencyType) =>
            currencyItem.currencyCodeA === toCode &&
            currencyItem.currencyCodeB === fromCode
        )

        const exchangeRate = forwardExchange?.rateBuy
          ? forwardExchange.rateBuy * parseFloat(value)
          : reverseExchage?.rateSell
          ? parseFloat(value) / reverseExchage.rateSell
          : parseFloat(value) * 1

        return exchangeRate.toString()
      }

      return '0'
    },
    [fromCurrency, toCurrency]
  )

  const calculateToFrom = useCallback(
    (value: string) => {
      if (currencyList.length > 1) {
        const fromCode = CURRENCY_CODES[fromCurrency]
        const toCode = CURRENCY_CODES[toCurrency]

        const forwardExchange: CurencyType | undefined = currencyList.find(
          (currencyItem: CurencyType) =>
            currencyItem.currencyCodeA === fromCode &&
            currencyItem.currencyCodeB === toCode
        )
        const reverseExchage: CurencyType | undefined = currencyList.find(
          (currencyItem: CurencyType) =>
            currencyItem.currencyCodeA === toCode &&
            currencyItem.currencyCodeB === fromCode
        )

        const exchangeRate = forwardExchange?.rateSell
          ? parseFloat(value) / forwardExchange.rateSell
          : reverseExchage?.rateBuy
          ? parseFloat(value) * reverseExchage.rateBuy
          : parseFloat(value) * 1

        return exchangeRate.toString()
      }
      return '0'
    },
    [fromCurrency, toCurrency]
  )

  if (currencyList.length < 2) {
    return <Loader />
  }

  return (
    <>
      <CurencyBar currency={currencyList} />

      <CardContainer>
        <StyledCard>
          <CurencyBox
            label="From"
            amount={amount}
            currency={fromCurrency}
            handleCurrencyChange={handleFromCurrencyChange}
            calculateCurrency={calculateFromTo}
            setAmount={setAmount}
            setOpositeAmount={setConversionResult}
          />

          <ButtonContainer>
            <Box>
              <Tooltip title="Reverse currency">
                <IconButton
                  aria-label="swap"
                  size="large"
                  onClick={handleReverseCurrencyClick}
                >
                  <CompareArrows />
                </IconButton>
              </Tooltip>
            </Box>
          </ButtonContainer>

          <CurencyBox
            label="To"
            amount={conversionResult}
            currency={toCurrency}
            handleCurrencyChange={handleToCurrencyChange}
            calculateCurrency={calculateToFrom}
            setAmount={setConversionResult}
            setOpositeAmount={setAmount}
          />
        </StyledCard>
      </CardContainer>
    </>
  )
}

export default memo(Home)

const StyledCard = styled(Card)`
  width: 50%;
  height: 40%;
  border-radius: 30px;
  padding: 0rem 1rem 0rem 1rem;

  display: flex;
  justify-content: space-between;

  box-shadow: 0px 12px 75px -20px rgba(0, 0, 0, 0.4);
`

const CardContainer = styled(Box)`
  height: 100%;
  width: 100%;

  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonContainer = styled(Box)`
  width: 3%;

  display: flex;
  justify-content: center;
  margin-top: 13%;
`
