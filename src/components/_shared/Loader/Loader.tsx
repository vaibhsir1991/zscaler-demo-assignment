import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export interface LoaderProps extends IContentLoaderProps {
	numbeOfLines?: number;
}

const Loader = ({ numbeOfLines = 4, ...props }: LoaderProps) => (
	<ContentLoader
		speed={2}
		width={540}
		height={180}
		viewBox='0 0 540 180'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		{new Array(numbeOfLines).fill('').map((_item, index) => (
			<React.Fragment key={index}>
				<rect
					x='20'
					y={(index + 1) * 32}
					rx='3'
					ry='3'
					width='250'
					height='15'
				/>
				<rect
					x='290'
					y={(index + 1) * 32}
					rx='3'
					ry='3'
					width='250'
					height='15'
				/>
			</React.Fragment>
		))}
	</ContentLoader>
);

export default Loader;
