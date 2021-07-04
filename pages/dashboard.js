/* eslint-disable jsx-a11y/no-onchange */
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useCanvas, useDispatchCanvas } from '../components/DataStore';
import type from '../components/ActionTypes';
import App from '../lib/app';
import PropTypes from 'prop-types';
import {
	//HiDocumentDuplicate,
	HiCloudUpload,
	HiCloudDownload,
	HiExclamation,	
	HiX,
	HiSparkles
} from 'react-icons/hi';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	Box,
	Heading,
	Text,
	Button,
	SimpleGrid,
	Divider,
	Stack,
	VisuallyHidden,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Textarea,
	useRadio,
	HStack,
	useRadioGroup,
	Icon,
	Flex,
	Spacer,
	IconButton,
	LinkBox,
	LinkOverlay,
} from '@chakra-ui/react';

export const RadioCard = (props) => {
	const { getInputProps, getCheckboxProps } = useRadio(props);
	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label">
			<input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderWidth="1px"
				borderRadius="md"
				boxShadow="md"
				_checked={{
					bg: 'brand.500',
					color: 'white',
					borderColor: 'brand.500',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={5}
				py={3}
				bg="white"
			>
				{props.children}
			</Box>
		</Box>
	);
};

RadioCard.propTypes = {
	children: PropTypes.node,
};

export default function Dashboard({ templates }) {
	const canvasStore = useCanvas();
	const dispatch = useDispatchCanvas();

	const [canvasName, setCanvasName] = useState('');
	const [canvasDescription, setCanvasDescription] = useState('');
	const [canvasTemplate, setCanvasTemplate] = useState('001');
	const [formVisible, setFormVisible] = useState(false);
	const [notification, setNotification] = useState(undefined);
	const fileInput = useRef(null);

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(undefined);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'template',
		defaultValue: '001',
		onChange: setCanvasTemplate,
	});

	const group = getRootProps();

	const { t } = useTranslation('common');

	const handleNewCanvas = (evt) => {
		evt.preventDefault();
		console.log(templates.find(template => template.id === canvasTemplate));
		dispatch({
			type: type.CREATE_CANVAS,
			payload: {
				name: canvasName,
				description: canvasDescription,
				template: templates.find(template => template.id === canvasTemplate),
			},
		});
		setFormVisible(false);
		setCanvasName('');
		setCanvasDescription('');
		setCanvasTemplate(1);
	};

	// const handleImport = (evt) => {
	// 	evt.preventDefault();

	// 	const dataURL = window.URL.createObjectURL(evt.target['file-import'].files[0]);
	// 	fetch(dataURL)
	// 		.then(results => results.json())
	// 		.then(data => {
	// 			dispatch({
	// 				type: type.IMPORT_DATABASE,
	// 				payload: {
	// 					data: data,
	// 				}
	// 			});
	// 		});
	// };

	const handleExportCanvas = (evt) => {
		evt.preventDefault();

		const dataURL = `data:text/json;charset=utf-8,${encodeURIComponent(
			App.exportAll(canvasStore)
		)}`;

		const anchor = document.createElement('a');
		anchor.download = 'database.json';
		anchor.href = dataURL;
		anchor.target = '_self';
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
	};

	const handleFileSelect = (evt) => {
		evt.preventDefault();

		fileInput.current.click();
		// console.log(blob);
	};

	const handleFileOpen = (evt) => {
		evt.preventDefault();

		console.log(evt.target.files[0].name);
		const dataURL = window.URL.createObjectURL(evt.target.files[0]);
		fetch(dataURL)
			.then((results) => results.json())
			.then((data) => {
				console.log(data);
			});
	};

	const handleResetDatabase = (evt) => {
		evt.preventDefault();

		dispatch({
			type: type.RESET_DATABASE,
			payload: {},
		});

		setNotification('Database sucessfully erased');
	};

	return (
		<>
			<Head>
				<title>{t('app-name')}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{canvasStore && (
				<Box>
					<Heading fontSize="3xl" py="4" fontWeight="bold">
						{t('dashboard-canvas-list-title')}
					</Heading>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
						{App.listBlocksByType(canvasStore, 'canvas').map(
							(arr) => (
								<LinkBox
									key={arr.id}
									borderWidth="2px"
									borderRadius="md"
									borderColor="gray.200"
									padding="4"
									boxShadow="md"
									backgroundColor="white"
								>
									<Flex>
										<Box>
											<Link href={{ pathname: '/canvas', query: { id: arr.id }, }} passHref={true}>
												<LinkOverlay>
													<Heading
														fontSize="lg"
														paddingY="2"
														fontWeight="semibold"
													>
														{arr.properties.name}
													</Heading>												
												</LinkOverlay>
											</Link>
											<Text fontStyle="italic">
												{arr.properties.description}
											</Text>
										</Box>
										<Spacer />
										<Box>
											<IconButton variant="unstyled" colorScheme="steel" aria-label="Delete canvas" icon={<Icon as={HiX} />} />
										</Box>
									</Flex>
									<Divider />
									<HStack>

									</HStack>
								</LinkBox>
							)
						)}
					</SimpleGrid>
					{
						formVisible 
						&& 
						<Box py="4">
							<FormControl id="canvasName" isRequired>
								<FormLabel>{t('dashboard-form-label-name')}</FormLabel>
								<Input type="text" onChange={(e) => setCanvasName(e.target.value)} value={canvasName} bg="white" />
								<FormHelperText>The name of the new canvas</FormHelperText>
							</FormControl>
							<FormControl id="canvasDescription">
								<FormLabel>{t('dashboard-form-label-description')}</FormLabel>
								<Textarea onChange={(e) => setCanvasDescription(e.target.value)} value={canvasDescription} bg="white"></Textarea>
								<FormHelperText>A brief description of your canvas</FormHelperText>
							</FormControl>
							<FormControl id="canvasTemplate">
								<FormLabel>{t('dashboard-form-label-template')}</FormLabel>
								{ /* @TODO: Improve the custom radio card */ }
								<HStack {...group}>
									{templates.map((template) => {
										const radio = getRadioProps({ value: template.id });
										return (
											<RadioCard key={template.id} {...radio}>
												{template.name}
											</RadioCard>
										);
									})}
								</HStack>
								<FormHelperText>Which template do you want to use?</FormHelperText>
							</FormControl>
							<HStack py="4" spacing="2">
								<Button variant="solid" colorScheme="brand" onClick={handleNewCanvas}>{t('dashboard-form-button-create')}</Button>
								<Button variant="outline" colorScheme="brand" onClick={() => setFormVisible(false)}>{t('dashboard-form-button-cancel')}</Button>
							</HStack>
						</Box>
					}
					{!formVisible && (
						<Stack direction="row" py="4">
							<Button
								variant="solid"
								colorScheme="brand"
								onClick={() => setFormVisible(true)}
								leftIcon={<Icon as={HiSparkles} />}
							>
								{t('dashboard-actions-button-create-canvas')}
							</Button>
							<VisuallyHidden>
								<input
									ref={fileInput}
									className="hidden"
									type="file"
									accept=".json,.canvas"
									name="file-import"
									id="file-import"
									onChange={handleFileOpen}
								/>
							</VisuallyHidden>
							<Button
								variant="solid"
								colorScheme="gray"
								onClick={handleFileSelect}
							>
								{t('dashboard-actions-button-upload-document')}
							</Button>
						</Stack>
					)}
					<Heading fontWeight="bold" fontSize="3xl" py="4">
						{t('dashboard-actions-title')}
					</Heading>
					<HStack py="4" spacing="2">
						<Button variant="solid" colorScheme="steel" onClick={handleExportCanvas} leftIcon={<Icon as={HiCloudDownload} />}>{t('dashboard-actions-button-export-database')}</Button>
						<Button variant="outline" colorScheme="steel" onClick={handleExportCanvas} leftIcon={<Icon as={HiCloudUpload} />}>{t('dashboard-actions-button-import-database')}</Button>
						<Button variant="solid" colorScheme="red" onClick={handleResetDatabase} leftIcon={<Icon as={HiExclamation} />}>{t('dashboard-actions-button-reset-database')}</Button>
					</HStack>
				</Box>
			)}
		</>
	);
}

export const getStaticProps = async ({ locale }) => {
	const JSON_URL = 'http://localhost:3000/templates/default.json';
	// const EXTERNAL_JSON_URL = 'https://gist.github.com/jctosta/4e74e193b758203e46124e727eff928f/raw/9a488705d57f48407e0dd64e614727cd2ee15ff4/canvasTemplates.json';
	const res = await fetch(
		JSON_URL
	);
	const data = await res.json();
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			templates: data.templates,
		},
	};
};

Dashboard.propTypes = {
	templates: PropTypes.arrayOf(
		PropTypes.shape({
			language: PropTypes.string,
			type: PropTypes.string,
			name: PropTypes.string,
			tiles: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string,
					description: PropTypes.string,
				})
			),
		})
	),
};
