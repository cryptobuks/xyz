#include "exe.h"

void		checkout(char *str, t_png_data *p)
{
	(void)p;
	if (str)
		fprintf(stderr, "%s\n", str);
	exit(1);
}

void		process_png_file(t_png_data *p, int lat, int lng) {
	if (lat < 0 || lat > p->height)
		checkout("Latitude is out or range", p);
	if (lng < 0 || lng > p->width)
		checkout("Longitude is out or range", p);
	for(int y = 0; y < p->height; y++)
	{
		png_bytep row = p->row_pointers[y];
		for(int x = 0; x < p->width; x++)
		{
			png_bytep px = &(row[x * 4]);
			//Clear all
			blackout(lat, lng, px);
			//Process
//			process(DIST(lng, lat, x, y), px);
		}
	}
}

int		main(int ac, char **av)
{
	t_png_data	p;

	if (ac != 2)
		checkout("Invalid argument", &p);
	read_png_file(av[1], &p);
	process_png_file(&p, 0, 0);
	write_png_file(av[1], &p);
	return (0);
}
