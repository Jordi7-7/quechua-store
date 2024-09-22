export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      backpack_color_configuration: {
        Row: {
          bottom_color: string
          id: string
          middle_color: string
          product_item_id: string
          top_color: string
          zipper_color: string
        }
        Insert: {
          bottom_color: string
          id?: string
          middle_color: string
          product_item_id: string
          top_color: string
          zipper_color: string
        }
        Update: {
          bottom_color?: string
          id?: string
          middle_color?: string
          product_item_id?: string
          top_color?: string
          zipper_color?: string
        }
        Relationships: [
          {
            foreignKeyName: "backpack_color_configuration_bottom_color_fkey"
            columns: ["bottom_color"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "backpack_color_configuration_middle_color_fkey"
            columns: ["middle_color"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "backpack_color_configuration_product_item_id_fkey"
            columns: ["product_item_id"]
            isOneToOne: false
            referencedRelation: "product_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "backpack_color_configuration_top_color_fkey"
            columns: ["top_color"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "backpack_color_configuration_zipper_color_fkey"
            columns: ["zipper_color"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
        ]
      }
      color: {
        Row: {
          hex_code: string
          id: string
          name: string
        }
        Insert: {
          hex_code: string
          id?: string
          name: string
        }
        Update: {
          hex_code?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      person: {
        Row: {
          address: string | null
          id: string
          last_name: string | null
          name: string
          phone: string | null
        }
        Insert: {
          address?: string | null
          id?: string
          last_name?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          address?: string | null
          id?: string
          last_name?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          category_id: string
          description: string | null
          id: string
          name: string
          product_image: string | null
        }
        Insert: {
          category_id: string
          description?: string | null
          id?: string
          name: string
          product_image?: string | null
        }
        Update: {
          category_id?: string
          description?: string | null
          id?: string
          name?: string
          product_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
        ]
      }
      product_category: {
        Row: {
          category_name: string
          id: string
        }
        Insert: {
          category_name: string
          id?: string
        }
        Update: {
          category_name?: string
          id?: string
        }
        Relationships: []
      }
      product_configuration: {
        Row: {
          product_item_id: string
          variation_option_id: string
        }
        Insert: {
          product_item_id: string
          variation_option_id: string
        }
        Update: {
          product_item_id?: string
          variation_option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_configuration_product_item_id_fkey"
            columns: ["product_item_id"]
            isOneToOne: false
            referencedRelation: "product_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_configuration_variation_option_id_fkey"
            columns: ["variation_option_id"]
            isOneToOne: false
            referencedRelation: "variation_option"
            referencedColumns: ["id"]
          },
        ]
      }
      product_item: {
        Row: {
          id: string
          product_id: string
          product_image: string | null
          purchase_price: number | null
          qty_in_stock: number
          sale_price: number | null
          SKU: string | null
        }
        Insert: {
          id?: string
          product_id: string
          product_image?: string | null
          purchase_price?: number | null
          qty_in_stock: number
          sale_price?: number | null
          SKU?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          product_image?: string | null
          purchase_price?: number | null
          qty_in_stock?: number
          sale_price?: number | null
          SKU?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase: {
        Row: {
          id: string
          person_id: string
          purchase_date: string | null
          total_amount: number
        }
        Insert: {
          id?: string
          person_id: string
          purchase_date?: string | null
          total_amount: number
        }
        Update: {
          id?: string
          person_id?: string
          purchase_date?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_item: {
        Row: {
          id: string
          product_item_id: string
          purchase_id: string
          qty: number
        }
        Insert: {
          id?: string
          product_item_id: string
          purchase_id: string
          qty: number
        }
        Update: {
          id?: string
          product_item_id?: string
          purchase_id?: string
          qty?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_item_product_item_id_fkey"
            columns: ["product_item_id"]
            isOneToOne: false
            referencedRelation: "product_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_item_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchase"
            referencedColumns: ["id"]
          },
        ]
      }
      sale: {
        Row: {
          id: string
          person_id: string
          sale_date: string | null
          total_amount: number
        }
        Insert: {
          id?: string
          person_id: string
          sale_date?: string | null
          total_amount: number
        }
        Update: {
          id?: string
          person_id?: string
          sale_date?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_item: {
        Row: {
          id: string
          product_item_id: string
          qty: number
          sale_id: string
        }
        Insert: {
          id?: string
          product_item_id: string
          qty: number
          sale_id: string
        }
        Update: {
          id?: string
          product_item_id?: string
          qty?: number
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_item_product_item_id_fkey"
            columns: ["product_item_id"]
            isOneToOne: false
            referencedRelation: "product_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_item_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sale"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      variation: {
        Row: {
          category_id: string
          id: string
          name: string
        }
        Insert: {
          category_id: string
          id?: string
          name: string
        }
        Update: {
          category_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "variation_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
        ]
      }
      variation_option: {
        Row: {
          id: string
          value: string
          variation_id: string
        }
        Insert: {
          id?: string
          value: string
          variation_id: string
        }
        Update: {
          id?: string
          value?: string
          variation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variation_option_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "variation"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
