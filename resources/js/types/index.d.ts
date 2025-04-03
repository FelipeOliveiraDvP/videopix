export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  cpf: string;
  pix: string;
  email_verified_at?: string;
  role?: "admin" | "customer";
  balance: number;
}

export interface Video {
  id: number;
  url: string;
  duration: number;
  watched_time: number;
  price: number;
  created_at: string;
  updated_at: string;
}

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
