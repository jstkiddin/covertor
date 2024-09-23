import styled from '@emotion/styled'
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { CURRENCY_LIST } from '../../constants'

interface CurencyProps {
  label: string
  currency: string
  amount: string
  setAmount: (value: React.SetStateAction<string>) => void
  setOpositeAmount: (value: React.SetStateAction<string>) => void
  handleCurrencyChange: (event: SelectChangeEvent<string>) => void
  calculateCurrency: (value: string) => string
}

const CurencyBox = (props: CurencyProps) => {
  const [value, setValue] = useState('')

  const {
    setAmount,
    calculateCurrency,
    label,
    currency,
    amount,
    handleCurrencyChange,
    setOpositeAmount,
  } = props

  useEffect(() => {
    const res = calculateCurrency(amount)
    setOpositeAmount(res)
  }, [value])

  const handleAmountChange = (e: any) => {
    const input = e.target.value
    const regex = /^[0-9\b.]*$/
    if (input === '' || regex.test(input)) {
      setValue(input)
      setAmount(input)
    }
  }

  return (
    <CurrencyBox>
      <StyledFormControl fullWidth>
        <Typography>{label}</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          onChange={handleCurrencyChange}
        >
          {CURRENCY_LIST.map((currencyItem: string) => (
            <MenuItem key={`${currencyItem}-${label}`} value={currencyItem}>
              {currencyItem}
            </MenuItem>
          ))}
        </Select>
        <TextField
          variant="outlined"
          value={amount === 'NaN' ? '' : amount}
          onChange={handleAmountChange}
        />
      </StyledFormControl>
    </CurrencyBox>
  )
}

export default memo(CurencyBox)

const CurrencyBox = styled(Box)`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0px 0.5rem;
`

const StyledFormControl = styled(FormControl)`
  gap: 1rem;
`
