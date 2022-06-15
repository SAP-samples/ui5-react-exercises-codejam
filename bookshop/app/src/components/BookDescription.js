import {
  FlexBox,
  FlexBoxDirection,
  Text,
  Title,
} from '@ui5/webcomponents-react';
import React from 'react';

export function BookDescription({ book }) {
  return (
    <FlexBox direction={FlexBoxDirection.Column}>
      <Title>{book.title}</Title>
      <Text>{book.descr}</Text>
    </FlexBox>
  );
}
