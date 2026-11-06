-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_product_id TEXT UNIQUE NOT NULL,
    title_darija TEXT NOT NULL,
    image_url TEXT NOT NULL,
    price_mad DECIMAL(10, 2) NOT NULL,
    sales_volume INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
