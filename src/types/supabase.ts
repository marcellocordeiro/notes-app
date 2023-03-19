export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          content: string;
          created_at: string | null;
          id: number;
          user_id: string;
        };

        Insert: {
          content?: string;
          created_at?: string | null;
          id?: number;
          user_id: string;
        };

        Update: {
          content?: string;
          created_at?: string | null;
          id?: number;
          user_id?: string;
        };
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
