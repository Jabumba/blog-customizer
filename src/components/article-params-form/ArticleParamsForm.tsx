import { ArrowButton } from 'src/ui/arrow-button';
import { useLayoutEffect, useRef, useState, useEffect, RefObject } from 'react';

import clsx from 'clsx';
import stylesForArticle from '../article/Article.module.scss';
import styles from './ArticleParamsForm.module.scss';
import { Button } from 'src/ui/button';
import {
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type TProps = {
	refObject: RefObject<HTMLElement>;
};

export const ArticleParamsForm = (props: TProps) => {
	const asideRef = useRef<HTMLElement | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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

	useEffect(() => {
		function closeForm(e: any) {
			const article = document.querySelector(`.${stylesForArticle.article}`);
			if (e.target === article || article?.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		}

		if (!isMenuOpen) return;
		document.addEventListener('click', closeForm);
		return () => document.removeEventListener('click', closeForm);
	}, [isMenuOpen]);
	useLayoutEffect(() => {
		if (isMenuOpen) {
			asideRef.current?.classList.add(`${styles.container_open}`);
		} else {
			asideRef.current?.classList.remove(`${styles.container_open}`);
		}
	}, [isMenuOpen]);

	const doApply = (evt: any) => {
		evt.preventDefault();
		const mainElement = props.refObject.current;
		mainElement?.style.setProperty('--font-family', fontFamily.value);
		mainElement?.style.setProperty('--font-size', fontSize.value);
		mainElement?.style.setProperty('--font-color', fontColor.value);
		mainElement?.style.setProperty('--bg-color', backColor.value);
		mainElement?.style.setProperty('--container-width', containerWidth.value);
	};
	const doReset = () => {
		const mainElement = props.refObject.current;
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackColor(defaultArticleState.backgroundColor);
		setContainerWidth(defaultArticleState.contentWidth);
		mainElement?.style.setProperty(
			'--font-family',
			defaultArticleState.fontFamilyOption.value
		);
		mainElement?.style.setProperty(
			'--font-size',
			defaultArticleState.fontSizeOption.value
		);
		mainElement?.style.setProperty(
			'--font-color',
			defaultArticleState.fontColor.value
		);
		mainElement?.style.setProperty(
			'--bg-color',
			defaultArticleState.backgroundColor.value
		);
		mainElement?.style.setProperty(
			'--container-width',
			defaultArticleState.contentWidth.value
		);
	};
	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside ref={asideRef} className={clsx(styles.container)}>
				<form className={styles.form} onSubmit={doApply} onReset={doReset}>
					<h2
						style={{
							fontFamily: 'Open Sans',
							fontSize: '31px',
							fontWeight: 800,
							lineHeight: '42.22px',
							textAlign: 'left',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
							textTransform: 'uppercase',
						}}>
						Задайте параметры
					</h2>
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

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
