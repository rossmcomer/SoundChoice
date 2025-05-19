// Format payment status for display on screen
export const useFormatPaymentStatus = (status: string): string => {
  switch (status) {
    case 'unpaid':
      return 'Unpaid';
    case 'depositReceived':
      return '50% Deposit Received ✅';
    case 'remainingPaymentFailed':
      return 'Remaining Payment Failed ❌';
    case 'paidInFull':
      return 'Paid In Full ✅';
    case 'depositFailed':
      return 'Deposit Failed';
    default:
      return 'Unknown';
  }
};
