import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/global'
import '@/index.css'

import { Toaster } from '@/components/ui/sonner'
import Hero from '@/pages/Hero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hero />
    <Toaster richColors position='top-center' theme='light' />
  </StrictMode>,
)
