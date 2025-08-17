-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION generate_booking_code()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  -- Generate JX-XXXXX format
  result := 'JX-';
  FOR i IN 1..5 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION set_booking_code()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  IF NEW.code6 IS NULL OR NEW.code6 = '' THEN
    NEW.code6 := generate_booking_code();
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM public.bookings WHERE code6 = NEW.code6) LOOP
      NEW.code6 := generate_booking_code();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'Usuario'),
    NEW.email
  );
  RETURN NEW;
END;
$$;