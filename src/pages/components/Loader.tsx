import { Box, CircularProgress, styled } from '@mui/material'

const Loader = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  )
}

export default Loader

const StyledBox = styled(Box)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 4;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
`
