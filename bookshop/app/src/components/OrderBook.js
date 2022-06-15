import {
  Button,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  ObjectStatus,
  StepInput,
} from '@ui5/webcomponents-react';
import React from 'react';
import { useI18nBundle } from '@ui5/webcomponents-react-base';

export function OrderBook({
  book,
  selectedQuantity,
  setSelectedQuantity,
  onSubmitOrder,
  orderStatus,
}) {
  const i18nBundle = useI18nBundle('myApp');

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.End}
      alignItems={FlexBoxAlignItems.Center}
      style={{ gap: '20px', marginTop: '15px' }}>
      {orderStatus && (
        <ObjectStatus state={orderStatus.state}>
          {orderStatus.message}
        </ObjectStatus>
      )}
      <Button onClick={onSubmitOrder} disabled={!book}>
        {i18nBundle.getText('Order')}
      </Button>
      <StepInput
        value={selectedQuantity}
        onChange={(e) => setSelectedQuantity(e.detail.value)}
        min={0}
        max={book?.stock}
        style={{ width: '15vw', textAlign: 'center' }}
      />
    </FlexBox>
  );
}
