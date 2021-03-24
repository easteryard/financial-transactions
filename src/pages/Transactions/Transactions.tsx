import * as React from 'react';
import { TransactionsQueryData, useTransactionsQuery } from '../../transactions/get_transactions';
import { TransactionsList } from './components/TransactionsList'
import ConditionalRender from "../../components/CoditionalRender";

interface TransactionsProps {
  userId: string;
}
export const Transactions = ({ userId }: TransactionsProps) => {
  const { data, loading, error } = useTransactionsQuery({
    variables: {
      userId,
    },
  });

  return (
    <ConditionalRender dataArray={[data]} loadingArray={[loading]} errorArray={[error]}
                       errorMessage={error?.message ?? 'An error occurred'}>
      {([transactionsData]: TransactionsQueryData[]) => (
        <TransactionsList data={transactionsData} />
      )}
    </ConditionalRender>
  );
};
