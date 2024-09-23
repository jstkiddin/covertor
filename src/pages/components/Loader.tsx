import { Box, LinearProgress, styled } from '@mui/material'

const Loader = () => {
  return (
    <StyledBox>
      <LinearProgress />
    </StyledBox>
  )
}

export default Loader

const StyledBox = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 4;
  background-color: rgba(255, 255, 255, 0.5);

  display: flex;
  alighn-items: center;
`
