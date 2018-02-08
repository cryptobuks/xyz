#include "exe.h"

void			read_png_file(char *filename, t_png_data *p)
{
	FILE		*fp;
	png_structp	png;
	png_infop	info;
	
	if (!(fp = fopen(filename, "rb")))
		checkout("Error: fopen().", p);
	if (!(png = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL)))
		checkout("Error: png_create_read_struct().", p);
	if (!(info = png_create_info_struct(png)))
		checkout("Error: png_create_info_struct().", p);
	if (setjmp(png_jmpbuf(png)))
		checkout("Error: png_jmpbuf().", p);

	png_init_io(png, fp);
	png_read_info(png, info);

	p->width      = png_get_image_width(png, info);
	p->height     = png_get_image_height(png, info);
	p->color_type = png_get_color_type(png, info);
	p->bit_depth  = png_get_bit_depth(png, info);

	if (p->bit_depth == 16)
		png_set_strip_16(png);
	if (p->color_type == PNG_COLOR_TYPE_PALETTE)
		png_set_palette_to_rgb(png);
	if (p->color_type == PNG_COLOR_TYPE_GRAY && p->bit_depth < 8)
		png_set_expand_gray_1_2_4_to_8(png);
	if (png_get_valid(png, info, PNG_INFO_tRNS))
		png_set_tRNS_to_alpha(png);
	if (p->color_type == PNG_COLOR_TYPE_RGB
			|| p->color_type == PNG_COLOR_TYPE_GRAY
			|| p->color_type == PNG_COLOR_TYPE_PALETTE)
		png_set_filler(png, 0xFF, PNG_FILLER_AFTER);
	if (p->color_type == PNG_COLOR_TYPE_GRAY
			|| p->color_type == PNG_COLOR_TYPE_GRAY_ALPHA)
		png_set_gray_to_rgb(png);

	png_read_update_info(png, info);

	p->row_pointers = (png_bytep*)malloc(sizeof(png_bytep) * p->height);

	for(int y = 0; y < p->height; y++)
		p->row_pointers[y] = (png_byte*)malloc(png_get_rowbytes(png,info));

	png_read_image(png, p->row_pointers);

	fclose(fp);
	png_destroy_read_struct(&png, &info, NULL);
	png = NULL;
	info = NULL;
}
