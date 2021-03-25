import * as React from 'react';
import { TransactionsQueryData, useTransactionsQuery } from '../../hooks/transactions/get_transactions';
import { TransactionsList } from './components/TransactionsList'
import ConditionalRender from '../../components/CoditionalRender';
import styled, { useTheme } from 'styled-components';
import { useDeleteAuthorizationMutation } from '../../hooks/transactions/delete_authorization';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { useState } from 'react';
import useUserToken from '../../hooks/useUserToken';
import getToast from '../../utils/toastMethods';

export const Transactions = () => {
  const { userId } = useUserToken()
  const [selectedTransactionId, setSelectedTransactionId] = useState('')
  const theme = useTheme()
  const { data, loading, error } = useTransactionsQuery({
    variables: {
      userId
    }
  })
  const [deleteAuthorizationMutation] = useDeleteAuthorizationMutation()

  function handleSelectTransaction (id: string) {
    setSelectedTransactionId(id)
  }

  function handleDeletion () {
    deleteAuthorizationMutation({ variables: { transactionId: selectedTransactionId } })
      .then(() => getToast('The transaction has been deleted'))
      .catch(() => getToast('An error occurred during deletion', { type: 'error' }))
    setSelectedTransactionId('')
  }

  function handleDialogClose () {
    setSelectedTransactionId('')
  }

  return (
    <StyledCard>
      <ConditionalRender dataArray={[data]} loadingArray={[loading]} errorArray={[error]}
                         errorMessage={error?.message ?? 'An error occurred'}>
        {([transactionsData]: TransactionsQueryData[]) => (
          <TransactionsList data={transactionsData} handleDeletion={handleSelectTransaction} />
        )}
      </ConditionalRender>
      <ConfirmationDialog isOpen={!!selectedTransactionId} dialogText='Do you wish to delete the transaction?'
                          confirmText='Delete' onConfirm={handleDeletion} onCancel={handleDialogClose}
                          confirmColor={theme.button.negative.interactive} />
    </StyledCard>
  )
}

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 32px;
  flex: 1 0 auto;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 24px;
  flex: 1 0 auto;
`;
