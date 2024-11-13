import { forwardRef, RefObject, useRef } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import styles from './App.module.scss';

export const App = () => {
	const mainRef = useRef(null);
	const Main = forwardRef<HTMLElement>((props, ref) => {
		return (
			<main className={styles.main} ref={ref}>
				<ArticleParamsForm refObject={ref as RefObject<HTMLButtonElement>} />
				<Article />
			</main>
		);
	});
	Main.displayName = 'Main';
	return <Main ref={mainRef} />;
};
