import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { memo } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { CurencyType } from '../../types/types'

interface CurrencyBoxProps {
  currency: CurencyType[]
}

const CurencyBar = ({ currency }: CurrencyBoxProps) => {
  return (
    <CurrentCurencyBar>
      <CurrencyBlock>
        <ReactCountryFlag countryCode="US" svg />
        <CurrencyName>USD:</CurrencyName>
        <CurrencyValue>
          {currency[0]?.rateBuy ?? 0} | {currency[0]?.rateSell ?? 0}
        </CurrencyValue>
      </CurrencyBlock>
      <CurrencyBlock>
        <ReactCountryFlag countryCode="EU" svg />
        <CurrencyName> EUR:</CurrencyName>
        <CurrencyValue>
          {currency[1]?.rateBuy ?? 0} | {currency[1]?.rateSell ?? 0}
        </CurrencyValue>
      </CurrencyBlock>
    </CurrentCurencyBar>
  )
}

export default memo(CurencyBar)

const CurrentCurencyBar = styled(Box)`
  height: 7%;
  width: 100%;

  position: absolute;
  top: 0;
  background-color: #000035;

  display: flex;
  justify-content: space-around;
  align-items: center;
`

const CurrencyName = styled(Typography)``
const CurrencyValue = styled(Typography)``

const CurrencyBlock = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`
