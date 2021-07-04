import { useDisclosure, Flex, Heading, Box, Stack, Button, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Header(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleToggle = () => (isOpen ? onClose() : onOpen());

	return (
		<Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="6" bg="brand.500" color="white" {...props}>
			<Flex align="center" mr="5">
				<Link href="/" passHref={true}>
					<ChakraLink>
						<Heading as="h1" size="lg" letterSpacing="tighter">Model Canvas</Heading>
					</ChakraLink>
				</Link>
			</Flex>

			<Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
				<HamburgerIcon />
			</Box>

			<Stack 
				direction={{ base: 'column', md: 'row' }} 
				display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
				width={{ base: 'full', md: 'auto' }}
				alignItems="center"
				flexGrow={1}
				mt={{ base: 4, md: 0 }}
			>
				<Link href="/dashboard" passHref={true}>
					<ChakraLink>Dashboard</ChakraLink>
				</Link>
				<Link href="/help" passHref={true}>
					<ChakraLink>Help</ChakraLink>
				</Link>
				<Link href="/donate" passHref={true}>
					<ChakraLink>Donate</ChakraLink>
				</Link>				
			</Stack>
			
			<Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
				<Button variant="outline" _hover={{ bg: 'brand.700', borderColor: 'brand.700' }}>
					New Canvas
				</Button>
			</Box>

		</Flex>
	);
}