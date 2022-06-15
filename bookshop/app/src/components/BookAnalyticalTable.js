import {
  AnalyticalTable,
  ObjectStatus,
  TableSelectionBehavior,
  TableSelectionMode,
  Text,
  ValueState,
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/search.js';
import React from 'react';
import { useI18nBundle } from '@ui5/webcomponents-react-base';

export function BookAnalyticalTable({ bookData, onRowClick }) {
  const i18nBundle = useI18nBundle('myApp');

  const columns = [
    {
      Header: i18nBundle.getText('Book'),
      accessor: 'title',
      Cell: ({ cell }) => {
        return <strong>{cell.value}</strong>;
      },
    },
    {
      Header: i18nBundle.getText('Author'),
      accessor: 'author',
    },
    {
      Header: i18nBundle.getText('Genre'),
      accessor: 'genre.name',
    },
    {
      Header: i18nBundle.getText('Price'),
      accessor: 'price',
      Cell: ({ cell }) => {
        const currencyCode = cell.row.original.currency_code;
        const formattedNumber = cell.value.toFixed(2);
        return (
          <Text>
            <strong>{formattedNumber}</strong> {currencyCode}
          </Text>
        );
      },
    },
    {
      Header: i18nBundle.getText('Stock'),
      accessor: 'stock',
      Cell: ({ cell }) => {
        return (
          <ObjectStatus
            state={
              cell.value >= 20
                ? ValueState.Success
                : cell.value >= 20
                ? ValueState.Warning
                : ValueState.Error
            }>
            {cell.value}
          </ObjectStatus>
        );
      },
    },
  ];

  return (
    <AnalyticalTable
      selectionBehavior={TableSelectionBehavior.RowOnly}
      selectionMode={TableSelectionMode.SingleSelect}
      minRows={1}
      data={bookData}
      columns={columns}
      onRowClick={(e) => onRowClick(e.detail.row.original.ID)}
      withRowHighlight={false}
    />
  );
}
