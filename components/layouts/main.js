import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container, Flex } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Takuya's homepage" />
        <meta name="author" content="Buddhi" />
        <meta name="author" content="craftzdog" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Buddhi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@craftzdog" />
        <meta name="twitter:creator" content="@craftzdog" />
        <meta name="twitter:image" content="https://www.craftz.dog/card.png" />
        <meta property="og:site_name" content="Buddhi" />
        <meta name="og:title" content="Buddhi" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.craftz.dog/card.png" />
        <title>Buddhi - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.xl" pt={14}>
        <Flex direction={["column", "row"]} gap={6}>
          {/* 左侧部分，用于放置 LazyVoxelDog */}
          {/*<Box flexShrink={0} width={["full", "30%"]}>
            <LazyVoxelDog />
          </Box>*/}

          {/* 右侧部分，用于放置其他子组件 */}
          <Box flexGrow={1}>
            {children}
          </Box>
        </Flex>
      </Container>
      <Footer />
    </Box>
  )
}

export default Main
