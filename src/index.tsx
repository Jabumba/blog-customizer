import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from './constants/articleProps';

import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import stylesForForm from './components/article-params-form/ArticleParamsForm.module.scss';
import { RadioGroup } from './ui/radio-group';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const mainRef = useRef<HTMLElement | null>(null);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backColor, setBackColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [containerWidth, setContainerWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const doApply = () => {
		mainRef.current!.style.setProperty('--font-family', fontFamily.value);
		mainRef.current!.style.setProperty('--font-size', fontSize.value);
		mainRef.current!.style.setProperty('--font-color', fontColor.value);
		mainRef.current!.style.setProperty('--bg-color', backColor.value);
		mainRef.current!.style.setProperty(
			'--container-width',
			containerWidth.value
		);
	};
	const doReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackColor(defaultArticleState.backgroundColor);
		setContainerWidth(defaultArticleState.contentWidth);
		mainRef.current?.style.setProperty(
			'--font-family',
			defaultArticleState.fontFamilyOption.value
		);
		mainRef.current?.style.setProperty(
			'--font-size',
			defaultArticleState.fontSizeOption.value
		);
		mainRef.current?.style.setProperty(
			'--font-color',
			defaultArticleState.fontColor.value
		);
		mainRef.current?.style.setProperty(
			'--bg-color',
			defaultArticleState.backgroundColor.value
		);
		mainRef.current?.style.setProperty(
			'--container-width',
			defaultArticleState.contentWidth.value
		);
	};
	return (
		<main className={clsx(styles.main)} ref={mainRef}>
			<ArticleParamsForm
				buttonMenu={
					<div className={stylesForForm.bottomContainer}>
						<Button
							title='Сбросить'
							onClick={doReset}
							htmlType='reset'
							type='clear'
						/>
						<Button
							title='Применить'
							onClick={doApply}
							htmlType='button'
							type='apply'
						/>
					</div>
				}>
				<Select
					selected={fontFamily}
					options={fontFamilyOptions}
					placeholder=''
					onChange={(selected: OptionType) => {
						setFontFamily(selected);
					}}
					onClose={() => {}}
					title='Шрифт'
				/>
				<RadioGroup
					name='size'
					options={fontSizeOptions}
					selected={fontSize}
					onChange={(selected: OptionType) => {
						setFontSize(selected);
					}}
					title='Размер шрифта'
				/>
				<Select
					selected={fontColor}
					options={fontColors}
					placeholder=''
					onChange={(selected: OptionType) => {
						setFontColor(selected);
					}}
					onClose={() => {}}
					title='Цвет шрифта'
				/>
				<Separator />
				<Select
					selected={backColor}
					options={backgroundColors}
					placeholder=''
					onChange={(selected: OptionType) => {
						setBackColor(selected);
					}}
					onClose={() => {}}
					title='Цвет фона'
				/>
				<Select
					selected={containerWidth}
					options={contentWidthArr}
					placeholder=''
					onChange={(selected: OptionType) => {
						setContainerWidth(selected);
					}}
					onClose={() => {}}
					title='Ширина контента'
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
