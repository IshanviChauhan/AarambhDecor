import { useSelector } from 'react-redux';
import { useGetPaymentsByEmailQuery } from '../../redux/features/payments/paymentApi';

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  
  // Fetch payment data from API
  const { data: paymentData, error, isLoading } = useGetPaymentsByEmailQuery(user?.email, {
    skip: !user?.email, // Skip the query if no user email is available
  });

  const payments = paymentData?.payments || [];
  const summary = paymentData?.summary || {
    totalPaid: "0.00",
    totalTransactions: 0,
    successRate: 0,
    methodSummary: {}
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-700 font-body">Loading payment history...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Error Loading Payments</h3>
          <p className="text-gray-600 font-body">Failed to load payment history. Please try again later.</p>
        </div>
      </div>
    );
  }

  // No payments state
  if (payments.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Payment History</h1>
          <p className="text-gray-600 font-body">Track your payment transactions and history</p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">No Payments Yet</h3>
          <p className="text-gray-600 font-body mb-6">Your payment history will appear here once you make purchases</p>
          <a 
            href="/shop"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-body font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Start Shopping</span>
          </a>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'credit card':
      case 'debit card':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'upi':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'cash on delivery':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'net banking':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
    }
  };

  const getPaymentDetails = (payment) => {
    switch (payment.method.toLowerCase()) {
      case 'credit card':
      case 'debit card':
        return payment.cardLast4 ? `**** **** **** ${payment.cardLast4}` : 'Card payment';
      case 'upi':
        return payment.upiId || 'UPI payment';
      case 'cash on delivery':
        return 'Payment on delivery';
      case 'net banking':
        return payment.bank || 'Net banking';
      default:
        return 'Payment processed';
    }
  };

  // Use summary data from API
  const totalPaid = parseFloat(summary.totalPaid);
  const totalTransactions = summary.totalTransactions;
  const successRate = summary.successRate;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Payment History</h1>
        <p className="text-gray-600 font-body">Track your payment transactions and history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <h3 className="text-sm font-body font-medium text-gray-600 mb-1">Total Paid</h3>
          <p className="text-xl font-numeric font-bold text-gray-900">Rs. {totalPaid.toFixed(2)}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <h3 className="text-sm font-body font-medium text-gray-600 mb-1">Transactions</h3>
          <p className="text-xl font-numeric font-bold text-gray-900">{totalTransactions}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <h3 className="text-sm font-body font-medium text-gray-600 mb-1">Success Rate</h3>
          <p className="text-xl font-numeric font-bold text-gray-900">{successRate}%</p>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden">
        {/* Mobile view - Card layout */}
        <div className="block sm:hidden">
          <div className="p-4 space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-body font-semibold text-gray-900">Order ID: {payment.orderId.slice(-8)}</p>
                    <p className="text-xs text-gray-600 font-body">TXN: {payment.transactionId.slice(-6)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-body font-medium border ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-body">Amount:</span>
                    <span className="text-sm font-numeric font-semibold text-gray-900">Rs. {payment.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-body">Method:</span>
                    <div className="flex items-center space-x-1">
                      {getMethodIcon(payment.method)}
                      <span className="text-sm text-gray-900 font-body">{payment.method}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-body">Details:</span>
                    <span className="text-sm text-gray-900 font-body">{getPaymentDetails(payment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-body">Date:</span>
                    <span className="text-sm text-gray-900 font-body">{new Date(payment.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view - Table layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-white/10 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-body text-gray-900 font-medium">{payment.orderId.slice(-8)}</td>
                  <td className="px-6 py-4 text-sm font-numeric font-semibold text-gray-900">Rs. {payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-sm font-body text-gray-900">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-body text-gray-600">{getPaymentDetails(payment)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-body font-medium border ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-body text-gray-900">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-body text-gray-600">{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Summary */}
      <div className="mt-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Payment Methods Used</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(summary.methodSummary || {}).map(([method, count]) => (
            <div key={method} className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                {getMethodIcon(method)}
              </div>
              <h4 className="text-xs font-body font-medium text-gray-600 mb-1">{method}</h4>
              <p className="text-lg font-numeric font-bold text-primary">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPayments;
