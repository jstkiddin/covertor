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
import { useCurrency } from '../services/getCurrency'
import Loader from './components/Loader'

const Home = () => {
  const { data, isLoading } = useCurrency()

  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [amount, setAmount] = useState('0')
  const [conversionResult, setConversionResult] = useState('0')

  useEffect(() => {
    const res = calculateFromTo(amount)
    setConversionResult(res)
  }, [fromCurrency, toCurrency])

  const handleReverseCurrencyClick = () => {
    console.log('01', fromCurrency, toCurrency)

    const currencyFrom = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(currencyFrom)

    console.log('1', fromCurrency, toCurrency)
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
      const fromCode = CURRENCY_CODES[fromCurrency]
      const toCode = CURRENCY_CODES[toCurrency]

      const forwardExchange: CurencyType | undefined = data.find(
        (currencyItem: CurencyType) =>
          currencyItem.currencyCodeA === fromCode &&
          currencyItem.currencyCodeB === toCode
      )
      const reverseExchage: CurencyType | undefined = data.find(
        (currencyItem: CurencyType) =>
          currencyItem.currencyCodeA === toCode &&
          currencyItem.currencyCodeB === fromCode
      )

      const exchangeRate = forwardExchange?.rateBuy
        ? forwardExchange.rateBuy
        : reverseExchage?.rateSell
        ? reverseExchage.rateSell
        : 1

      console.log('2', fromCurrency, toCurrency, fromCode, toCode, exchangeRate)

      return (parseInt(value) * exchangeRate).toString()
    },
    [fromCurrency, toCurrency]
  )

  const calculateToFrom = (value: string) => {
    const fromCode = CURRENCY_CODES[fromCurrency]
    const toCode = CURRENCY_CODES[toCurrency]
    return (parseInt(value) * 2).toString()
  }

  if (isLoading && !data) {
    return <Loader />
  }

  return (
    <>
      <CurencyBar currency={data} />
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
