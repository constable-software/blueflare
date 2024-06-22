-- FUNCTION: public.nearest_signals(point)
-- DROP FUNCTION IF EXISTS public.nearest_signals(point);
CREATE OR REPLACE FUNCTION public.nearest_signals(
        loc geometry,
        max_results integer default 10
    ) RETURNS table (
        id integer,
        geom geometry,
        dist float
    ) LANGUAGE 'sql' COST 100 VOLATILE PARALLEL UNSAFE AS $BODY$
select id,
    geom,
    st_distance(loc, geom) as dist
from geo_signals
order by dist
limit max_results $BODY$;
ALTER FUNCTION public.nearest_signals(point) OWNER TO postgres;