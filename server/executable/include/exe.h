#ifndef EXE_H
# define EXE_H

# include <stdlib.h>
# include <stdio.h>
# include <png.h>
# include <math.h>
# include <unistd.h>
# define DIST(a, b, c, d)	hypot(c - a, d - b)
# define LIMIT			10
# define INC			10
# define MAX(x)			x > 255 ? 255 : x;
# define MIN(x)			x < 0 ? 0 : x;

typedef	struct		s_png_data
{
	int		width;
	int		height;
	png_byte	color_type;
	png_byte	bit_depth;
	png_bytep	*row_pointers;
}			t_png_data;

void		read_png_file(char *filename, t_png_data *p);
void		write_png_file(char *filename, t_png_data *p);	

void		process(float dist, png_bytep px);
void		illumination(float dist, png_bytep px);
void		fade_out(float dist, png_bytep px);
void		blackout(int lat, int lng, png_bytep px);

void		checkout(char *str, t_png_data *p);
#endif
