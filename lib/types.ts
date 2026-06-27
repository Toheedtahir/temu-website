export interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  features: string[] | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Plan {
  id: string
  name: string
  price: number
  price_display: string | null
  duration: string
  description: string | null
  features: string[] | null
  is_popular: boolean
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Portfolio {
  id: string
  title: string
  client_type: string | null
  description: string | null
  results: string | null
  tags: string[] | null
  image_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  client_store: string | null
  message: string
  rating: number
  is_active: boolean
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  whatsapp: string | null
  store_type: string | null
  message: string | null
  status: 'new' | 'contacted' | 'closed'
  created_at: string
}

export interface Account {
  id: string
  account_name: string
  niche: string
  products_count: number | null
  monthly_sales: string | null
  rating: number | null
  highlight: string | null
  is_active: boolean
  created_at: string
}
