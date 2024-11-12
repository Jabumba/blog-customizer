import { ArrowButton } from 'src/ui/arrow-button';
import { ReactNode, useLayoutEffect, useRef, useState, useEffect } from 'react';

import clsx from 'clsx';
import stylesForArticle from '../article/Article.module.scss';
import styles from './ArticleParamsForm.module.scss';

type TProps = {
	children: ReactNode;
	buttonMenu: ReactNode;
};

export const ArticleParamsForm = (props: TProps) => {
	const asideRef = useRef<HTMLElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		function closeForm(e: any) {
			const article = document.querySelector(`.${stylesForArticle.article}`);
			if (e.target === article || article?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('click', closeForm);
		return () => document.removeEventListener('click', closeForm);
	}, []);
	useLayoutEffect(() => {
		if (isOpen) {
			asideRef.current?.classList.add(`${styles.container_open}`);
		} else {
			asideRef.current?.classList.remove(`${styles.container_open}`);
		}
	}, [isOpen]);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside ref={asideRef} className={clsx(styles.container)}>
				<form className={styles.form}>
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
					{props.children}
					{props.buttonMenu}
				</form>
			</aside>
		</>
	);
};
