import HomeLayout from './layouts/HomeLayout'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeLayout>
        <Home />
      </HomeLayout>
    </QueryClientProvider>
  )
}

export default App
