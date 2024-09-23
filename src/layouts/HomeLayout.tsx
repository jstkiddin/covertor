import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { memo } from 'react'

interface LayoutProps {
  children: JSX.Element[] | JSX.Element
}

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Base>
        <BlueBackGround>{children}</BlueBackGround>
      </Base>
    </>
  )
}

export default memo(HomeLayout)

const BlueBackGround = styled(Box)`
  width: 100%;
  height: 50vh;
  background-color: #000053;
  color: #ffffff;
`
const Base = styled(Box)`
  width: 100%;
  height: 100vh;
`
