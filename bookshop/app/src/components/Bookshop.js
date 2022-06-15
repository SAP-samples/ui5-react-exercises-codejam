import React, { useCallback, useEffect, useState } from 'react';
import {
  Page,
  Title,
  Panel,
  FlexBox,
  FlexBoxDirection,
  Input,
  Button,
  ButtonDesign,
  ValueState,
} from '@ui5/webcomponents-react';
import { BookTable } from './BookTable';
import { BookDescription } from './BookDescription';
import { OrderBook } from './OrderBook';
import { BookAnalyticalTable } from './BookAnalyticalTable';
import { getBookList, submitOrder } from './utils';
import { useI18nBundle } from '@ui5/webcomponents-react-base';

export function Bookshop() {
  const i18nBundle = useI18nBundle('myApp');

  // state
  const [bookList, setBookList] = useState([]);
  const [filteredBookList, setFilteredBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [orderStatus, setOrderStatus] = useState(null);
  const [filterString, setFilterString] = useState('');

  // Grab data from here and set to state
  useEffect(() => {
    // cannot have async calls in a useEffect but can in a function within the useEffect.
    const fetchData = async () => {
      const result = await getBookList();
      const bookList = result.value;

      setBookList(bookList);
      setFilteredBookList(bookList);
    };

    fetchData();
  }, []);

  const filterBooks = useCallback(
    (searchString) => {
      const filteredList = bookList.filter((book) =>
        book.title.toLowerCase().includes(searchString.toLowerCase())
      );
      setFilteredBookList(filteredList);
    },
    [bookList]
  );

  useEffect(() => {
    filterBooks(filterString);
  }, [filterString, bookList, filterBooks]);

  const onSearch = (searchString) => {
    setOrderStatus({
      state: ValueState.None,
      message: '',
    });
    setSelectedBook(null);

    filterBooks(searchString);
    setFilterString(searchString);
  };

  const onSelect = (bookID) => {
    setOrderStatus({
      state: ValueState.None,
      message: '',
    });

    const bookWithID = bookList.find((book) => book.ID === Number(bookID));
    setSelectedBook(bookWithID);
    setSelectedQuantity(1);
  };

  const onSubmitOrder = async () => {
    const book = { ...selectedBook };
    const response = await submitOrder(book.ID, selectedQuantity);

    if (response) {
      setOrderStatus({
        state: ValueState.Success,
        message: `${i18nBundle.getText('orderSuccessful')} (${
          book.title
        }, ${selectedQuantity} ${i18nBundle.getText('pieces')})`,
      });

      // update book stock, replace book in list with new book, and set new list to state
      book.stock = response.stock;
      const newBookList = [...bookList];
      const bookIndex = newBookList.findIndex((b) => b.ID === book.ID);
      newBookList[bookIndex] = book;
      setBookList(newBookList);
    } else {
      setOrderStatus({
        state: ValueState.Error,
        message: i18nBundle.getText('Error'),
      });
    }
  };

  return (
    <Page
      header={<Title>{i18nBundle.getText('Bookshop')}</Title>}
      style={{
        height: '100vh',
      }}>
      <Panel headerText="Hello, Dev! 👋" fixed={true}>
        <Input
          icon={<Button design={ButtonDesign.Transparent} icon="search" />}
          placeholder="Search"
          style={{ width: '100%' }}
          onInput={(e) => onSearch(e.target.value)}
          showClearIcon
        />
        <BookTable
          bookData={filteredBookList}
          onSelectionChange={onSelect}
        />
        <BookAnalyticalTable
          bookData={filteredBookList}
          onRowClick={onSelect}
          filterString={filterString}
        />
        <FlexBox direction={FlexBoxDirection.Column}>
          <OrderBook
            book={selectedBook}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            onSubmitOrder={onSubmitOrder}
            orderStatus={orderStatus}
          />
          {selectedBook && <BookDescription book={selectedBook} />}
        </FlexBox>
      </Panel>
    </Page>
  );
}
