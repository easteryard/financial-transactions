import * as React from 'react';
import styled from 'styled-components';
import { Delete } from '@styled-icons/fluentui-system-filled';
import { Transaction } from "../../../hooks/transactions/get_transactions";
import { capitalizeFirstLetter } from '../../../utils/helperMethods';

interface IProps {
  transaction: Transaction
  handleDeletion: (id: string) => void
}

export const TransactionsListItem = ({ transaction, handleDeletion }: IProps) => {

  return (
    <StyledTransaction>
      <td>
        <img src={transaction.iconURL} />
      </td>
      <td>{transaction.type}</td>
      <td>{transaction.localizableTitle}</td>
      <td>{transaction.billingAmount.amount}</td>
      <td>{transaction.time}</td>
      <td>{capitalizeFirstLetter(transaction.status)}</td>
      <td>
        <img src={transaction.categoryIconUrl} />
      </td>
      <td>
        <StyledDeleteButton onClick={() => handleDeletion(transaction.id)} disabled={!!transaction.deleted}>
          <StyledDeleteIcon />
        </StyledDeleteButton>
      </td>
    </StyledTransaction>
  );
};

const StyledTransaction = styled.tr`
  img {
    height: 30px;
  }
`;

const StyledDeleteButton = styled.button`
  background-color: ${({ theme, disabled }) => disabled ? theme.fade2 : theme.button.negative.interactive};
  border: none;
`

const StyledDeleteIcon = styled(Delete)`
  width: 25px;
  height: 25px;
  color: white
`;
