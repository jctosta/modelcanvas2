import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container, Text, useColorModeValue, Box, Stack, Link as ChakraLink } from '@chakra-ui/react';
import Header from '../chakra/Header';

export default function MainLayout( { children }) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="description" content="Model Canvas" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				<meta
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
					name="viewport"
				/>
				<meta name="viewport" content="width=device-width" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header pos="fixed" top="0" left="0" w="100%" zIndex={2} boxShadow="md" />
			<Container maxW="full" my="28">
				{children}
			</Container>
			<Box bg={useColorModeValue('steel.900', 'steel.50')} color={useColorModeValue('steel.100', 'steel.700')} pos="fixed" bottom="0" left="0" w="100%" zIndex={2}>
				<Container as={Stack} maxW="5xl" py="4" direction={{ base: 'column', md: 'row' }} spacing="4" justify={{ base: 'center', md: 'space-between' }} align={{ base: 'center', md: 'center' }}>					
					<Text>® 2021 ModelCanvas.</Text>
					<Stack direction="row" spacing="6">
						<ChakraLink href="#">Github</ChakraLink>
					</Stack>
				</Container>
			</Box>
		</>
	);
}

MainLayout.propTypes = {
	children: PropTypes.node
};