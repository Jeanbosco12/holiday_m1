def is_point_in_region(lat: float, lon: float, region_bounds: tuple) -> bool:
    lat_min, lat_max, lon_min, lon_max = region_bounds
    return lat_min <= lat <= lat_max and lon_min <= lon <= lon_max
