-- Services table
create table services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  features text[],
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Pricing plans table
create table plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  duration text not null,
  description text,
  features text[],
  is_popular boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Portfolio / Case studies table
create table portfolio (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  client_type text,
  description text,
  results text,
  tags text[],
  image_url text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Testimonials table
create table testimonials (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  client_store text,
  message text not null,
  rating int default 5,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Contact inquiries table
create table inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  whatsapp text,
  store_type text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table services enable row level security;
alter table plans enable row level security;
alter table portfolio enable row level security;
alter table testimonials enable row level security;
alter table inquiries enable row level security;

-- Public read policies
create policy "Public read services" on services for select using (is_active = true);
create policy "Public read plans" on plans for select using (is_active = true);
create policy "Public read portfolio" on portfolio for select using (is_active = true);
create policy "Public read testimonials" on testimonials for select using (is_active = true);

-- Anyone can submit inquiry
create policy "Anyone can submit inquiry" on inquiries for insert with check (true);

-- Authenticated admin policies
create policy "Admin all services" on services for all using (auth.role() = 'authenticated');
create policy "Admin all plans" on plans for all using (auth.role() = 'authenticated');
create policy "Admin all portfolio" on portfolio for all using (auth.role() = 'authenticated');
create policy "Admin all testimonials" on testimonials for all using (auth.role() = 'authenticated');
create policy "Admin all inquiries" on inquiries for all using (auth.role() = 'authenticated');

-- Seed data
insert into services (title, description, icon, features, sort_order) values
('Product Listing Optimization', 'Professional product titles, descriptions, and keywords to maximize your Temu store visibility', '📦', array['SEO-optimized titles', 'Compelling descriptions', 'Keyword research', 'Competitor analysis'], 1),
('Store Setup & Management', 'Complete Temu store setup from scratch or full ongoing management', '🏪', array['Store profile setup', 'Category organization', 'Inventory management', 'Policy writing'], 2),
('Customer Service', 'Professional customer support to maintain high ratings and resolve issues', '💬', array['24-hour response time', 'Dispute resolution', 'Review management', 'Returns handling'], 3),
('Product Research', 'Find winning products with high demand and low competition on Temu', '🔍', array['Market research', 'Trend analysis', 'Supplier sourcing', 'Profit margin analysis'], 4),
('Order & Inventory Management', 'Keep your orders fulfilled and inventory always optimized', '📋', array['Order tracking', 'Stock alerts', 'Fulfillment coordination', 'Reporting'], 5),
('Analytics & Reporting', 'Data-driven insights to grow your Temu store revenue month over month', '📊', array['Monthly reports', 'Sales analysis', 'Performance tracking', 'Growth recommendations'], 6);

insert into plans (name, price, duration, description, features, is_popular, sort_order) values
('Starter', 150, 'per month', 'Perfect for new Temu store owners', array['Up to 50 product listings', 'Basic store setup', 'Weekly check-ins', 'Email support'], false, 1),
('Professional', 350, 'per month', 'For growing stores that need full management', array['Unlimited product listings', 'Full store management', 'Customer service', 'Daily monitoring', 'Weekly reports', 'WhatsApp support'], true, 2),
('Elite', 600, 'per month', 'Complete done-for-you Temu business management', array['Everything in Professional', 'Product research', 'Competitor analysis', 'Monthly strategy call', 'Priority support', 'Ad campaign assistance'], false, 3);
