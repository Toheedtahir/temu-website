-- Add price_display column to plans
alter table plans add column if not exists price_display text;

-- Clear old data and insert real 9 services
truncate table services;
insert into services (title, description, icon, features, sort_order) values
('Product Listing with SEO', 'We create high-converting product listings using advanced keyword research. Your products will rank higher in Temu search results and attract the right buyers.', '📦', array['High-end keyword research specific to your niche', 'SEO-optimized titles (keyword-rich, character-limit perfect)', 'Compelling descriptions that convert browsers to buyers', 'Benefit-driven bullet points for key features', 'Competitor keyword analysis to outrank similar listings', 'Category & subcategory selection for maximum visibility'], 1),
('High-Quality Image Creation', 'We produce professional-grade visuals that make your products stand out. Great images are the #1 driver of Temu sales conversions.', '🖼️', array['Infographic images with text overlays showing product specs', 'Lifestyle images placing products in real-world scenarios', 'Clean white-background product shots (marketplace standard)', 'Comparison and size-guide images', 'Image editing, enhancement, and background removal', 'All images formatted to Temu platform requirements'], 2),
('Product Price Approval & Submission', 'Navigating Temu''s price approval process can be tricky. We handle the entire approval workflow so your products go live without delays.', '✅', array['Price research aligned with Temu platform policies', 'Submission and follow-up with Temu approval team', 'Repricing strategy to stay competitive and approved', 'Handling rejection responses and resubmission', 'Monitoring pricing changes for compliance'], 3),
('Product Analysis & Research', 'Data-driven decisions lead to better results. We analyze your market to find winning products and optimize your current catalog.', '🔍', array['Winning product research with demand & competition analysis', 'Trend identification to stock the right products', 'Sales velocity and conversion rate analysis', 'Catalog performance audit with improvement recommendations', 'Supplier and pricing research for better margins'], 4),
('Promotions & Ads Management', 'We create and manage Temu promotional campaigns that drive visibility and sales. From label creation to ad optimization — fully handled.', '📢', array['Temu ad campaign setup and ongoing optimization', 'Promotional label design (sale badges, discount stickers)', 'Flash sale and limited-time offer coordination', 'Coupon and discount strategy planning', 'Ad performance reporting with actionable insights'], 5),
('Customer Support Services', 'We provide professional, timely customer support to maintain your store rating and build buyer trust. Happy customers = more sales.', '💬', array['Responding to buyer questions within 24 hours', 'Handling returns, refunds, and dispute resolution', 'Negative review management and response strategy', 'Order status update communication', 'Escalation handling with Temu platform support'], 6),
('Daily Store Management', 'Your store needs daily attention to perform at its best. We provide hands-on daily management so nothing falls through the cracks.', '📋', array['Daily order monitoring and fulfillment tracking', 'Inventory level monitoring and restocking alerts', 'Listing health checks (flagged, inactive, suppressed)', 'Competitor price and ranking monitoring', 'Daily performance metrics review'], 7),
('Sales Optimization', 'We use proven strategies to grow your store revenue month over month. From listing tweaks to conversion optimization — we make your numbers climb.', '📈', array['Conversion rate optimization for existing listings', 'A/B testing of titles, images, and pricing', 'Cross-sell and upsell bundle recommendations', 'Seasonal campaign planning for peak sales periods', 'Monthly growth strategy with clear KPIs'], 8),
('Store Growth: Zero to 100', 'Starting from scratch or stuck at a plateau? We build a complete growth roadmap and execute it — taking your store from zero visibility to consistent sales.', '🚀', array['Full store setup from the ground up', 'Brand identity and store profile optimization', 'First 30/60/90 day growth plan', 'Organic ranking strategy through listing optimization', 'Social proof building (reviews, ratings, Q&A)', 'Progress reporting with milestone tracking'], 9);

-- Clear old plans and insert real plans with price ranges
truncate table plans;
insert into plans (name, price, price_display, duration, description, features, is_popular, sort_order) values
('Basic', 150, '$150 – $250', 'per month', 'Best for New Temu Sellers — 30-50 products/month', array['Upload 30–50 products per month', 'SEO-optimized product titles', 'Product descriptions (standard)', 'Category & subcategory selection', 'Basic image resizing & formatting', 'Weekly inventory updates', 'Email support'], false, 1),
('Standard', 350, '$350 – $600', 'per month', 'Best for Growing Stores — 100-200 products/month', array['Upload 100–200 products per month', 'Advanced SEO (title + bullets + description)', 'Product research & winning product analysis', 'Image editing & infographic creation', 'Inventory management & restocking alerts', 'Order tracking & fulfillment monitoring', 'Weekly performance report', 'Customer support (limited hours)', 'Price approval assistance', 'Promotions & basic ads management'], true, 2),
('Premium', 800, '$800 – $1,500+', 'per month', 'Best for Established Businesses — 300+ products', array['Unlimited / 300+ product listings', 'Daily store management', 'Full SEO optimization across catalog', 'Product research & competitor analysis', 'Professional image editing + lifestyle images', 'Inventory management & order processing', 'Full customer support (daily)', 'Store optimization (conversion rate, rankings)', 'Promotions, ads, and label design', 'Product price approval & submission', 'Weekly + monthly performance reports', 'Dedicated account manager', 'Monthly strategy call'], false, 3);

-- Create accounts table
create table if not exists accounts (
  id uuid default gen_random_uuid() primary key,
  account_name text not null,
  niche text not null,
  products_count integer,
  monthly_sales text,
  rating numeric,
  highlight text,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table accounts enable row level security;
create policy "Public read accounts" on accounts for select using (is_active = true);
create policy "Admin all accounts" on accounts for all using (auth.role() = 'authenticated');

-- Seed accounts
insert into accounts (account_name, niche, is_active) values
('Account 1', 'Clothing & Apparel', true),
('Account 2', 'Home & Garden', true),
('Account 3', 'Beauty & Personal Care', true),
('Account 4', 'Electronics Accessories', true),
('Account 5', 'Sports & Outdoors', true),
('Account 6', 'Toys & Kids', true),
('Account 7', 'Kitchen & Dining', true),
('Account 8', 'General / Multi-niche', true);
