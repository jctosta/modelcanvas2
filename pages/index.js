import Head from 'next/head';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Stack, Heading, Text, SimpleGrid, Box, Button, Link as ChakraLink, Divider } from '@chakra-ui/react';

export default function Index() {

	const { t } = useTranslation('common');

	return (
		<>
			<Head>
				<title>{t('app-name')}</title>
			</Head>
			<Stack align="center" spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }} direction={{ base: 'column', md: 'row' }}>
				<Stack flex={1} spacing={{ base: 5, md: 10 }}>
					<Stack flex={1} spacing={{ base: 5, md: 10 }} direction={{ base: 'column', md: 'row' }}>
						<Box textAlign={{ base: 'center', md: 'left' }}>
							<Heading fontWeight="bold" fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }} paddingY="4">
								{t('headline')}
							</Heading>
							<Text fontSize="xl" paddingY="4">
								{t('headline-description')}
							</Text>
							<Link href="/dashboard" passHref={true}>
								<Button colorScheme="brand" as={ChakraLink}>Getting Started</Button>
							</Link>
						</Box>
						<Box>
							<img 
								src="/Startup_Flatline.svg" 
								alt="Startup Flatline" 
								width="406px"
								height="306px"                            
							/>
						</Box>
					</Stack>
					<Divider />
					<Stack flex={1} spacing={{ base: 5, md: 10 }} direction="column">
						<Heading textAlign={{ base: 'center', md: 'left' }}  fontSize={{ base:'2xl', md: '3xl' }}>{t('marketing-title')}</Heading>
						<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
							<Box borderWidth="2px" borderRadius="md" borderColor="gray.200" padding="4" boxShadow="md" backgroundColor="white">
								<Heading fontSize="lg" paddingY="2" fontWeight="semibold">{t('marketing-bmc-title')}</Heading>
								<Text fontStyle="italic">{t('marketing-bmc-description')}</Text>
							</Box>
							<Box borderWidth="2px" borderRadius="md" borderColor="gray.200" padding="4" boxShadow="md" backgroundColor="white">
								<Heading fontSize="lg" paddingY="2" fontWeight="semibold">{t('marketing-lean-title')}</Heading>
								<Text fontStyle="italic">{t('marketing-lean-description')}</Text>
							</Box>
							<Box borderWidth="2px" borderRadius="md" borderColor="gray.200" padding="4" boxShadow="md" backgroundColor="white">
								<Heading fontSize="lg" paddingY="2" fontWeight="semibold">{t('marketing-media-title')}</Heading>
								<Text fontStyle="italic">{t('marketing-media-description')}</Text>
							</Box>
							<Box borderWidth="2px" borderRadius="md" borderColor="gray.200" padding="4" boxShadow="md" backgroundColor="white">
								<Heading fontSize="lg" paddingY="2" fontWeight="semibold">{t('marketing-swot-title')}</Heading>
								<Text fontStyle="italic">{t('marketing-swot-description')}</Text>
							</Box>
							<Box borderWidth="2px" borderRadius="md" borderColor="gray.200" padding="4" boxShadow="md" backgroundColor="white">
								<Heading fontSize="lg" paddingY="2" fontWeight="semibold">{t('marketing-product-title')}</Heading>
								<Text fontStyle="italic">{t('marketing-product-description')}</Text>
							</Box>
							<Box borderWidth="2px" borderRadius="md" borderColor="gray.200" padding="4" boxShadow="md" backgroundColor="white">
								<Heading fontSize="lg" paddingY="2" fontWeight="semibold">{t('marketing-custom-title')}</Heading>
								<Text fontStyle="italic">{t('marketing-custom-description')}</Text>
							</Box>
						</SimpleGrid>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
});