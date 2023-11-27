import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import Payhip from '../components/payhip'
import { Analytics } from '@vercel/analytics/react'
import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen'; // 加载屏幕组件

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      // 假设加载需要2秒
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
     }, []);
  return (
    <Chakra cookies={pageProps.cookies}>
        {isLoading && <LoadingScreen />} {/* 根据isLoading状态显示或隐藏加载屏幕 */}
      <Fonts />
      <Payhip />
      <Layout router={router}>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
        <Analytics />
      </Layout>
    </Chakra>
  )
}

export default Website
