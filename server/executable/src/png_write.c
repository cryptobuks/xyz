#include "exe.h"

void			write_png_file(char *filename, t_png_data *p)
{
	FILE		*fp;
	png_structp	png;
	png_infop	info;

	if (!(fp = fopen(filename, "wb")))
		checkout("Error: fopen().", p);
	if (!(png = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL)))
		checkout("Error: png_create_read_struct().", p);
	if (!(info = png_create_info_struct(png)))
		checkout("Error: png_create_info_struct().", p);
	if (setjmp(png_jmpbuf(png)))
		checkout("Error: png_jmpbuf().", p);

	png_init_io(png, fp);

	png_set_IHDR(png, info, p->width, p->height, 8
			, PNG_COLOR_TYPE_RGBA
			, PNG_INTERLACE_NONE
			, PNG_COMPRESSION_TYPE_DEFAULT
			, PNG_FILTER_TYPE_DEFAULT
		    );
	png_write_info(png, info);

	png_write_image(png, p->row_pointers);
	png_write_end(png, NULL);

	for (int y = 0; y < p->height; y++)
		free(p->row_pointers[y]);
	free(p->row_pointers);
	fclose(fp);
	if (png && info)
		png_destroy_write_struct(&png, &info);
	png = NULL;
	info = NULL;
}
