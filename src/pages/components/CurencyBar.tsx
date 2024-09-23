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
    <>
      <CurrentCurencyBar>
        <CurrencyBlock>
          <ReactCountryFlag countryCode="US" svg style={{ width: 40 }} />
          <CurrencyName>USD:</CurrencyName>
          <CurrencyValue>
            {currency[0]?.rateBuy ?? 0} | {currency[0]?.rateSell ?? 0}
          </CurrencyValue>
        </CurrencyBlock>
        <CurrencyBlock>
          <ReactCountryFlag countryCode="EU" svg style={{ width: 40 }} />
          <CurrencyName> EUR:</CurrencyName>
          <CurrencyValue>
            {currency[1]?.rateBuy ?? 0} | {currency[1]?.rateSell ?? 0}
          </CurrencyValue>
        </CurrencyBlock>
      </CurrentCurencyBar>
      <TextBox>
        <Box sx={{ textAlign: 'center', marginTop: 8 }}>
          <Typography fontWeight="600" fontSize="3rem">
            Fast. Accurate. Reliable.
          </Typography>
          <Typography fontSize="1.5rem">Start converting now!</Typography>
        </Box>
      </TextBox>
    </>
  )
}

export default memo(CurencyBar)

const CurrentCurencyBar = styled(Box)`
  height: 10%;
  width: 100%;

  position: absolute;
  top: 0;
  background-color: #000035;
  gap: 6rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

const CurrencyName = styled(Typography)`
  font-size: 1.5rem;
`
const CurrencyValue = styled(Typography)`
  font-size: 1.5rem;
`

const CurrencyBlock = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const TextBox = styled(Box)`
  width: 100%;
  height: 40%;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
`
