export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  role?: "admin" | "customer";
  customer: Customer;
  balance: Balance;
  package: Package;
  created_at: string;
  updated_at: string;
}

export interface Balance {
  id: number;
  amount: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  active: boolean;
  cpf: string;
  pix: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: number;
  url: string;
  duration: number;
  watched_time: number;
  price: number;
  created_at: string;
  updated_at: string;
  pivot?: {
    watched_at: string;
    watched_time: number;
  };
}

export interface Package {
  id: number;
  name: string;
  price: number;
  withdraw_percentage: number;
  duration_in_months: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  item_id: number;
  amount: number;
  gross_amount: number;
  external_id: string;
  transaction_type: TransactionType;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
}

export type TransactionType = "deposit" | "withdraw";

export type TransactionStatus = "completed" | "pending" | "failed";

export interface Dashboard {
  totalDeposits: number;
  totalWithdrawals: number;
  totalVideosWatched: number;
  depositLast6Months: Array<{ date: string; total: number }>;
  withdrawalsLast6Months: Array<{ date: string; total: number }>;
  balanceLast12Months: Array<{ date: string; total: number }>;
  depositsByPackage: Array<{ package: string; total: number }>;
  clientsByPackage: Array<{ package: string; total: number }>;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  helpers: {
    user_home: string;
    user_balance: number;
    user_pix: string;
    user_package: Package;
  };
  flash: {
    success: string;
    error: string;
    thank_you: "withdraw" | "checkout";
  };
};

export interface PaginatedResponse<T> {
  data: T[];
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  current_page: number;
  total: number;
}
