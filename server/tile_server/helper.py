import mercantile

def indices_to_bounds(x, y, z):
	return mercantile.bounds(x, y, z)