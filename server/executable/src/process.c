#include "exe.h"

void		process(float dist, png_bytep px)
{
	if (dist  < LIMIT)
	{
		if (px[0] < 255 && px[1] < 255 && px[2] < 255 && px[3] == 255)
			illumination(dist, px);
		if (px[0] == 255 && px[1] == 255 && px[2] == 255 && px[3] > 0)
			fade_out(dist, px);
	}
}

void		illumination(float dist, png_bytep px)
{
	float	factor;

	factor = -(dist / LIMIT - 1);
	px[0] = MAX(px[0] + INC * factor);
	px[1] = MAX(px[1] + INC * factor);
	px[2] = MAX(px[2] + INC * factor);
}

void		fade_out(float dist, png_bytep px)
{
	float	factor;

	factor = -(dist / LIMIT - 1);
	px[3] = MIN(px[3] - INC * factor);
}

void		blackout(int lat, int lng, png_bytep px)
{
	(void)lat;
	(void)lng;

	px[0] = 0;
	px[1] = 0;
	px[2] = 0;
	px[3] = 255;
}
