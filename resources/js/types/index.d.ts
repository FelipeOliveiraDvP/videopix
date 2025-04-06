export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  role?: "admin" | "customer";
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
  created_at: string;
  updated_at: string;
}

export type TransactionType = "deposit" | "withdraw";

export type TransactionStatus = "success" | "pending" | "failed";

export type CustomPageProps = {
  auth: {
    user: User;
  };
  helpers: {
    user_home: string;
  };
  flash: {
    success: string;
    error: string;
    thank_you: "withdraw" | "checkout";
  };
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & CustomPageProps;

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
