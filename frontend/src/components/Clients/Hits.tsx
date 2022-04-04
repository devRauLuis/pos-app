import { Box, Pagination } from '@mui/material';
import { GridCallbackDetails, GridSortModel } from '@mui/x-data-grid';
import {
	UseHitsProps,
	useHits,
	useHitsPerPage,
	usePagination,
} from 'react-instantsearch-hooks';
import { useEffect, useState } from 'react';

import { Hit as AlgoliaHit } from '@algolia/client-search';
import ClientsDG from './ClientsDG';
import { css } from '@emotion/react';
import { navigate } from '@reach/router';

export type HitsProps<THit> = React.ComponentProps<'div'> &
	UseHitsProps & {
		hitComponent?: (props: { hit: THit }) => JSX.Element;
	};

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
	hitComponent: Hit,
}: HitsProps<THit>) {
	const [page, setPage] = useState(0);
	const { hits, results } = useHits();
	const [hpp, setHPP] = useState(50);
	const configureHPP = useHitsPerPage({
		items: [{ value: hpp, label: 'Default', default: true }],
	});
	const { nbHits, refine } = usePagination();

	const handlePageChange = (page: number) => {
		setPage(page + 1);
	};

	useEffect(() => {
		refine(page);
	}, [page]);

	// const handleSort = (model: GridSortModel, details: GridCallbackDetails) => {};

	const ClientsDGProps = {
		hits,
		nbHits,
		hitsPerPage: hpp,
		page,
		handlePageChange,
	};

	return (
		<>
			<Box sx={{ w: 100, mt: 4 }}>
				<ClientsDG {...ClientsDGProps} />
			</Box>
		</>
	);
}

