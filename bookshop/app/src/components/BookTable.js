import {
  ObjectStatus,
  Table,
  TableCell,
  TableColumn,
  TableMode,
  TableRow,
  TableRowType,
  Text,
  ValueState,
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/search.js';
import React from 'react';
import { useI18nBundle } from '@ui5/webcomponents-react-base';

export function BookTable({ bookData, onSelectionChange }) {
  const i18nBundle = useI18nBundle('myApp');

  const tableColumns = () => (
    <>
      <TableColumn>
        <Text>
          <strong>{i18nBundle.getText('Book')}</strong>
        </Text>
      </TableColumn>
      <TableColumn>
        <Text>
          <strong>{i18nBundle.getText('Author')}</strong>
        </Text>
      </TableColumn>
      <TableColumn>
        <Text>
          <strong>{i18nBundle.getText('Genre')}</strong>
        </Text>
      </TableColumn>
      <TableColumn>
        <Text>
          <strong>{i18nBundle.getText('Price')}</strong>
        </Text>
      </TableColumn>
      <TableColumn>
        <Text>
          <strong>{i18nBundle.getText('Stock')}</strong>
        </Text>
      </TableColumn>
    </>
  );

  const tableRows = (data) =>
    data.map((book) => (
      <TableRow key={book.ID} id={book.ID} type={TableRowType.Active}>
        <TableCell>
          <Text>
            <strong>{book.title}</strong>
          </Text>
        </TableCell>
        <TableCell>
          <Text>{book.author}</Text>
        </TableCell>
        <TableCell>
          <Text>{book.genre.name}</Text>
        </TableCell>
        <TableCell>
          <Text>
            <strong>{book.price.toFixed(2)}</strong> {book.currency_code}
          </Text>
        </TableCell>
        <TableCell>
          <ObjectStatus
            state={
              book.stock >= 20
                ? ValueState.Success
                : book.stock >= 20
                ? ValueState.Warning
                : ValueState.Error
            }>
            {book.stock}
          </ObjectStatus>
        </TableCell>
      </TableRow>
    ));

  return (
    <Table
      columns={tableColumns()}
      noDataText="No Data"
      mode={TableMode.SingleSelect}
      onRowClick={(e) => onSelectionChange(e.detail.row.id)}>
      {tableRows(bookData)}
    </Table>
  );
}
